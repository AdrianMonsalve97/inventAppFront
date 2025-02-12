import { useState } from "react";
import ProductoForm from "../../components/productos/ProductoForm";
import ProductoList from "../../components/productos/ProductoList";
import { Producto } from "../../core/Producto";
import "../../components/productos/Producto.css"; // Importa correctamente el CSS

export const Products = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleProductoAgregado = (nuevoProducto: Producto) => {
    setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden transition-all duration-500 bg-transparent">
      {/* Elementos flotantes de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 bg-blue-900 opacity-50 animate-floating"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 4 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className=" backdrop-blur-xl p-5 m-4 rounded-lg shadow-lg max-w-auto w-[95%] border bg-white/20 border-gray-300 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold p-4 text-center">
          Gestión de Productos
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="py-3 px-6 text-lg font-bold rounded-md transition-all duration-500 relative overflow-hidden before:absolute before:w-full before:h-full before:bg-white/20 before:top-0 before:left-0 before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-500 text-white bg-gradient-to-r from-blue-500 to-blue-950 hover:bg-white/50"
        >
          Crear Producto
        </button>

        <div className="justify-center w-[95%] m-5 flex flex-auto lg:flex-row gap-1">
          <ProductoForm
            onProductoAgregado={handleProductoAgregado}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className="flex-2 min-w-0"
          />
          <ProductoList products={productos} className="flex-2 min-w-0" />
        </div>
      </div>
    </div>
  );
};
