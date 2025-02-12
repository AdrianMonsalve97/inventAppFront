import { useState } from "react";
import { crearOrden } from "../../services/ordenService";

const OrdenForm = ({
  clientes,
  productos,
  onOrdenAgregada,
}: {
  clientes: { id: string; nombre: string }[];
  productos: { id: string; nombre: string }[];
  onOrdenAgregada: () => void;
}) => {
  const [clienteId, setClienteId] = useState("");
  const [productoIds, setProductoIds] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteId || productoIds.length === 0) return;

    try {
      await crearOrden({ clienteId, productoIds });
      alert("Orden creada exitosamente");
      onOrdenAgregada();
      setClienteId("");
      setProductoIds([]);
    } catch (error) {
      alert("Error al crear la orden");
    }
  };

  return (
    <div className="p-6 w-[80%] bg-white/60 backdrop-blur-lg shadow-md rounded-lg border border-gray-300">
      <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Crear Orden
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          className="p-3 border rounded-md bg-white/50"
          required
        >
          <option value="">Seleccione un Cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>

        <select
          multiple
          value={productoIds}
          onChange={(e) =>
            setProductoIds(Array.from(e.target.selectedOptions, (opt) => opt.value))
          }
          className="p-3 border rounded-md bg-white/50"
          required
        >
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-5 py-2 text-lg font-bold rounded-md bg-gradient-to-r from-green-500 to-green-700 text-white"
        >
          Guardar Orden
        </button>
      </form>
    </div>
  );
};

export default OrdenForm;
