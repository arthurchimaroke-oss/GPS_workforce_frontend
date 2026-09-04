import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import RadioCard from "@/components/onboarding/RadioCard";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
// import { useOnboarding } from "@/context/OnboardingContext";

const useCases = [
  {
    title: "Onboarding new employees",
    description:
      "I want to onboard a lot of new employees in a consistent and systematic way.",
  },
  {
    title: "Online time tracking",
    description:
      "I want to track and approve time attendance and time off online, from anywhere.",
  },
  {
    title: "Performance management",
    description:
      "I want to manage and maintain employee performance in a continuous and objective way.",
  },
  {
    title: "Employee engagement",
    description:
      "I want to keep my employees happy, engaged, active, and motivated.",
  },
  {
    title: "Recruitment",
    description:
      "I want to hire the best talents to improve business performance and employer branding.",
  },
];

const OnboardingStep4 = () => {
  const navigate = useNavigate();
  const { data } = useOnboarding();
  const [selected, setSelected] = useState("");

  return (
    <OnboardingLayout
      step={5}
      totalSteps={6}
      title="What will you mainly use Grove HR for?"
      subtitle="This data is needed so that we can easily provide solutions according to your company's capacity"
      onBack={() => navigate("/onboarding/step-4")}
      onContinue={() => navigate("/onboarding/step-6")}
      continueDisabled={!selected}
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
          <h3 className="font-semibold text-foreground mb-4">
            Choose according to your needs
          </h3>
          <div className="space-y-3">
            {useCases.map((item) => (
              <RadioCard
                key={item.title}
                title={item.title}
                description={item.description}
                selected={selected === item.title}
                onClick={() => setSelected(item.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep4;