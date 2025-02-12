import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  FormEvent,
} from "react";
import { listarCategorias } from "../../services/categoriaService";
import { crearProducto } from "../../services/productService";
import { Categoria } from "../../core/Categoria";
import { X } from "lucide-react";

type Producto = {
  codigo: string;
  nombre: string;
  caracteristicas: string;
  precio: number;
  moneda: string;
  empresaNit: string;
  categorias: string[];
};

interface ProductoFormProps {
  onProductoAgregado: (producto: Producto) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ProductoForm = ({
  onProductoAgregado,
  isOpen,
  setIsOpen,
}: ProductoFormProps) => {
  const [producto, setProducto] = useState<Producto>({
    codigo: "",
    nombre: "",
    caracteristicas: "",
    precio: 1000,
    moneda: "",
    empresaNit: "",
    categorias: [],
  });

  const [categorias, setCategorias] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState<{
    tipo: "success" | "error" | null;
    texto: string;
  }>({
    tipo: null,
    texto: "",
  });

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data: Categoria[] = await listarCategorias();
        setCategorias(data.map((c) => c.nombre));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setMensaje({
          tipo: "error",
          texto:
            "No se pudieron cargar las categorías. Inténtalo de nuevo más tarde.",
        });
      }
    };

    cargarCategorias();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setProducto((prev) => ({ ...prev, categorias: selectedOptions }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await crearProducto(producto);
      setMensaje({ tipo: "success", texto: "Producto agregado con éxito" });
      onProductoAgregado(producto);
      setProducto({
        codigo: "",
        nombre: "",
        caracteristicas: "",
        precio: 1000,
        moneda: "",
        empresaNit: "",
        categorias: [],
      });

      setTimeout(() => {
        setMensaje({ tipo: null, texto: "" });
        setIsOpen(false);
        window.location.reload(); // 🔄 Recargar la página después de cerrar el modal
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMensaje({ tipo: "error", texto: "No se pudo agregar el producto" });
      setTimeout(() => setMensaje({ tipo: null, texto: "" }), 3000);
    }
  };

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex h-full w-full items-center justify-center bg-blue-950/30 bg-opacity-50 z-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="relative bg-black/70 dark:bg-[#]  p-6 rounded-lg shadow-lg max-w-2xl w-full">
            {/* Botón de cierre */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-red-700 hover:text-red-800 dark:hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Título */}
            <h2 className="text-2xl font-bold text-center mb-4 text-white dark:text-white">
              Agregar Producto
            </h2>

            {/* Mensaje */}
            {mensaje.tipo && (
              <div
                className={`p-3 rounded-md text-center mb-4 ${
                  mensaje.tipo === "success" ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {mensaje.texto}
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="codigo"
                placeholder="Código"
                value={producto.codigo}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-white/80 dark:border-blue-400 text-black"
                required
              />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={producto.nombre}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-white/80 dark:border-blue-400 text-black"
                required
              />
              <textarea
                name="caracteristicas"
                placeholder="Características"
                value={producto.caracteristicas}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-white/80 dark:border-blue-400 text-black"
              />
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={producto.precio}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-white/80 dark:border-blue-400 text-black"
                required
              />
              <input
                type="text"
                name="moneda"
                placeholder="Moneda"
                value={producto.moneda}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-white/80 dark:border-blue-400 text-black"
              />
              <input
                type="text"
                name="empresaNit"
                placeholder="NIT Empresa"
                value={producto.empresaNit}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-white/80 dark:border-blue-400 text-black"
                required
              />
              <label className="block text-sm font-semibold text-white dark:text-white">
                Categorías
              </label>
              <select
                value={producto.categorias}
                onChange={handleCategoriaChange}
                className="w-full p-2 border rounded-lg dark:bg-white/80 dark:border-blue-600 text-black my-5"
              >
                {categorias.map((categoria, index) => (
                  <option key={index} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="my-5 w-full bg-gradient-to-r from-blue-950 to-blue-700 hover:from-blue-400 hover:to-blue-800 text-white py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 active:scale-95 border-2 border-transparent hover:border-white animate-pulse"
              >
                Agregar Producto
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductoForm;
