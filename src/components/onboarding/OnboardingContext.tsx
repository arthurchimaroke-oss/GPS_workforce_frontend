import { createContext, useContext, useState, ReactNode } from "react";
import { CompanyOnboardingRequest, OnboardingContextType, OnboardingData } from "../context/onboardingContext";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/lib/api";


const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<OnboardingData>({});
  const navigate = useNavigate();

  const update = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const getPayload = (): CompanyOnboardingRequest => {
    return data as CompanyOnboardingRequest;
  };

  const onboardCompany = async (payload: OnboardingData) => {
    console.log("payload", payload);
    const result = await authApi.onboardingCompany(payload as CompanyOnboardingRequest);
    navigate("/sign-in");
    return result;
  };


  return (
    <OnboardingContext.Provider value={{ data, update, getPayload, onboardCompany }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
};