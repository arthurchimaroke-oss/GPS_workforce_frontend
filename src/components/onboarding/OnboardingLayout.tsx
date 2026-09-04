import Logo from "@/components/auth/Logo";

interface OnboardingLayoutProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onBack?: () => void;
  onContinue: () => void;
  backLabel?: string;
  continueLabel?: string;
  continueDisabled?: boolean;
}

const OnboardingLayout = ({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onBack,
  onContinue,
  backLabel = "Go Back",
  continueLabel = "Continue",
  continueDisabled = false,
}: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-8 py-4">
        <Logo />
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-hr-gray">
        <div
          className="h-full bg-hr-teal transition-all duration-500"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
        {/* Left panel */}
        <div className="lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-12">
          {/* Step indicators */}
          <div className="flex gap-2 mb-3">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded ${
                  i < step ? "bg-hr-teal" : "bg-hr-gray"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-hr-text-light uppercase tracking-wide mb-6">
            Step {step} of {totalSteps}
          </p>

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            {title}
          </h1>
          <p className="text-hr-text-light mb-10">{subtitle}</p>

          {/* Buttons */}
          <div className="flex gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-8 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                {backLabel}
              </button>
            )}
            <button
              onClick={onContinue}
              disabled={continueDisabled}
              className="px-8 py-3 rounded-lg bg-hr-navy text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {continueLabel}
            </button>
          </div>
        </div>

        {/* Right panel (form card) */}
        <div className="lg:w-1/2 flex items-start justify-center px-8 py-12 bg-muted/30">
          <div className="w-full max-w-lg bg-card rounded-2xl shadow-sm border border-border p-8">
            {children}
          </div>
        </div>
      </div>

      {/* Footer on step 4 */}
      {step === totalSteps && (
        <footer className="border-t border-border px-8 py-4 text-center text-sm text-hr-text-light">
          ©2025 HRDashboard. All rights reserved.{" "}
          <span className="font-medium text-foreground">Terms & Conditions</span>{" "}
          <span className="font-medium text-foreground">Privacy Policy</span>
        </footer>
      )}
    </div>
  );
};

export default OnboardingLayout;
