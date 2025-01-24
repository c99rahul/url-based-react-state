import { Route, Routes } from "react-router-dom";
import ProductPage from "./components/pages/ProductPage";
import ProductsPage from "./components/pages/ProductsPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import HomePage from "./components/pages/HomePage";
import { Navbar } from "./components/layout/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
