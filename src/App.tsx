import { Route, Routes } from "react-router-dom";
import ProductPage from "./components/pages/ProductPage";
import ProductsPage from "./components/pages/ProductsPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import { Navbar } from "./components/layout/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
