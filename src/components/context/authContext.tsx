import {
  AuthContextType,
  AuthUser,
  EntityOption,
  ForgotPayload,
  LoginPayload,
  LoginResult,
  OnboardingPayload,
  ResetPayload,
} from "@/types/AuthTypes";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { normalizeAuthPayload, parseEntitySelectionRequired } from "@/lib/auth";
import { authApi } from "@/lib/api";

// Snapshot of the user/company info returned by /auth/login when the
// backend responds with EntitySelectionRequired. We can't rely on the
// `user` context state here — it isn't populated until login actually
// completes — so we stash what the backend gave us and use it to build
// the /auth/login/entity payload once the user picks an entity.
type PendingAuth = {
  user: { id: string; first_name: string; email: string; company_user_id?: string };
  company: { id: string; company_name: string; company_code: string };
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [entity , setEntity] = useState

  const [pendingAuth, setPendingAuth] = useState<PendingAuth | null>(null);

  // Only runs once on hard refresh/app load, to restore session from a
  // stored token. Dashboard routes call checkAuth() themselves on top
  // of this whenever they need to (re)validate the session.
  useEffect(() => {
    checkAuth();
  }, []);

  // Session validator. Call this from dashboard layout/routes whenever
  // you need to confirm the stored token is still valid — NOT from the
  // login flow, since login already returns the full user object.
  const checkAuth = async () => {
    const storedToken = localStorage.getItem("auth_token");
    console.debug("[Auth] checkAuth token found", Boolean(storedToken));
    if (!storedToken) {
      setToken(null);
      setUser(null);
      setIsLoading(false);
      return;
    }

    setToken(storedToken);

    try {
      const userData = await authApi.checkAuth(storedToken);
      console.debug("[Auth] checkAuth userData", userData);
      if (userData == null) {
        setUser(null);
        return;
      }
      const decodedToken = jwtDecode(storedToken) as any;
      const normalizedUser: AuthUser = {
        ...decodedToken,
        ...userData,
        id: userData.sub ?? decodedToken.sub ?? null,
        company_id: userData.company_id ?? decodedToken.company_id ?? null,
        company_user_id: userData.company_user_id ?? decodedToken.company_user_id ?? null,
        active_entity_id: userData.active_entity_id ?? decodedToken.active_entity_id ?? null,
        active_entity_name: userData.active_entity_name ?? decodedToken.active_entity_name ?? null,
        is_system_administrator:
          userData.is_system_administrator ?? decodedToken.is_system_administrator ?? false,
        entities: userData.entities ?? decodedToken.entities ?? [],
      };
      setRole(decodedToken.role ?? null);
      setCompanyId(normalizedUser.company_id ?? null);
      setCompanyName(decodedToken.company_name ?? userData.company_name ?? null);
      setUser(normalizedUser);
    } catch (err: unknown) {
      console.error("[Auth] checkAuth error", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const onboarding = async (payload: OnboardingPayload) => {
    try {
      setIsSubmitting(true);
      setError(null);
      // Docs: POST /onboarding/company/onboard (was /company_onboarding)
      await authApi.onboardingCompany(payload);

      navigate("/sign-in");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 1: submit credentials. Per the docs, /auth/login returns one of:
  //   - { LoginSuccess: { access_token, ... } }             -> log in directly
  //   - { EntitySelectionRequired: { user, company, entities } }
  const login = async (payload: LoginPayload): Promise<LoginResult | undefined> => {
    try {
      setIsSubmitting(true);
      setError(null);
      const rawResult = await authApi.login(payload);
      console.debug("[Auth] login raw result", rawResult);

      const entitySelection = parseEntitySelectionRequired(rawResult);
      if (entitySelection) {
        setPendingAuth({
          user: entitySelection.user,
          company: entitySelection.company,
        });
        return { status: "select_entity", entities: entitySelection.entities };
      }

      // type === "LoginSuccess" — flat shape per docs for the
      // single-entity case (no wrapper). normalizeAuthPayload handles
      // both flat and { LoginSuccess: {...} } shapes internally.
      const normalized = normalizeAuthPayload(rawResult);
      const token = normalized.token;
      if (!token) {
        console.error("[Auth] login missing token", rawResult);
        throw new Error("Invalid login response from server.");
      }
      localStorage.setItem("auth_token", token);
      setToken(token);
      setUser(normalized.user as AuthUser);
      setRole((normalized.user as any)?.role ?? null);
      setCompanyId(normalized.companyId);
      setCompanyName(normalized.companyName);
      // Don't call checkAuth() here — we already have the full user
      // object from this response, and firing checkAuth right after
      // login races the state update and can stomp the user we just set.
      return { status: "success" };
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      return undefined;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2 (only if EntitySelectionRequired). Finishes the session using
  // the user/company stashed from the login response, plus the entity
  // the user just picked (id + name — no more entity_name: null).
  const selectEntity = async (entity: EntityOption): Promise<LoginResult | undefined> => {
    if (!pendingAuth) {
      setError("Your session expired. Please log in again.");
      return undefined;
    }
    try {
      setIsSubmitting(true);
      setError(null);
      const rawResult = await authApi.selectEntity({
        user_id: pendingAuth.user?.id ?? null,
        first_name: pendingAuth.user?.first_name ?? null,
        email: pendingAuth.user?.email ?? null,
        company_user_id: pendingAuth.user?.company_user_id ?? null,
        company_id: pendingAuth.company?.id ?? null,
        company_code: pendingAuth.company?.company_code ?? null,
        company_name: pendingAuth.company?.company_name ?? null,
        entity_id: entity.id,
        entity_name: entity.name,
      });
      console.debug("[Auth] selectEntity result", rawResult);

      // normalizeAuthPayload already unwraps { LoginSuccess: {...} }
      // internally, so pass rawResult straight through.
      const normalized = normalizeAuthPayload(rawResult);
      const token = normalized.token;
      if (!token) {
        throw new Error("Invalid login response from server.");
      }
      localStorage.setItem("auth_token", token);
      setToken(token);
      setUser(normalized.user as AuthUser);
      setRole((normalized.user as any)?.role ?? null);
      setCompanyId(normalized.companyId);
      setCompanyName(normalized.companyName);
      setPendingAuth(null);
      // Same as login() above — no checkAuth() call here, we already
      // have the full user from this response.
      return { status: "success" };
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      return undefined;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Switch the active entity during an existing authenticated session. Unlike
  // selectEntity() (login flow), the user object is already populated, so we
  // reuse the stored user/company details to build the /auth/login/from_entity
  // payload and swap in the newly selected entity.
  const switchEntity = async (entity: EntityOption) => {
    if (!user) {
      setError("Your session expired. Please log in again.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const rawResult = await authApi.selectEntity({
        user_id: (user.id as string) ?? null,
        first_name: (user.first_name as string) ?? null,
        email: (user.email as string) ?? null,
        company_user_id: (user.company_user_id as string) ?? null,
        company_id: (user.company_id as string) ?? companyId ?? null,
        company_code: (user.company_code as string) ?? null,
        company_name: (user.company_name as string) ?? companyName ?? null,
        entity_id: entity.id,
        entity_name: entity.name,
      });

      const normalized = normalizeAuthPayload(rawResult);
      const token = normalized.token;
      if (!token) {
        throw new Error("Invalid entity switch response from server.");
      }

      localStorage.setItem("auth_token", token);
      setToken(token);
      setUser(normalized.user as AuthUser);
      setRole((normalized.user as any)?.role ?? null);
      setCompanyId(normalized.companyId);
      setCompanyName(normalized.companyName);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const forgotPassword = async (payload: ForgotPayload) => {
    try {
      setIsSubmitting(true);
      setError(null);
      return await authApi.forgotPassword(payload);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPassword = async (payload: ResetPayload) => {
    try {
      setIsSubmitting(true);
      setError(null);
      return await authApi.resetPassword(payload);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setCompanyId(null);
    setUser(null);
    setPendingAuth(null);
    navigate("/sign-in");
  };

  const value: AuthContextType = {
    isLoading,
    user,
    onboarding,
    isSubmitting,
    error,
    setIsSubmitting,
    setError,
    login,
    selectEntity,
    switchEntity,
    checkAuth,
    token,
    companyId,
    companyName,
    forgotPassword,
    resetPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};