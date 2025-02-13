import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Layout } from "../components/Layout";
import {PrivateRoute} from "../hooks/PrivateRoute"

import CategoriaPage from "../presentations/pages/CategoriaPage";
import ClientePage from "../presentations/pages/ClientePage";

const Home = lazy(() => import("../presentations/pages/Home").then(module => ({ default: module.Home })));
const Login = lazy(() => import("../presentations/pages/Login").then(module => ({ default: module.Login })));
const Products = lazy(() => import("../presentations/pages/Products").then(module => ({ default: module.Products })));
const OrdenPage = lazy(() => import("../presentations/pages/OrdenPage").then(module => ({ default: module.default })));
const NotFound = lazy(() => import("../presentations/pages/NotFound").then(module => ({ default: module.NotFound })));
const EmpresaPage = lazy(() => import("../presentations/pages/Empresa"));

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />

                        <Route element={<PrivateRoute />}>
                            <Route path="empresas" element={<EmpresaPage />} />
                            <Route path="productos" element={<Products />} />
                            <Route path="orden" element={<OrdenPage />} />
                            <Route path="categoria" element={<CategoriaPage />} />
                            <Route path="cliente" element={<ClientePage />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
