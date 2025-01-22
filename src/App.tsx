import { Route, Routes } from "react-router-dom";
import { ProductPage } from "./pages/ProductPage";
import { ProductsPage } from "./pages/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Navbar } from "./components/Navbar";

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

// The pagination path should be localhost/products/?page=2
// The products based on categories should be localhost/products/?category=xyz
// The product based on sorting should be localhost/products/?sort=lowprice or sort=highprice or sort=defaultOrder
