import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrdenForm from "../../components/orden/OrdenForm";
import OrdenLista from "../../components/orden/OrdenLista"; 

const OrdenPage = () => {
  const [reload, setReload] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const recargarOrdenes = useCallback(() => {
    setReload((prev) => !prev); 
  }, []);

 
  const cerrarModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden transition-all duration-500 bg-transparent">
  
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i} 
            className="absolute w-8 h-8 bg-green-900 opacity-50 animate-floating"
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
        <h1 className="text-4xl font-bold p-4 text-center">
          📦 Gestión de Órdenes
        </h1>

        <motion.button
          initial={{ x: 0 }}
          animate={{ x: [0, -5, 5, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen(true)}
          className="py-3 px-6 text-lg font-bold rounded-md transition-all duration-500 text-white bg-gradient-to-r from-green-500 to-green-900 hover:bg-white/50"
        >
          + Crear Orden
        </motion.button>

        <div className="w-[95%] m-5">
          <OrdenLista key={reload.toString()} recargarOrdenes={function (): void {
          } } />
        </div>
      </div>

  
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={cerrarModal} 
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <OrdenForm recargar={recargarOrdenes} cerrarModal={cerrarModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrdenPage;