import { useState } from "react";
import "../../components/categoria/Categoria.css";
import CategoriaList from "../../components/categoria/CategoriaList";
import CategoriaForm from "../../components/categoria/CategoriaForm";

export const CategoriaPage = () => {
  const [reload, setReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para mostrar el modal

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
          Gestión de Categorías
        </h1>
        <CategoriaList reload={reload} />

        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 py-2 px-4 text-lg font-bold rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Agregar Categoría
        </button>

        <button
          onClick={() => setReload(!reload)}
          className="mt-4 py-2 px-4 text-lg font-bold rounded-md transition-all duration-500 relative overflow-hidden
          before:absolute before:w-full before:h-full before:bg-white/20 before:top-0 before:left-0 before:scale-x-0 
          hover:before:scale-x-100 before:transition-all before:duration-500 text-white 
          bg-gradient-to-r from-green-500 to-green-700 hover:bg-white/50"
        >
          Recargar Categorías
        </button>

        {/* Modal para agregar categoría */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Nueva Categoría</h3>
              <CategoriaForm
                onCategoriaAgregada={() => {
                  setIsOpen(false);
                  setReload(!reload); // Recargar la lista después de agregar
                }}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriaPage;
