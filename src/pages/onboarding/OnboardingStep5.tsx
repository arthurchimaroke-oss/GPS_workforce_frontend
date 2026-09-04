import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/context/authContext";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
// import { useOnboarding } from "@/context/OnboardingContext";

const OnboardingStep5 = () => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    // remove token
    localStorage.removeItem("auth_token");
  }
  const navigate = useNavigate();
  const { isSubmitting, error, setIsSubmitting, setError } = useAuth();
  const { data, update, getPayload, onboardCompany } = useOnboarding();

  const [firstName, setFirstName] = useState(data.first_name ?? "");
  const [lastName, setLastName] = useState(data.last_name ?? "");
  const [email, setEmail] = useState(data.user_email ?? "");
  const [phone, setPhone] = useState(data.phone ?? "");
  const [password, setPassword] = useState(data.password ?? "");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const passwordsMatch = password === confirmPassword;
  const isValid =
    firstName && lastName && email && password && confirmPassword && passwordsMatch;

  const handleSubmit = async () => {
    if (!isValid) return;

    update({
      first_name: firstName,
      last_name: lastName,
      user_email: email,
      phone: phone || undefined,
      password: password,
    });

    const payload = {
      ...getPayload(),
      first_name: firstName,
      last_name: lastName,
      user_email: email,
      phone: phone || undefined,
      password: password,
    };

    setIsSubmitting(true);
    setError(null);

    await onboardCompany(payload)
  };

  return (
    <OnboardingLayout
      step={6}
      totalSteps={6}
      title="Create your account"
      subtitle="This data is needed so that we can create the company super admin account"
      onBack={() => navigate("/onboarding/step-5")}
      onContinue={handleSubmit}
      continueDisabled={!isValid || isSubmitting}
      continueLabel={isSubmitting ? "Setting up..." : "Finish Setup"}
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-hr-text-light mb-1 block">
            Setting up workspace for
          </label>
          <p className="text-lg font-semibold text-foreground">
            {data.company_name ?? "Your Company"}
          </p>
        </div>

        <div className="border-t border-border pt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                First Name <span className="text-destructive">*</span>
              </label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                className="focus-visible:ring-hr-teal"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Last Name <span className="text-destructive">*</span>
              </label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="focus-visible:ring-hr-teal"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Email Address <span className="text-destructive">*</span>
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@unpixel.com"
              className="focus-visible:ring-hr-teal"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Phone Number
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="focus-visible:ring-hr-teal"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Password <span className="text-destructive">*</span>
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="focus-visible:ring-hr-teal"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Confirm Password <span className="text-destructive">*</span>
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={`focus-visible:ring-hr-teal ${confirmPassword && !passwordsMatch
                ? "border-destructive focus-visible:ring-destructive"
                : ""
                }`}
            />
            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-destructive mt-1.5">Passwords do not match.</p>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep5;