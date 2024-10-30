import React from "react";

function Sidebar({ setSelectedPage }) {
  const sidebarItems = [
    { name: "Dashboard", icon: "📊" },
    {
      name: "Products",
      subItems: ["Add product", "Product list", "Categories", "Brands"],
      icon: "🛒",
    },
    { name: "Orders", icon: "📦" },
  ];

  return (
    <div className="p-4 md:min-h-screen border-r border-gray-200">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Admin Panel</h1>
      <nav>
        <ul className="space-y-4">
          {sidebarItems.map((item, idx) => (
            <li key={idx}>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setSelectedPage(item.name)}
              >
                <span>{item.icon}</span>
                <span className="text-lg">{item.name}</span>
              </div>
              {item.subItems && (
                <ul className="ml-4 space-y-2">
                  {item.subItems.map((subItem, subIdx) => (
                    <li
                      key={subIdx}
                      className="text-sm text-gray-600 cursor-pointer"
                      onClick={() => setSelectedPage(subItem)}
                    >
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
