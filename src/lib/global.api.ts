
import { buildApiUrl } from "./api";

class ApiClient {
    private getToken(): string | null {
        return localStorage.getItem("auth_token");
    }

    private getHeaders() {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getToken()}`
        }
    }

    async requestWithoutAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(buildApiUrl(endpoint), {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "API Error")
        }
        return response.json()
    }
    async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const response = await fetch(buildApiUrl(endpoint), {
            ...options,
            credentials: "include",
            headers: {
                ...this.getHeaders(),
                ...options.headers,
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "API Error")
        }
        return response.json();
    }

    get<T>(endpoint: string) {
        return this.request<T>(endpoint)
    }
    post<T>(endpoint: string, body: unknown) {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        })
    }
    put<T>(endpoint: string, body: unknown) {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(body)
        })
    }
    delete<T>(endpoint: string, body?: unknown) {
        return this.request<T>(endpoint, {
            method: "DELETE",
            ...(body && { body: JSON.stringify(body) })
        })
    }
}

export const apiClient = new ApiClient