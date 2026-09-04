import { createContext, ReactNode, useContext } from "react";
import { AdminPayload, AdminPayloadForSingle, EmployeeOnboardingPayload, SendInviteLink } from "./onboardingContext";
import { employeeApi } from "@/lib/api";


type EmployeeContextValue = {
  checkTokenValidity: (payload: string) => Promise<unknown>;
  sendInvite: (payload: SendInviteLink) => Promise<void>;
  submitOnboardingForm: (payload: EmployeeOnboardingPayload) => Promise<unknown>;
  fetch_all_submissions: (payload: AdminPayload) => Promise<unknown>;
  fetch_single_submission: (payload: AdminPayloadForSingle) => Promise<unknown>;
};

const EmployeeContext = createContext<EmployeeContextValue | null>(null);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const checkTokenValidity = async (payload: string) => {
    try {
      return await employeeApi.validateEmployeeToBeOnboarded(payload);
    } catch {
      console.log("Failed to validate employee onboarding token");
      throw new Error("Failed to validate onboarding token");
    }
    finally {
      console.log("finished");
    }
  }

  const sendInvite = async (payload: SendInviteLink) => {
    try {
      await employeeApi.sendEmployeeInviteLink(payload);
    } catch (e) {
      throw new Error("Failed to send invite");
    }
  }

  const submitOnboardingForm = async (payload: EmployeeOnboardingPayload) => {
    try {
      return await employeeApi.submitEmployeeOnboarding(payload);
    } catch (error) {
      throw new Error("Failed to submit details");

    }
  }

  const fetch_all_submissions = async (payload: AdminPayload) => {
    try {
      return await employeeApi.fetchAllOnboardingSubmissions({
        user_id: payload.user_id,
        company_id: payload.company_id,
      });
    } catch (error) {
      throw new Error("Failed to fetch all submissions");

    }
  }
  const fetch_single_submission = async (payload: AdminPayloadForSingle) => {
    try {
      return await employeeApi.fetchSingleOnboardingSubmission({
        user_id: payload.user_id,
        company_id: payload.company_id,
      });
    } catch (error) {
      throw new Error("Failed to fetch all submissions");

    }
  }
  return <EmployeeContext.Provider value={{ fetch_all_submissions, checkTokenValidity, sendInvite, submitOnboardingForm, fetch_single_submission }}>
    {children}
  </EmployeeContext.Provider>
}

export const useEmployee = () => {
  const employeeContext = useContext(EmployeeContext)
  if (!employeeContext) {
    throw new Error("Employee Auth must be used withing an Employee Provider")
  }

  return employeeContext
}