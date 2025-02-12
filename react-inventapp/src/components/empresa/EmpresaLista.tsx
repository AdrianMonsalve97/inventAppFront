import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Empresa } from "../../core/Empresa";
import { obtenerEmpresas, eliminarEmpresa } from "../../services/empresaService";
import Swal from "sweetalert2";

const TablaEmpresas = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [search, setSearch] = useState("");
  const [pagina, setPagina] = useState(1);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(false);

  const empresasPorPagina = 5;

  // Función para cargar empresas con useCallback
  const cargarEmpresas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await obtenerEmpresas();
      setEmpresas(data);
    } catch (error) {
      console.error("Error al cargar empresas:", error);
      Swal.fire("Error", "No se pudieron cargar las empresas", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (empresas.length === 0) cargarEmpresas();
  }, [cargarEmpresas, empresas.length]);

  // Filtrar empresas por búsqueda
  const empresasFiltradas = empresas.filter((empresa) =>
    empresa.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Calcular empresas en la página actual
  const empresasPaginadas = empresasFiltradas.slice((pagina - 1) * empresasPorPagina, pagina * empresasPorPagina);

  // Eliminar empresa con confirmación
  const handleEliminar = async () => {
    if (!empresaSeleccionada) return;

    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        await eliminarEmpresa(empresaSeleccionada.nit);
        setEmpresas((prev) => prev.filter((e) => e.nit !== empresaSeleccionada.nit));
        Swal.fire("Eliminado", "La empresa ha sido eliminada.", "success");
      } catch (error) {
        console.error("Error al eliminar empresa:", error);
        Swal.fire("Error", "No se pudo eliminar la empresa.", "error");
      }
    }
  };

  return (
    <div className="p-5 w-full bg-white/50 shadow-md rounded-lg border border-gray-200">
      <h2 className="m-5 text-2xl font-bold text-gray-700 text-center">🏢 Lista de Empresas</h2>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar empresa..."
        className="w-full p-2 mb-4 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg border-gray-300 shadow-md">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">NIT</th>
              <th className="p-3 text-left">Dirección</th>
              <th className="p-3 text-left">Teléfono</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {empresasPaginadas.length > 0 ? (
              empresasPaginadas.map((empresa) => (
                <motion.tr
                  key={empresa.nit}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-all"
                >
                  <td className="p-3">{empresa.nombre}</td>
                  <td className="p-3">{empresa.nit}</td>
                  <td className="p-3">{empresa.direccion}</td>
                  <td className="p-3">{empresa.telefono}</td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-all"
                      onClick={() => setEmpresaSeleccionada(empresa)}
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-all"
                      onClick={() => {
                        setEmpresaSeleccionada(empresa);
                        handleEliminar();
                      }}
                    >
                      <FaTrash />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-gray-500">
                  No hay empresas disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(empresasFiltradas.length / empresasPorPagina) }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-1 rounded-md ${
              pagina === i + 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setPagina(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TablaEmpresas;
