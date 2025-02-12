import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Footer = () => {
  const [diamonds, setDiamonds] = useState<{ id: number; x: number; size: number; speed: number; delay: number }[]>([]);

  useEffect(() => {
    const generateDiamonds = () => {
      const newDiamonds = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, 
        size: Math.random() * 6 + 4, 
        speed: Math.random() * 1 + 4, 
        delay: Math.random() * 5, 
      }));
      setDiamonds(newDiamonds);
    };

    generateDiamonds();
  }, []);

  return (
    <footer className="relative w-full h-32 bg-gray-900 text-white flex items-center justify-center overflow-hidden">
      <p className="relative z-10 text-lg font-semibold">© 2025 AdrianMonsalve</p>

      {/* Animación de rombos */}
      {diamonds.map((diamond) => (
        <motion.div
          key={diamond.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0] }}
          transition={{
            duration: diamond.speed,
            repeat: Infinity,
            repeatDelay: 2,
            delay: diamond.delay,
          }}
          className="absolute bg-gray-300 rotate-45"
          style={{
            left: `${diamond.x}%`,
            width: `${diamond.size}px`,
            height: `${diamond.size}px`,
            backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`, 
          }}
        />
      ))}
    </footer>
  );
};

export default Footer;
