import type { EntityOption } from "@/types/AuthTypes";
import { jwtDecode } from "jwt-decode";

export type NormalizedAuthPayload = {
    token: string;
    refreshToken?: string;
    expiresAt?: number;
    user: Record<string, unknown>;
    companyId: string | null;
    companyName: string | null;
    activeEntityId: string | null;
    activeEntityName: string | null;
};

export type EntitySelectionRequiredPayload = {
    user: { id: string; first_name: string; email: string; company_user_id?: string };
    company: { id: string; company_name: string; company_code: string };
    entities: EntityOption[];
};

export const parseEntitySelectionRequired = (
    raw: unknown,
): EntitySelectionRequiredPayload | null => {
    if (!raw || typeof raw !== "object") {
        return null;
    }

    const candidate = raw as Record<string, unknown>;

    const wrapped = candidate.EntitySelectionRequired;
    if (wrapped && typeof wrapped === "object") {
        const payload = wrapped as Partial<EntitySelectionRequiredPayload>;
        if (payload.user && payload.company && Array.isArray(payload.entities)) {
            return payload as EntitySelectionRequiredPayload;
        }
    }

    if (
        candidate.type === "EntitySelectionRequired" &&
        candidate.user &&
        candidate.company &&
        Array.isArray(candidate.entities)
    ) {
        return {
            user: candidate.user as EntitySelectionRequiredPayload["user"],
            company: candidate.company as EntitySelectionRequiredPayload["company"],
            entities: candidate.entities as EntitySelectionRequiredPayload["entities"],
        };
    }

    return null;
};

export const normalizeAuthPayload = (raw: any): NormalizedAuthPayload => {
  const loginSuccess = raw?.LoginSuccess ?? raw;
  const user = loginSuccess?.user ?? {};
  const company = loginSuccess?.company ?? {};
  const activeEntity = loginSuccess?.active_entity ?? {};

  const token = loginSuccess?.access_token ?? loginSuccess?.token ?? "";
  let decodedToken: Record<string, unknown> = {};
  if (token) {
    try {
      decodedToken = jwtDecode(token) as Record<string, unknown>;
    } catch {
      decodedToken = {};
    }
  }

  const rawEntities = loginSuccess?.entities ?? user?.entities ?? decodedToken?.entities ?? [];
  const entities: EntityOption[] = Array.isArray(rawEntities)
    ? rawEntities
    : activeEntity?.id
      ? [{ id: activeEntity.id, name: activeEntity.name ?? activeEntity.entity_name ?? "" }]
      : [];

  const normalizedUser = {
    ...decodedToken,
    ...user,
    company_id: company?.id ?? user?.company_id ?? decodedToken?.company_id ?? null,
    company_name: company?.company_name ?? user?.company_name ?? decodedToken?.company_name ?? null,
    company_code: company?.company_code ?? user?.company_code ?? decodedToken?.company_code ?? null,
    active_entity_id: activeEntity?.id ?? user?.active_entity_id ?? decodedToken?.active_entity_id ?? null,
    active_entity_name: activeEntity?.name ?? user?.active_entity_name ?? decodedToken?.active_entity_name ?? null,
    is_system_administrator:
      loginSuccess?.is_system_administrator ??
      user?.is_system_administrator ??
      decodedToken?.is_system_administrator ??
      false,
    role:
      user?.role ??
      loginSuccess?.role ??
      decodedToken?.role ??
      undefined,
    entities,
  };

  return {
    token,
    refreshToken: loginSuccess?.refresh_token ?? loginSuccess?.refreshToken,
    expiresAt: loginSuccess?.expires_at ?? loginSuccess?.expiresAt,
    user: normalizedUser,
    companyId: company?.id ?? null,
    companyName: company?.company_name ?? null,
    activeEntityId: activeEntity?.id ?? null,
    activeEntityName: activeEntity?.name ?? null,
  };
};
