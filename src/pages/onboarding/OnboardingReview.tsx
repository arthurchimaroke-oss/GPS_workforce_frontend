import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/authContext";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";
import { useToast } from "@/hooks/use-toast";

const OnboardingReview = () => {
    const navigate = useNavigate();
    const { data, getPayload, onboardCompany } = useOnboarding();
    const { isSubmitting, error, setIsSubmitting, setError } = useAuth();
    const { toast } = useToast();

    const company = {
        name: data.company_name ?? "",
        email: data.company_email ?? "",
        phone: data.company_phone ?? "",
        website: data.company_website ?? "",
        industry: data.industry ?? "",
        country: data.country ?? "",
        city: data.city ?? "",
        defaultCurrency: data.default_currency ?? "",
        asEmployee: data.as_employee ?? true,
    };

    const entity = data.entity_details ?? {
        entity_name: "",
        registration_number: "",
        tax_identifier: "",
        country: "",
        currency: "",
        state: "",
        city: "",
        address: "",
    };

    const account = {
        firstName: data.first_name ?? "",
        lastName: data.last_name ?? "",
        email: data.user_email ?? "",
        phone: data.phone ?? "",
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);
        const toastInstance = toast({
            title: "Submitting onboarding...",
            description: "Please wait while we create your company workspace.",
        });

        try {
            await onboardCompany(getPayload());
            toastInstance.update({
                id: toastInstance.id,
                title: "Workspace created",
                description: "Your company workspace has been created successfully.",
                variant: "default",
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong.";
            setError(message);
            toastInstance.update({
                id: toastInstance.id,
                title: "Onboarding failed",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <OnboardingLayout
            step={4}
            totalSteps={4}
            title="Review your details"
            subtitle="Confirm all details are correct before creating your company workspace"
            onBack={() => navigate("/onboarding/step-3")}
            onContinue={handleSubmit}
            continueDisabled={isSubmitting}
            continueLabel={isSubmitting ? "Submitting..." : "Submit and Create Workspace"}
        >
            <div className="space-y-8">
                <section className="rounded-2xl border border-border p-6 bg-card">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Company details</h3>
                            <p className="text-sm text-muted-foreground">Review the company information you provided.</p>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate("/onboarding/step-1")}
                        >
                            Edit
                        </Button>
                    </div>
                    <div className="grid gap-3">
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Company name</span>
                            <span>{company.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Company email</span>
                            <span>{company.email}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Company phone</span>
                            <span>{company.phone || "Not provided"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Company website</span>
                            <span>{company.website || "Not provided"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Industry</span>
                            <span>{company.industry || "Not provided"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Country</span>
                            <span>{company.country || "Not provided"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">City</span>
                            <span>{company.city || "Not provided"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Default currency</span>
                            <span>{company.defaultCurrency}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Owner as employee</span>
                            <span>{company.asEmployee ? "Yes" : "No"}</span>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-border p-6 bg-card">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Entity details</h3>
                            <p className="text-sm text-muted-foreground">Confirm the default legal entity information.</p>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate("/onboarding/step-1")}
                        >
                            Edit
                        </Button>
                    </div>
                    <div className="grid gap-3">
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Entity name</span>
                            <span>{entity.entity_name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Registration number</span>
                            <span>{entity.registration_number}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Tax identifier</span>
                            <span>{entity.tax_identifier || "Not provided"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Country</span>
                            <span>{entity.country}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Currency</span>
                            <span>{entity.currency}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">State</span>
                            <span>{entity.state || "Not provided"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">City</span>
                            <span>{entity.city || "Not provided"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Address</span>
                            <span>{entity.address || "Not provided"}</span>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-border p-6 bg-card">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Account details</h3>
                            <p className="text-sm text-muted-foreground">Review the account information you'll use to sign in.</p>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate("/onboarding/step-2")}
                        >
                            Edit
                        </Button>
                    </div>
                    <div className="grid gap-3">
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">First name</span>
                            <span>{account.firstName}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Last name</span>
                            <span>{account.lastName}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Email</span>
                            <span>{account.email}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <span className="font-medium">Phone</span>
                            <span>{account.phone || "Not provided"}</span>
                        </div>
                    </div>
                </section>

                {error && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {error}
                    </div>
                )}
            </div>
        </OnboardingLayout>
    );
};

export default OnboardingReview;
