import { useState, useEffect } from "react";
import clienteService from "../../services/clienteService";
import { Cliente } from "../../core/Cliente";
import { Producto } from "../../core/Producto";
import { listarProductos } from "../../services/productService";

interface OrdenFormProps {
  onOrdenAgregada: () => void;
}

const OrdenForm: React.FC<OrdenFormProps> = ({ onOrdenAgregada }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [clienteId, setClienteId] = useState<number | "">(""); // Puede ser un número o vacío
  const [productosSeleccionados, setProductosSeleccionados] = useState<
    string[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar clientes y productos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const clientesData = await clienteService.obtenerClientes();
        const productosData = await listarProductos(); // Asegúrate de que esta función existe
        setClientes(clientesData);
        setProductos(productosData);
      } catch (error) {
        setError("Error al obtener datos");
      }
    };
    cargarDatos();
  }, []);

  const handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setClienteId(value ? Number(value) : ""); // Convierte solo si hay valor
  };

  // Manejar selección de productos
  const handleProductoChange = (id: string) => {
    setProductosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!clienteId || productosSeleccionados.length === 0) {
      setError("Debe seleccionar un cliente y al menos un producto.");
      return;
    }

    setIsLoading(true);
    try {
      const nuevaOrden = {
        clienteId: Number(clienteId),
        productos: productosSeleccionados,
      };
      console.log("Orden enviada:", nuevaOrden);
      onOrdenAgregada();
      setClienteId("");
      setProductosSeleccionados([]);
    } catch (error) {
      setError("Error al crear la orden");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 text-center">
        Crear Orden
      </h2>

      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Selección de Cliente */}
        <div className="mb-4">
          <label
            htmlFor="cliente"
            className="block text-gray-700 font-bold mb-2"
          >
            Cliente:
          </label>
          <select
            id="cliente"
            value={clienteId === "" ? "" : String(clienteId)} // Siempre string
            onChange={handleClienteChange}
            className="border rounded w-full py-2 px-3"
          >
            <option value="">Seleccione un Cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={String(cliente.id)}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Productos */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Productos:
          </label>
          <div className="border rounded p-2 max-h-40 overflow-y-auto">
            {productos.map((producto) => (
              <label key={producto.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={String(producto.id)} // Convertimos a string
                  checked={productosSeleccionados.includes(String(producto.id))}
                  onChange={() => handleProductoChange(String(producto.id))}
                />
                {producto.nombre} - ${producto.precio}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {isLoading ? "Creando orden..." : "Guardar Orden"}
        </button>
      </form>
    </div>
  );
};

export default OrdenForm;
