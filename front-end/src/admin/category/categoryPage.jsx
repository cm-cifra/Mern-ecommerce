const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [selectedPage, setSelectedPage] = useState("Dashboard");

const renderPage = () => {
  switch (selectedPage) {
    case "Dashboard":
      return <h1>Dashboard Page</h1>;
    case "Products":
      return <ProductPage />;
    case "Categories":
      return <CategoryList />;
    case "Add product":
      return <CreateProduct />;
    case "Profile":
      return <ProfilePage />;
    default:
      return <h1>Page Not Found</h1>;
  }
};
