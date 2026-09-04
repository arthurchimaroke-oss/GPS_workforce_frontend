

import {useMutation , useQuery} from "@tanstack/react-query";
import { apiClient } from "./global.api";
import { LoginPayload, OnboardingPayload } from "@/types/AuthTypes";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();


export const useCheckAuth = () => {
    return useQuery({
        queryKey : ["auth"], 
        queryFn : () => apiClient.get("/auth/check_auth"),
        staleTime : 1000 * 60 * 5
    })
}
export const useOnboarding = () =>{
    
    return useMutation({
        mutationFn : (payload : OnboardingPayload)=>{
            return apiClient.post("/company_onboarding" , payload)
        }, 
        onSuccess : () => {
            navigate("/sign-in")
        }
    })
}

export const useLogin = () => {
    return useMutation ({
        mutationFn : (payload : LoginPayload)=> {
            return apiClient.post("/auth/login" , payload)
        }, 
        onSuccess :  (data : any) => {
            localStorage.setItem("auth_token", data.data)
            useCheckAuth()
            navigate("/dashboard-v1");
        }
    })
}