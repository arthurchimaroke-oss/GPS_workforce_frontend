import { createContext, ReactNode, useContext } from "react";
import { FundingIntentResponse, fundingApi } from "@/lib/api";


type FundingContextValue = {
    fundWallet: (payload: FundingIntentResponse) => Promise<unknown>;
};

const FundingContext = createContext<FundingContextValue | null>(null);

export const FundProvider = ({ children }: { children: ReactNode }) => {
    const fundWallet = async (payload: FundingIntentResponse) => {
        try {
            const data = await fundingApi.fundCompanyWallet(payload);
            console.log("data is ", data);
            return data;
        }
        catch {
            console.log("Failed to begin transaction")
            throw new Error("Failed to initiate funding");
        }
        finally {
            console.log("finished")
        }
    }

    return <FundingContext.Provider value={{ fundWallet }}>
        {children}
    </FundingContext.Provider>
}

export const useFunding = () => {
    const fundContext = useContext(FundingContext)
    if (!fundContext) {
        throw new Error("Fund Auth must be used withing a Fund Provider")
    }

    return fundContext
}