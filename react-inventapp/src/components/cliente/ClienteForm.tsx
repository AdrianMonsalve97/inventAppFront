import { useState } from "react";
import { Cliente } from "../../core/Cliente";
import clienteService from "../../services/clienteService";

interface Props {
    onClienteCreated: (cliente: Cliente) => void;
    onClose: () => void;
}

const ClienteForm: React.FC<Props> = ({ onClienteCreated, onClose }) => {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!nombre.trim() || !direccion.trim() || !telefono.trim()) {
            setError("Todos los campos son obligatorios.");
            setLoading(false);
            return;
        }

        try {
            const nuevoCliente: Cliente = await clienteService.crearCliente({
                nombre,
                direccion,
                telefono,
            });
            onClienteCreated(nuevoCliente);
            onClose();
        } catch (error: unknown) {
            let errorMessage = "Error al crear el cliente. Inténtalo de nuevo.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.error("Error al crear cliente:", error);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg mb-4">
            <h3 className="text-lg font-bold mb-2">Crear Cliente</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="p-2 border rounded-md"
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="p-2 border rounded-md"
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="p-2 border rounded-md"
                    disabled={loading}
                />
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md disabled:bg-green-300"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClienteForm;