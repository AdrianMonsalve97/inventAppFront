    import { useState, useEffect } from "react";
    import { Orden } from "../../core/Orden";
    import { Link } from "react-router-dom";
    import { OrdenService } from "../../services/ordenService";

    interface OrdenListProps {
        recargarOrdenes: () => void; // Recibe la función recargarOrdenes
    }

    const OrdenList: React.FC<OrdenListProps> = ({ recargarOrdenes }) => { // Usa la interfaz actualizada
        const [ordenesState, setOrdenesState] = useState<Orden[]>([]);
        const [mensaje, setMensaje] = useState<{ tipo: "success" | "error" | null; texto: string }>({ tipo: null, texto: "" });
        const [loading, setLoading] = useState(true); // Estado de carga

        useEffect(() => {
            cargarOrdenes();
        }, [recargarOrdenes]); // Dependencia actualizada

        const cargarOrdenes = async () => {
            setLoading(true);
            try {
                const data = await OrdenService.obtenerTodasLasOrdenes ();
                setOrdenesState(data);
            } catch (error) {
                console.error("Error al cargar órdenes", error);
                setMensaje({ tipo: "error", texto: "Error al cargar órdenes" });
            } finally {
                setLoading(false);
            }
        };


        return (
            <div className="p-2 w-[100%] bg-white/50 shadow-md rounded-lg border border-gray-200">
                <h2 className="m-5 text-2xl font-bold text-gray-700 text-center">📦 Listado de Órdenes</h2>

                {mensaje.tipo && (
                    <div className={`p-3 rounded-md mb-4 text-white ${mensaje.tipo === "success" ? "bg-green-500" : "bg-red-500"}`}>
                        {mensaje.texto}
                    </div>
                )}

                {loading ? ( // Muestra un mensaje de carga mientras se cargan las órdenes
                    <div className="text-center text-gray-500">Cargando órdenes...</div>
                ) : (


                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border rounded-lg border-gray-300 shadow-md">
                            <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th className="p-3 text-left">Cliente</th>
                                    <th className="p-3 text-left">Productos</th>
                                    <th className="p-3 text-left">Fecha</th>
                                    <th className="p-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {ordenesState.length > 0 ? (
                                    ordenesState.map((orden) => (
                                        <tr key={orden.id} className="border-b border-r-2 border-gray-200 hover:bg-blue-50 transition-all">
                                            <td className="p-3">{orden.cliente?.nombre || "N/A"}</td>
                                            <td className="p-3">
                                                {orden.productos
                                                    .map((producto) => producto.nombre)
                                                    .join(", ") || "N/A"}
                                            </td>
                                            <td className="p-3">{orden.fecha || "N/A"}</td>

                                            <td className="p-3 text-center">
                                                <Link
                                                    to={`/orden/editar/${orden.id}`}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-all"
                                                >
                                                    ✏️ Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-3 text-center text-gray-500">
                                            No hay órdenes disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    };

    export default OrdenList;
