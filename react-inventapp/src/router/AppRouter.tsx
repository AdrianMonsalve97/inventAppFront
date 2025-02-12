import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Layout } from "../components/Layout"; 
import CategoriaPage from "../presentations/pages/CategoriaPage";
import ClientePage from "../presentations/pages/ClientePage";

const Home = lazy(() => import("../presentations/pages/Home").then(module => ({ default: module.Home })));
const Login = lazy(() => import("../presentations/pages/Login").then(module => ({ default: module.Login })));
const Products = lazy(() => import("../presentations/pages/Products").then(module => ({ default: module.Products })));
const Inventory = lazy(() => import("../presentations/pages/Inventory").then(module => ({ default: module.Inventory })));
const NotFound = lazy(() => import("../presentations/pages/NotFound").then(module => ({ default: module.NotFound })));
const EmpresaPage = lazy(() => import("../presentations/pages/Empresa"));

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    {/* Agrupamos todas las rutas dentro del Layout */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="empresas" element={<EmpresaPage />} />
                        <Route path="productos" element={<Products />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="categoria" element={<CategoriaPage/>}/>
                        <Route path="cliente" element={<ClientePage/>}/>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
