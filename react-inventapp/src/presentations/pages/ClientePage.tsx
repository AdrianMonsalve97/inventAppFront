import { useState } from "react"; // Importa solo useState
import ClienteForm from "../../components/cliente/ClienteForm";
import ClienteList from "../../components/cliente/ClienteList";
import { motion, AnimatePresence } from "framer-motion";
import { Cliente } from "../../core/Cliente"; // Importa la interfaz Cliente

const ClientePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [refreshClientes, setRefreshClientes] = useState(false); // Nuevo estado para forzar la actualización

    const handleClienteCreated = (cliente: Cliente) => {
        setRefreshClientes(prev => !prev); // Invierte el estado para forzar la actualización
        setIsOpen(false); // Cierra el modal
    };

    return (
        <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden transition-all duration-500 bg-transparent">
            {/* Elementos flotantes de fondo (sin cambios) */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-8 h-8 bg-blue-900 opacity-50 animate-floating"
                        style={{
                            top: `${Math.random() * 100}vh`,
                            left: `${Math.random() * 100}vw`,
                            animationDuration: `${Math.random() * 4 + 2}s`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <div className="backdrop-blur-xl p-5 m-4 rounded-lg shadow-lg max-w-auto w-[95%] border bg-white/20 border-gray-300 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold p-4 text-center">👥 Gestión de Clientes</h1>

                {/* Botón con animación "shake" (sin cambios) */}
                <motion.button
                    initial={{ x: 0 }}
                    animate={{ x: [0, -5, 5, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="py-3 px-6 text-lg font-bold rounded-md transition-all duration-500 relative overflow-hidden 
                    before:absolute before:w-full before:h-full before:bg-white/20 before:top-0 before:left-0 
                    before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-500 
                    text-white bg-gradient-to-r from-blue-500 to-blue-950 hover:bg-white/50"
                >
                    + Agregar Cliente
                </motion.button>

                {/* Lista de clientes (corregido) */}
                <div className="w-[95%] m-5">
                    <ClienteList key={refreshClientes} /> {/* Usa refreshClientes como key */}
                </div>
            </div>

            {/* Modal (sin cambios) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        onClick={() => setIsOpen(false)}
                    >
                        <ClienteForm onClienteCreated={handleClienteCreated} onClose={() => setIsOpen(false)} /> {/* Pasa las funciones al formulario */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ClientePage;