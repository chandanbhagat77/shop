import { useState, useEffect } from "react";
import {
  FaChartPie,
  FaUsers,
  FaBox,
  FaClipboardList,
  FaChartLine,
  FaTools,
  FaCogs,
  FaQuestionCircle,
} from "react-icons/fa";
import ProductActions from "./../ProductsCRUD/ProductsCRUD";
import ManageTools from "./../Tools/ManageTools";
import CreateCategory from "./../Tools/CreateCatefory";
import ProductData from "./ProductData";
import Main from "../OrderCRUD/Main";
import CreateBusinessCategory from "../Tools/CreateBusinessCategory";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <FaChartPie /> },
    { id: "users", label: "Users", icon: <FaUsers /> },
    { id: "products", label: "Products", icon: <FaBox /> },
    { id: "orders", label: "Orders", icon: <FaClipboardList /> },
    { id: "analytics", label: "Analytics", icon: <FaChartLine /> },
    { id: "tools", label: "Tools", icon: <FaTools /> },
    { id: "manage-tools", label: "Manage Tools", icon: <FaCogs /> }, 
    { id: "businessCategory", label: "Category", icon: <FaTools /> },
    { id: "help", label: "Help", icon: <FaQuestionCircle /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductActions />;
      case "dashboard":
        return <ProductData />;
      case "orders":
        return <Main />;
      case "tools":
        return <CreateCategory />;
      case "businessCategory":
        return <CreateBusinessCategory />;
      case "manage-tools":
        return <ManageTools />;
      default:
        return <p className="text-gray-600">Content for {activeTab}</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg w-64 p-4 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 `}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Admin Panel</h1>
        <nav className="flex flex-col space-y-2 ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 rounded-lg text-left transition duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-1 py-10">
        <button
          className="md:hidden mb-4 p-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          Toggle Menu
        </button>
        <div className="bg-white">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
