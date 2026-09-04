import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
// import { useOnboarding } from "@/context/OnboardingContext";

// const industries = [
//   "AI & Machine Learning",
//   "E-Commerce",
//   "Fintech",
//   "Health Tech",
//   "Software Outsourcing",
// ];

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const { data, update } = useOnboarding();

  const [firstName, setFirstName] = useState(data.first_name ?? "");
  const [lastName, setLastName] = useState(data.last_name ?? "");
  const [email, setEmail] = useState(data.user_email ?? "");
  const [phone, setPhone] = useState(data.phone ?? "");
  const [password, setPassword] = useState(data.password ?? "");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = password === confirmPassword;
  const isValid = firstName && lastName && email && password && confirmPassword && passwordsMatch;

  const handleContinue = () => {
    if (!isValid) return;
    update({
      first_name: firstName,
      last_name: lastName,
      user_email: email,
      phone: phone || undefined,
      password: password,
    });
    navigate("/onboarding/step-4");
  };

  return (
    <OnboardingLayout
      step={3}
      totalSteps={4}
      title="Create your admin account"
      subtitle="This information will be used to log in and manage your company workspace."
      onBack={() => navigate("/onboarding/step-2")}
      onContinue={handleContinue}
      continueDisabled={!isValid}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              First Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
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
            Work Email <span className="text-destructive">*</span>
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="owner@company.com"
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
            placeholder="+2348012345678"
            className="focus-visible:ring-hr-teal"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Password <span className="text-destructive">*</span>
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="StrongPassword123"
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
              placeholder="StrongPassword123"
              className={`focus-visible:ring-hr-teal ${confirmPassword && !passwordsMatch ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-destructive mt-1.5">Passwords do not match.</p>
            )}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep2;