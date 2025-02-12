import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Para manejar la navegación
import "../../components/login/login.css"; // Asegúrate de importar los estilos CSS

export const Login = () => {
    const navigate = useNavigate(); // Hook para redireccionar
    const { loading } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        return localStorage.getItem("theme") === "dark";
    });
    
    useEffect(() => {
        const handleStorageChange = () => {
            setIsDarkMode(localStorage.getItem("theme") === "dark");
        };
    
        window.addEventListener("storage", handleStorageChange);
    
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
    

    function handleLogin(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        
        // Simulación de login exitoso
        setTimeout(() => {
            navigate("/productos"); // Redirige a la página de productos
        }, 1000);
    }

    return (
        <div className={`relative flex items-center justify-center h-screen w-full overflow-hidden transition-all duration-500 ${isDarkMode ? "bg-black" : "bg-white"}`}>
            
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-6 h-6 bg-blue-900 opacity-50 animate-floating"
                        style={{
                            top: `${Math.random() * 100}vh`,
                            left: `${Math.random() * 100}vw`,
                            animationDuration: `${Math.random() * 10 + 5}s`,
                            transform: "rotate(45deg)",
                        }}
                    />
                ))}
            </div>

            <div className={`relative backdrop-blur-xl p-8 rounded-lg shadow-lg w-[30%] border ${isDarkMode ? "bg-white/10 border-blue-500/50" : "bg-white/90 border-gray-300"}`}>
                
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-3 left-3 flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-all"
                >
                    <ArrowLeft size={20} />
                    Volver al Home
                </button>

                <div className="mb-4 flex justify-center">
                    <img 
                        src="/src/assets/image/Login.png" 
                        alt="Login Illustration"  
                        className="animate-fadeIn animate-scaleIn"
                    />
                </div>

                <form onSubmit={handleLogin} className="text-left">
                    
                    <div className="relative mb-6">
                        <Mail className={`absolute left-3 top-3 ${isDarkMode ? "text-blue-400" : "text-gray-500"}`} size={20} />
                        <input 
                            type="text" 
                            placeholder="Usuario o Email" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full pl-10 p-3 border rounded-md bg-transparent ${isDarkMode ? "text-white placeholder-blue-400 border-blue-500 focus:ring-blue-500" : "text-black placeholder-gray-600 border-gray-400 focus:ring-gray-500"} focus:ring-2 focus:border-transparent transition-all duration-300 shadow-md hover:shadow-blue-500/50`}
                        />
                    </div>

                    <div className="relative mb-6">
                        <Lock className={`absolute left-3 top-3 ${isDarkMode ? "text-blue-400" : "text-gray-500"}`} size={20} />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-10 p-3 border rounded-md bg-transparent ${isDarkMode ? "text-white placeholder-gray-400 border-blue-500 focus:ring-blue-500" : "text-black placeholder-gray-600 border-gray-400 focus:ring-gray-500"} focus:ring-2 focus:border-transparent transition-all duration-300 shadow-md hover:shadow-blue-500/50`}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`w-full py-3 text-lg font-bold rounded-md transition-all duration-500 relative overflow-hidden before:absolute before:w-full before:h-full before:bg-white/20 before:top-0 before:left-0 before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-500 ${isDarkMode ? "text-white bg-gradient-to-r from-blue-900 to-blue-500 hover:from-blue-500 hover:to-blue-500 hover:shadow-blue-500/50" : "text-white bg-gradient-to-r from-blue-500 to-blue-950 hover:bg-white/50"}`}
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "INICIAR SESIÓN"}
                    </button>
                </form>
            </div>
        </div>
    );
};
