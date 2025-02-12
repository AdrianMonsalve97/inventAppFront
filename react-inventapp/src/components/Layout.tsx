import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

export const Layout = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <header>
          <nav>
            <Navbar />
          </nav>
        </header>
        
        <main className="flex-grow flex flex-col justify-start p-0 m-0">
          <Outlet />
        </main>
  
        <Footer />
      </div>
    );
  };
  