import { useState } from "react";
import { Categoria } from "../../core/Categoria";
import { crearCategoria } from "../../services/categoriaService";

const CategoriaForm = ({
  onCategoriaAgregada,
  setIsOpen,
}: {
  onCategoriaAgregada: (categoria: Categoria) => void;
  setIsOpen: (open: boolean) => void;
}) => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    try {
      const nuevaCategoria = await crearCategoria({ nombre });
      onCategoriaAgregada(nuevaCategoria);
      setNombre("");
      setIsOpen(false); 
    } catch (error) {
      console.error("Error al crear la categoría", error);
    }
  };

  return (
    <div className="backdrop-blur-xl p-6 my-4 rounded-lg shadow-lg border bg-white/20 border-gray-300 max-w-md w-full">
      <h3 className="text-2xl font-bold text-center mb-4 text-black">
        Crear Nueva Categoría
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="p-3 border border-gray-400 rounded-md bg-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-5 py-2 text-lg font-bold rounded-md transition-all duration-500 relative overflow-hidden
            before:absolute before:w-full before:h-full before:bg-white/20 before:top-0 before:left-0 before:scale-x-0 
            hover:before:scale-x-100 before:transition-all before:duration-500 text-white 
            bg-gradient-to-r from-gray-500 to-gray-700 hover:bg-white/50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-5 py-2 text-lg font-bold rounded-md transition-all duration-500 relative overflow-hidden
            before:absolute before:w-full before:h-full before:bg-white/20 before:top-0 before:left-0 before:scale-x-0 
            hover:before:scale-x-100 before:transition-all before:duration-500 text-white 
            bg-gradient-to-r from-green-700 to-green-900 hover:bg-white/50"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoriaForm;
