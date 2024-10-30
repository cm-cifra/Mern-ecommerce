import { useState } from "react";
import "./index.css";
import Signup from "./auth/signup"; // Capitalize the component name
import Login from "./auth/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./admin/adminHome";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./user/userProfile";
import CreateCategory from "./admin/category/createCategory";
import EditCategory from "./admin/category/editCategory";
import ProductList from "./admin/products/ProductList";
import CreateProduct from "./admin/products/CreateProduct";
import CreateOrEditProduct from "./admin/products/editProduct";
import ClientHome from "./product/clientHome";
import LandingPage from "./user/landingPage";
import Selected from "./product/selectedProductpage";
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const navigateToAdmin = "";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/create-Category" element={<CreateCategory />}></Route>
        <Route path="/edit-Category/:id" element={<EditCategory />}></Route>
        <Route path="/client" element={<ClientHome />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/productList" element={<ProductList />}></Route>
        <Route path="/clientHome" element={<ClientHome />}></Route>
        <Route path="/item/:id" element={<Selected />}></Route>
        <Route
          path="/editProduct/:id"
          element={<CreateOrEditProduct />}
        ></Route>
        <Route
          path="/admin"
          element={<AdminPanel navigateToAdmin={navigateToAdmin} />}
        />
        {/** user end */}
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
