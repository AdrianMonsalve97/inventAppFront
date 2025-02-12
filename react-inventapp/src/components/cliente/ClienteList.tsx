import { useEffect, useState } from "react";
import { obtenerClientes } from "../../services/clienteService";
import { Cliente } from "../../core/Cliente";

const ClienteList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data: Cliente[] = await obtenerClientes();
        setClientes(data ?? []);
      } catch (err) {
        console.error("Error al obtener clientes:", err);
        setError("Error al cargar los clientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) return <p className="text-center text-blue-600 font-bold">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-2 w-[100%] bg-white/50 shadow-md rounded-lg border border-gray-200">
      <h2 className="m-5 text-2xl font-bold text-gray-700 text-center">🧑‍💼 Listado de Clientes</h2>

      {clientes.length === 0 ? (
        <p className="text-center text-gray-500">No hay clientes registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border rounded-lg border-gray-300 shadow-md">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Dirección</th>
                <th className="p-3 text-left">email</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b border-gray-200 hover:bg-blue-50 transition-all">
                  <td className="p-3 font-semibold">{cliente.nombre}</td>
                  <td className="p-3">{cliente.direccion || "N/A"}</td>
                  <td className="p-3">{cliente.telefono || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClienteList;
