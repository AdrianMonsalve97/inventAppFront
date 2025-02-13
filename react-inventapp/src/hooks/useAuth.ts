import { useState } from "react";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const authenticate = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                // Mejor manejo de errores:
                const errorData = await response.json(); 
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`; 
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("rol", data.rol);
            setIsAuthenticated(true); 

          

            return data; 

        } catch (err: unknown) {
            let errorMessage = "An unknown error occurred";

            if (err instanceof Error) {
              errorMessage = err.message;
            } else if (typeof err === 'string') {
              errorMessage = err;
            } else if (err instanceof Object && Object.prototype.hasOwnProperty.call(err, 'message')) {
              errorMessage ="error";
            }

            setError(errorMessage);
            console.error("Authentication error:", err);
            throw err; 

        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('rol');
        setIsAuthenticated(false);
    }

    return { authenticate, loading, error, isAuthenticated, logout };
};