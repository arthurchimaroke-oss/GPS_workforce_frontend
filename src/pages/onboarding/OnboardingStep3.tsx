import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import RadioChip from "@/components/onboarding/RadioChip";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
// import { useOnboarding } from "@/context/OnboardingContext";

const roles = [
  "CEO/Owner/Founder",
  "HR Manager",
  "HR Staff",
  "IT/Tech Manager",
  "IT/Tech Staff",
  "Other",
];

const OnboardingStep3 = () => {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  const [role, setRole] = useState("");
  const [otherRole, setOtherRole] = useState("");

  const isOther = role === "Other";

  return (
    <OnboardingLayout
      step={4}
      totalSteps={6}
      title="What is your role in your company?"
      subtitle="This data is needed so that we can easily provide solutions according to your company's capacity"
      onBack={() => navigate("/onboarding/step-3")}
      onContinue={() => navigate("/onboarding/step-5")}
      continueDisabled={!role || (isOther && !otherRole)}
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

        <div className="border-t border-border pt-6">
          <h3 className="font-semibold text-foreground mb-4">Choose your role</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {roles.map((item) => (
              <RadioChip
                key={item}
                label={item}
                selected={role === item}
                onClick={() => setRole(item)}
              />
            ))}
          </div>
        </div>

        {isOther && (
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Input Your Role <span className="text-destructive">*</span>
            </label>
            <Input
              value={otherRole}
              onChange={(e) => setOtherRole(e.target.value)}
              placeholder="Lead Designer"
              className="focus-visible:ring-hr-teal"
            />
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep3;