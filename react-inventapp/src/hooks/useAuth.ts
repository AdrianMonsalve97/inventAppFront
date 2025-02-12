import { useState } from "react";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authenticate = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error("Credenciales incorrectas");

            const data = await response.json();
            localStorage.setItem("token", data.token); 
            localStorage.setItem("userId", data.id); 

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError("An unknown error occurred");
            } else {
                setError("An unknown error occurred");
            }
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return { authenticate, loading, error };
};
