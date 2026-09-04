import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import PasswordInput from "@/components/auth/PasswordInput";
import Logo from "@/components/auth/Logo";
import CurvedBackground from "@/components/auth/CurvedBackground";
import { useAuth } from "@/components/context/authContext";
import { useSearchParams } from "react-router-dom";

const rules = [
  { label: "8 characters", test: (p: string) => p.length >= 8 },
  { label: "Number (0-9)", test: (p: string) => /\d/.test(p) },
  { label: "Uppercase (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Lowercase (a-z)", test: (p: string) => /[a-z]/.test(p) },
];

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    if (!token) {
      alert("Invalid password reset link");
      return;
    }
    e.preventDefault();
    if (rules.every((r) => r.test(password)) && password === confirm) {
      try {
        const result = await resetPassword({
          token,
          new_password: password,
        });
        navigate("/password-success");
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false)
      }
    }
  };

  return (
    <CurvedBackground>
      <div className="bg-card rounded-2xl shadow-lg p-8 space-y-6">
        <Logo className="justify-center" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Update your password</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Must be at least 8 characters long with a mix of letters and numbers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          {password && (
            <div className="grid grid-cols-2 gap-2">
              {rules.map((rule) => {
                const passed = rule.test(password);
                return (
                  <div key={rule.label} className="flex items-center gap-1.5 text-sm">
                    {passed ? (
                      <Check className="h-4 w-4 text-hr-teal" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    <span className={passed ? "text-hr-teal" : "text-destructive"}>{rule.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)}
          />

          <Button type="submit" className="w-full bg-hr-navy hover:bg-hr-navy/90 text-white font-semibold h-11"
          disabled = {loading}
          >
            {loading ? "Submitting.." : "Submit"}
          </Button>
        </form>
      </div>
    </CurvedBackground>
  );
};

export default ResetPassword;
