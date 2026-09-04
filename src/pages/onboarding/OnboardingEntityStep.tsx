import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";

const OnboardingEntityStep = () => {
    const navigate = useNavigate();
    const { data, update } = useOnboarding();

    const [entityName, setEntityName] = useState(data.entity_details?.entity_name ?? "");
    const [registrationNumber, setRegistrationNumber] = useState(
        data.entity_details?.registration_number ?? ""
    );
    const [taxIdentifier, setTaxIdentifier] = useState(
        data.entity_details?.tax_identifier ?? ""
    );
    const [country, setCountry] = useState(data.entity_details?.country ?? "");
    const [currency, setCurrency] = useState(data.entity_details?.currency ?? "");
    const [state, setState] = useState(data.entity_details?.state ?? "");
    const [city, setCity] = useState(data.entity_details?.city ?? "");
    const [address, setAddress] = useState(data.entity_details?.address ?? "");

    const isValid = entityName && registrationNumber && country && currency;

    const handleContinue = () => {
        update({
            entity_details: {
                entity_name: entityName,
                registration_number: registrationNumber,
                tax_identifier: taxIdentifier || undefined,
                country: country,
                currency: currency,
                state: state || undefined,
                city: city || undefined,
                address: address || undefined,
            },
        });
        navigate("/onboarding/step-3");
    };

    return (
        <OnboardingLayout
            step={2}
            totalSteps={4}
            title="Create a legal entity for your company"
            subtitle="Provide the default legal entity information for this workspace"
            onBack={() => navigate("/onboarding/step-1")}
            onContinue={handleContinue}
            continueDisabled={!isValid}
        >
            <div className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Entity Name <span className="text-destructive">*</span>
                    </label>
                    <Input value={entityName} onChange={(e) => setEntityName(e.target.value)} />
                </div>

                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Registration Number <span className="text-destructive">*</span>
                    </label>
                    <Input value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
                </div>

                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Tax Identifier
                    </label>
                    <Input value={taxIdentifier} onChange={(e) => setTaxIdentifier(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Country <span className="text-destructive">*</span></label>
                        <Input value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Currency <span className="text-destructive">*</span></label>
                        <Input value={currency} onChange={(e) => setCurrency(e.target.value)} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">State</label>
                        <Input value={state} onChange={(e) => setState(e.target.value)} />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">City</label>
                        <Input value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Address</label>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default OnboardingEntityStep;
