import { useState } from "react";
import { crearCliente } from "../../services/clienteService";

const ClienteForm = ({ setIsOpen }: { setIsOpen: (open: boolean) => void }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !direccion.trim() || !telefono.trim()) return;

    try {
      const nuevoCliente = await crearCliente({ id: crypto.randomUUID(), nombre, direccion, telefono });
      console.log("Cliente creado:", nuevoCliente);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al crear cliente", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">Crear Cliente</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="p-2 border rounded-md"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;
