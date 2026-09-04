// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import Logo from "@/components/auth/Logo";
// import PasswordInput from "@/components/auth/PasswordInput";
// import authHero from "@/assets/auth-hero.jpg";
// import { useAuth } from "@/components/context/authContext";

// // --- Shapes returned by the backend during the auth flow ---
// // Adjust these to match your real API response once authContext is wired up.

// type CompanyOption = {
//   id: string;
//   name: string;
//   code: string;
// };

// type EntityOption = {
//   id: string;
//   name: string;
// };

// type LoginResult =
//   | { status: "success" }
//   | { status: "select_company"; companies: CompanyOption[] }
//   | { status: "select_entity"; entities: EntityOption[] };

// const SignIn = () => {
//   const { login, selectCompany, selectEntity, isSubmitting, error, user } = useAuth();
//   const navigate = useNavigate();

//   const [companyCode, setCompanyCode] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);

//   // Multi-step state: normal credentials step, or one of the two selection steps
//   const [step, setStep] = useState<"credentials" | "select_company" | "select_entity">(
//     "credentials"
//   );
//   const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
//   const [entityOptions, setEntityOptions] = useState<EntityOption[]>([]);

//   useEffect(() => {
//     console.debug("[SignIn] user state changed", user);
//     if (user) {
//       if (user.role === "employee") {
//         console.debug("[SignIn] redirecting employee");
//         navigate("/employee-dashboard");
//       } else {
//         console.debug("[SignIn] redirecting default to dashboard-v1");
//         navigate("/dashboard-v1");
//       }
//     }
//   }, [user, navigate]);

