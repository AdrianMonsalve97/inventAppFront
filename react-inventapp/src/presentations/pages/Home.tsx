import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const shapes = [
    { className: "w-24 h-24 bg-white opacity-70 rounded-lg", x: -50, y: -30 }, 
    {
      className: "w-32 h-32 border-4 border-white opacity-15 rounded-full",
      x: 50,
      y: 30,
    }, 
    {
      className: "w-20 h-20 bg-white opacity-40 rotate-12 skew-y-6 rounded-md",
      x: -30,
      y: 50,
    }, 
    { className: "w-24 h-24 bg-white opacity-70 rounded-xl", x: 30, y: -50 }, 
    { className: "w-16 h-28 bg-white opacity-30 rounded-full", x: 15, y: -20 }, 
    { className: "w-28 h-28 bg-white opacity-60 rotate-45", x: 10, y: 40 }, 
    { className: "w-36 h-36 bg-white opacity-50 rounded-full", x: 40, y: -40 }, 
    {
      className: "w-10 h-10 bg-white opacity-70 clip-triangle",
      x: -20,
      y: -40,
    }, 
    {
      className: "w-14 h-14 border-2 border-white opacity-20 rounded-full",
      x: -20,
      y: 20,
    },
    {
      className: "w-18 h-18 bg-white opacity-50 rotate-45 rounded-lg",
      x: 60,
      y: -60,
    }, 
    { className: "w-36 h-36 bg-white opacity-45 rounded-full", x: 40, y: -40 }, 
    {
      className: "w-28 h-28 border-2 border-white opacity-30 rounded-md",
      x: -60,
      y: 60,
    }, 
    {
      className: "w-20 h-20 bg-white opacity-50 rotate-30 clip-hexagon",
      x: 30,
      y: -30,
    }, 
  ];

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 overflow-hidden">
 
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.className}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, shape.x, -shape.x, 0],
            y: [0, shape.y, -shape.y, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 text-center text-white p-10">
        <h1 className="text-6xl font-extrabold mb-4 text-blue-950 drop-shadow-lg">
          Bienvenido a InventApp
        </h1>
        <p className="text-lg text-black font-semibold opacity-90">
          Administra tu inventario y productos con facilidad.
        </p>
        <motion.button
          className="relative mt-6 px-8 py-3 font-bold text-white uppercase rounded-lg shadow-lg overflow-hidden
               bg-gradient-to-r from-black via-blue-950 to-blue-700
               hover:from-blue-350 hover:via-blue-600 hover:to-blue-500
               transition-all duration-500 ease-in-out transform hover:scale-105"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 4px 30px rgba(0, 132, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
        >
          <span className="relative z-10">Iniciar Sesión</span>

          <span className="absolute inset-0 bg-white opacity-10 blur-md"></span>
          <span className="absolute inset-0 bg-white opacity-5 blur-xl"></span>
          <span className="absolute -inset-1 border-2 border-blue-300 opacity-30 rounded-lg animate-pulse"></span>
        </motion.button>
      </div>
    </div>
  );
};
