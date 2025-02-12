import { useState } from "react";
import { Empresa } from "../../core/Empresa";
import { crearEmpresa } from "../../services/empresaService";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { motion } from "framer-motion";

const EmpresaForm = ({ recargar, cerrarModal }: { recargar: () => void; cerrarModal: () => void }) => {
  const [nuevaEmpresa, setNuevaEmpresa] = useState<Empresa>({
    nit: "",
    nombre: "",
    direccion: "",
    telefono: "",
    adminId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevaEmpresa({ ...nuevaEmpresa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminId = localStorage.getItem("userId");
    if (!adminId) {
      toast.error("⚠️ No se encontró el ID de administrador.");
      return;
    }

    setLoading(true);
    try {
      await crearEmpresa({ ...nuevaEmpresa, adminId });
      setNuevaEmpresa({
        nit: "",
        nombre: "",
        direccion: "",
        telefono: "",
        adminId: "",
      });
      recargar();
      cerrarModal();
      toast.success("✅ Empresa creada con éxito!");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(`❌ ${error.response.data?.mensaje || "Error desconocido."}`);
      } else {
        toast.error("❌ Error en la API.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full">
      <Toaster position="bottom-right" reverseOrder={false} />

      <h2 className="text-xl font-bold text-gray-700 mb-4">Crear Empresa</h2>

      <input name="nit" placeholder="NIT" value={nuevaEmpresa.nit} onChange={handleChange} required className="input input-bordered w-full mb-2" />
      <input name="nombre" placeholder="Nombre" value={nuevaEmpresa.nombre} onChange={handleChange} required className="input input-bordered w-full mb-2" />
      <input name="direccion" placeholder="Dirección" value={nuevaEmpresa.direccion} onChange={handleChange} required className="input input-bordered w-full mb-2" />
      <input name="telefono" placeholder="Teléfono" value={nuevaEmpresa.telefono} onChange={handleChange} required className="input input-bordered w-full mb-4" />

      {/* Botón de Guardar con Loading */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="btn w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        {loading ? <span className="loading loading-spinner"></span> : "Guardar Empresa"}
      </motion.button>

      {/* Botón para cerrar */}
      <button
        className="mt-4 w-full border border-gray-300 bg-white/40 backdrop-blur-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium rounded-lg py-2 transition-all duration-300"
        onClick={cerrarModal}
      >
        ❌ Cancelar
      </button>
    </div>
  );
};

export default EmpresaForm;
