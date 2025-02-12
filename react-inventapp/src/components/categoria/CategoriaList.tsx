import { useEffect, useState } from "react";
import { Categoria } from "../../core/Categoria";
import { listarCategorias } from "../../services/categoriaService";

const CategoriaList = ({ reload }: { reload: boolean }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    cargarCategorias();
  }, [reload]); // Se ejecuta cuando cambia `reload`

  const cargarCategorias = async () => {
    try {
      const data = await listarCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al listar categorías", error);
    }
  };

  return (
    <div className="backdrop-blur-xl p-5 m-4 rounded-lg shadow-lg max-w-auto w-[95%] border bg-white/70 border-gray-300 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">Lista de Categorías</h2>
      <ul className="space-y-2 w-[85%]">
        {categorias.map((categoria) => (
          <li
            key={categoria.id}
            className="flex justify-between items-center w-[85%] p-5 border rounded-md"
          >
            <span>{categoria.nombre}</span>
            <button
              onClick={() => console.log("Eliminar", categoria.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriaList;
