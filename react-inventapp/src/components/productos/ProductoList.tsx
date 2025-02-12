  import { useState, useEffect } from "react";
  import { Producto } from "../../core/Producto";
  import { listarProductos } from "../../services/productService";
  import { Categoria } from "../../core/Categoria";
  import { Link } from "react-router-dom";
  import { listarCategorias } from "../../services/categoriaService";

  interface ProductoListProps {
    products: Producto[];
  }

  const ProductoList: React.FC<ProductoListProps> = ({ products }) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [mensaje, setMensaje] = useState<{ tipo: "success" | "error" | null; texto: string }>({ tipo: null, texto: "" });

    useEffect(() => {
      cargarProductos();
      cargarCategorias();
    }, []);

    const cargarProductos = async () => {
      try {
        const data = await listarProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos", error);
        setMensaje({ tipo: "error", texto: "Error al cargar productos" });
      }
    };

    const cargarCategorias = async () => {
      try {
        const data = await listarCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
        setMensaje({ tipo: "error", texto: "Error al cargar categorías" });
      }
    };

    return (
      <div className="p-2 w-[100%] bg-white/50 shadow-md rounded-lg border border-gray-200">
        <h2 className="m-5 text-2xl font-bold  text-gray-700 text-center">📦 Listado de Productos</h2>

        {mensaje.tipo && (
          <div className={`p-3 rounded-md mb-4 text-white ${mensaje.tipo === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {mensaje.texto}
          </div>
        )}

        <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg border-gray-300 shadow-md">
        <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3 text-left">Código</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Características</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-left">Categorías</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {productos.length > 0 ? (
                productos.map((producto) => (
                  <tr key={producto.codigo} className="border-b border-r-2 border-gray-200 hover:bg-blue-50 transition-all">
                    <td className="p-3">{producto.codigo}</td>
                    <td className="p-3">{producto.nombre}</td>
                    <td className="p-3">{producto.caracteristicas || "N/A"}</td>
                    <td className="p-3 font-semibold">
                      {producto.precio && producto.precio > 0
                        ? new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: producto.moneda || "COP",
                          }).format(producto.precio)
                        : "N/A"}
                    </td>
                    <td className="p-3">
                      {producto.categorias
                        .map((categoriaNombre) => {
                          const categoria = categorias.find((cat) => cat.nombre === categoriaNombre);
                          return categoria ? categoria.nombre : "";
                        })
                        .join(", ") || "Sin categoría"}
                    </td>
                    <td className="p-3 text-center">
                      <Link
                        to={`/producto/editar/${producto.codigo}`}
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
                    No hay productos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default ProductoList;
