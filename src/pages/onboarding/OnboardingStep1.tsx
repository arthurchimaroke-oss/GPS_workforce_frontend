import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";

const OnboardingStep1 = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, update } = useOnboarding();
  const token = searchParams.get("token") ?? data.token;

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken && urlToken !== data.token) {
      update({ token: urlToken });
    }
  }, [searchParams, data.token, update]);

  const [companyName, setCompanyName] = useState(data.company_name ?? "");
  const [companyEmail, setCompanyEmail] = useState(data.company_email ?? "");
  const [companyPhone, setCompanyPhone] = useState(data.company_phone ?? "");
  const [companyWebsite, setCompanyWebsite] = useState(data.company_website ?? "");
  const [industry, setIndustry] = useState(data.industry ?? "");
  const [country, setCountry] = useState(data.country ?? "");
  const [city, setCity] = useState(data.city ?? "");
  const [defaultCurrency, setDefaultCurrency] = useState(data.default_currency ?? "");
  const [asEmployee, setAsEmployee] = useState(data.as_employee ?? true);

  const handleContinue = () => {
    update({
      token,
      company_name: companyName.trim(),
      company_email: companyEmail.trim().toLowerCase(),
      company_phone: companyPhone || undefined,
      company_website: companyWebsite.trim().toLowerCase() || undefined,
      industry: industry || undefined,
      country: country || undefined,
      city: city || undefined,
      default_currency: defaultCurrency,
      as_employee: asEmployee,
    });
    navigate("/onboarding/step-2");
  };

  return (
    <OnboardingLayout
      step={1}
      totalSteps={4}
      title="We need some of your Company Information"
      subtitle="This data is needed so that we can easily provide solutions according to your company's capacity"
      backLabel="Cancel"
      onBack={() => navigate("/sign-in")}
      onContinue={handleContinue}
      continueDisabled={!companyName || !companyEmail || !defaultCurrency}
    >
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Tell us about your company
      </h2>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Company Name <span className="text-destructive">*</span>
          </label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Unpixel"
            className="focus-visible:ring-hr-teal"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Company Email <span className="text-destructive">*</span>
          </label>
          <Input
            type="email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            placeholder="hello@unpixel.com"
            className="focus-visible:ring-hr-teal"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Default Currency <span className="text-destructive">*</span>
            </label>
            <Input
              value={defaultCurrency}
              onChange={(e) => setDefaultCurrency(e.target.value)}
              placeholder="NGN"
              className="focus-visible:ring-hr-teal"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Industry
            </label>
            <Input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Technology"
              className="focus-visible:ring-hr-teal"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Country
            </label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Nigeria"
              className="focus-visible:ring-hr-teal"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Company City
            </label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Lagos"
              className="focus-visible:ring-hr-teal"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Company Phone
          </label>
          <Input
            type="tel"
            value={companyPhone}
            onChange={(e) => setCompanyPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="focus-visible:ring-hr-teal"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Company Website
          </label>
          <div className="flex gap-2">
            <Input
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="https://unpixel.com"
              className="flex-1 focus-visible:ring-hr-teal"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Checkbox
            id="as_employee"
            checked={asEmployee}
            onCheckedChange={(checked) => setAsEmployee(checked as boolean)}
          />
          <label htmlFor="as_employee" className="text-sm font-medium text-foreground">
            Register owner as employee
          </label>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep1;