//   // Step 1: submit credentials. Backend checks company_users first (owner),
//   // then falls back to employees. If the person matches more than one
//   // company, or is an owner with multiple entities, we don't log them in
//   // yet — we ask them to pick, then finish the login with that choice.
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = {
//       company_code: companyCode.trim(),
//       email: email.trim(),
//       password: password,
//     };

//     const result = await login(payload);
//     if (!result) return; // error already set in authContext

//     if (result.status === "select_company") {
//       setCompanyOptions(result.companies);
//       setStep("select_company");
//       return;
//     }

//     if (result.status === "select_entity") {
//       setEntityOptions(result.entities);
//       setStep("select_entity");
//       return;
//     }

//     // status === "success" — the useEffect above handles redirect once
//     // `user` is populated by authContext.
//   };

//   // Step 2 (only if multiple companies matched): user picks the company,
//   // we re-check whether that company also needs an entity pick.
//   const handleSelectCompany = async (company: CompanyOption) => {
//     const result = await selectCompany(company.id);
//     if (!result) return; // error already set in authContext

//     if (result.status === "select_entity") {
//       setEntityOptions(result.entities);
//       setStep("select_entity");
//       return;
//     }
//     // status === "success" — redirect handled by useEffect
//   };

//   // Step 3 (only for owners with access to multiple entities): user picks
//   // the entity they want to work in, then we issue the JWT and log them in.
//   const handleSelectEntity = async (entity: EntityOption) => {
//     await selectEntity(entity.id);
//     // status === "success" — redirect handled by useEffect
//   };

//   return (
//     <div className="h-screen flex overflow-hidden">
//       {/* Left - Hero */}
//       <div className="hidden lg:flex lg:w-1/2 h-full">
//         <img
//           src={authHero}
//           alt="HR team collaborating"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Right - Form */}
//       <div className="flex-1 h-full overflow-y-auto flex flex-col px-6 py-8 lg:px-12">
//         {/* Mobile logo */}
//         <div className="flex justify-end lg:hidden mb-6">
//           <Logo />
//         </div>

//         <div className="max-w-sm mx-auto w-full flex-1 flex flex-col justify-center">
//           {step === "credentials" && (
//             <>
//               <h1 className="text-2xl font-bold text-foreground mb-1">
//                 Welcome Back
//               </h1>
//               <p className="text-muted-foreground mb-8">
//                 Login to your company workspace
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {/* Company Code */}
//                 <div className="space-y-1.5">
//                   <label className="text-sm font-medium">Company Code</label>
//                   <Input
//                     placeholder="e.g. payflow"
//                     value={companyCode}
//                     onChange={(e) => setCompanyCode(e.target.value)}
//                   />
//                   <p className="text-xs text-muted-foreground">
//                     Provided by your employer
//                   </p>
//                 </div>

//                 {/* Email */}
//                 <div className="space-y-1.5">
//                   <label className="text-sm font-medium">Work Email</label>
//                   <Input
//                     type="email"
//                     placeholder="you@company.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 {/* Password */}
//                 <PasswordInput
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                     setPassword(e.target.value)
//                   }
//                 />

//                 {/* Remember */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Checkbox
//                       id="remember"
//                       checked={remember}
//                       onCheckedChange={(v) => setRemember(v as boolean)}
//                     />
//                     <label htmlFor="remember" className="text-sm cursor-pointer">
//                       Remember Me
//                     </label>
//                   </div>

//                   <Link
//                     to="/forgot-password"
//                     className="text-sm text-hr-teal hover:underline"
//                   >
//                     Forgot Password?
//                   </Link>
//                 </div>

//                 {/* Error */}
//                 {error && (
//                   <p className="text-sm text-destructive">{error}</p>
//                 )}

//                 {/* Submit */}
//                 <Button
//                   type="submit"
//                   className="w-full h-11 font-semibold"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Signing in..." : "Login"}
//                 </Button>
//               </form>

//               {/* Signup */}
//               <div className="text-center mt-8 text-sm">
//                 <p className="text-muted-foreground">
//                   Don't have an account?{" "}
//                   <Link to="/sign-up" className="text-hr-teal hover:underline">
//                     Create company
//                   </Link>
//                 </p>
//               </div>
//             </>
//           )}

//           {step === "select_company" && (
//             <>
//               <h1 className="text-2xl font-bold text-foreground mb-1">
//                 Select your company
//               </h1>
//               <p className="text-muted-foreground mb-8">
//                 This email is linked to more than one company workspace.
//               </p>

//               <div className="space-y-3">
//                 {companyOptions.map((company) => (
//                   <button
//                     key={company.id}
//                     type="button"
//                     onClick={() => handleSelectCompany(company)}
//                     disabled={isSubmitting}
//                     className="w-full text-left border rounded-lg px-4 py-3 hover:bg-muted transition-colors"
//                   >
//                     <p className="font-medium">{company.name}</p>
//                     <p className="text-xs text-muted-foreground">{company.code}</p>
//                   </button>
//                 ))}
//               </div>

//               {error && (
//                 <p className="text-sm text-destructive mt-4">{error}</p>
//               )}

//               <button
//                 type="button"
//                 onClick={() => setStep("credentials")}
//                 className="text-sm text-hr-teal hover:underline mt-6"
//               >
//                 Back
//               </button>
//             </>
//           )}

//           {step === "select_entity" && (
//             <>
//               <h1 className="text-2xl font-bold text-foreground mb-1">
//                 Select your entity
//               </h1>
//               <p className="text-muted-foreground mb-8">
//                 As an owner, you have access to multiple entities. Choose
//                 which one to work in — you can switch later.
//               </p>

//               <div className="space-y-3">
//                 {entityOptions.map((entity) => (
//                   <button
//                     key={entity.id}
//                     type="button"
//                     onClick={() => handleSelectEntity(entity)}
//                     disabled={isSubmitting}
//                     className="w-full text-left border rounded-lg px-4 py-3 hover:bg-muted transition-colors"
//                   >
//                     <p className="font-medium">{entity.name}</p>
//                   </button>
//                 ))}
//               </div>

//               {error && (
//                 <p className="text-sm text-destructive mt-4">{error}</p>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/auth/Logo";
import PasswordInput from "@/components/auth/PasswordInput";
import authHero from "@/assets/auth-hero.jpg";
import { useAuth } from "@/components/context/authContext";
import { EntityOption } from "@/types/AuthTypes";

const SignIn = () => {
  const { login, selectEntity, isSubmitting, error, user } = useAuth();
  const navigate = useNavigate();

  const [companyCode, setCompanyCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [step, setStep] = useState<"credentials" | "select_entity">("credentials");
  const [entityOptions, setEntityOptions] = useState<EntityOption[]>([]);

  useEffect(() => {
    console.debug("[SignIn] user state changed", user);
    if (user) {
      if (user.role === "employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/dashboard-v1");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      company_code: companyCode.trim(),
      email: email.trim(),
      password: password,
    };

    const result = await login(payload);
    if (!result) return;

    if (result.status === "select_entity") {
      setEntityOptions(result.entities);
      setStep("select_entity");
      return;
    }
    // status === "success" — redirect handled by useEffect
  };

  const handleSelectEntity = async (entity: EntityOption) => {
    await selectEntity(entity);
    // status === "success" — redirect handled by useEffect
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 h-full">
        <img src={authHero} alt="HR team collaborating" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 h-full overflow-y-auto flex flex-col px-6 py-8 lg:px-12">
        <div className="flex justify-end lg:hidden mb-6">
          <Logo />
        </div>

        <div className="max-w-sm mx-auto w-full flex-1 flex flex-col justify-center">
          {step === "credentials" && (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-1">Welcome Back</h1>
              <p className="text-muted-foreground mb-8">Login to your company workspace</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Company Code</label>
                  <Input
                    placeholder="e.g. payflow"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Provided by your employer</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Work Email</label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <PasswordInput
                  placeholder="Enter password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={remember}
                      onCheckedChange={(v) => setRemember(v as boolean)}
                    />
                    <label htmlFor="remember" className="text-sm cursor-pointer">
                      Remember Me
                    </label>
                  </div>

                  <Link to="/forgot-password" className="text-sm text-hr-teal hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="w-full h-11 font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Login"}
                </Button>
              </form>

              <div className="text-center mt-8 text-sm">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-hr-teal hover:underline">
                    Create company
                  </Link>
                </p>
              </div>
            </>
          )}

          {step === "select_entity" && (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-1">Select your entity</h1>
              <p className="text-muted-foreground mb-8">
                As an owner, you have access to multiple entities. Choose which one to work in —
                you can switch later.
              </p>

              <div className="space-y-3">
                {entityOptions.map((entity) => (
                  <button
                    key={entity.id}
                    type="button"
                    onClick={() => handleSelectEntity(entity)}
                    disabled={isSubmitting}
                    className="w-full text-left border rounded-lg px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <p className="font-medium">{entity.name}</p>
                  </button>
                ))}
              </div>

              {error && <p className="text-sm text-destructive mt-4">{error}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;