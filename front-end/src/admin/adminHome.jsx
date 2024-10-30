import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./adminSidebar";
import Header from "./adminHeader";
import ProductList from "./products/ProductList";
import ProfilePage from "../user/userProfile";
import CategoryList from "./category/categoryList";
import CreateProduct from "./products/CreateProduct";

function AdminPanel() {
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const pageFromState = location.state?.selectedPage;
    const pageFromStorage = localStorage.getItem("selectedPage");
    if (pageFromState) {
      setSelectedPage(pageFromState);
      localStorage.setItem("selectedPage", pageFromState);
    } else if (pageFromStorage) {
      setSelectedPage(pageFromStorage);
    }
  }, [location.state]);

  const renderPage = () => {
    switch (selectedPage) {
      case "Dashboard":
        return <h1>Dashboard Page</h1>;
      case "Products":
        return <ProductList setSelectedPage={setSelectedPage} />;
      case "Categories":
        return <CategoryList setSelectedPage={setSelectedPage} />;
      case "Add product":
        return <CreateProduct setSelectedPage={setSelectedPage} />;
      case "Profile":
        return <ProfilePage />;
      default:
        return <h1>Page Not Found</h1>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 bg-white shadow-lg z-20 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar setSelectedPage={setSelectedPage} />
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 md:ml-34">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {renderPage()}
      </main>
    </div>
  );
}

export default AdminPanel;
