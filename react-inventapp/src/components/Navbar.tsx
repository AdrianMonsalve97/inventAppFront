import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const isLoginPage = location.pathname === "/login";

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkMode(newTheme === "dark");
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const handleStorageChange = () => setDarkMode(localStorage.getItem("theme") === "dark");
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className={`shadow-md transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo con efecto de escaneo */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Link to="/" className="text-2xl font-bold tracking-wide relative overflow-hidden">
            <span className="relative z-10">InventApp</span>
            <motion.div
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </Link>
        </motion.div>

        {!isLoginPage && (
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}

        {!isLoginPage && (
          <ul
            className={`lg:flex lg:items-center lg:space-x-6 absolute lg:static w-full lg:w-auto left-0 top-14 bg-transparent lg:bg-transparent transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden"}`}
          >
            {location.pathname !== "/" && (
              <>
                <li><Link to="/empresas" className="nav-button">Empresas</Link></li>
                <li><Link to="/productos" className="nav-button">Productos</Link></li>
                <li><Link to="/inventario" className="nav-button">Inventario</Link></li>
                <li><Link to="/categoria" className="nav-button">Categorias</Link></li>
                <li><Link to="/cliente" className="nav-button">Clientes</Link></li>

                <li className="relative">
                  <button className="nav-button flex items-center" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    Más opciones <ChevronDown className="ml-1" size={18} />
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute bg-white text-black shadow-lg rounded-md py-2 mt-1 w-40">
                      <li><Link to="/cliente" className="dropdown-item">Cliente</Link></li>
                      <li><Link to="/configuracion" className="dropdown-item">Configuración</Link></li>
                    </ul>
                  )}
                </li>
              </>
            )}
          </ul>
        )}

        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="nav-button">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Botón de Iniciar Sesión */}
          {location.pathname === "/home" && (
            <Link to="/login" className="px-5 py-2 font-bold text-white bg-black rounded-lg shadow-md hover:bg-gray-800 transition-all">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
