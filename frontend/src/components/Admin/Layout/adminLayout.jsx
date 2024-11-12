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
import { useNavigate } from "react-router-dom";

const AdminLayout = ({children}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const nevigate=useNavigate()
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

  const renderTabContent = (id) => {
    switch (id) {
      case "products":
        console.log("NEVIGATING");
        
        nevigate("/adminDash/products")
        return
        // return <ProductActions />;
      case "dashboard":
        nevigate("/adminDash/")
        return
        // return <ProductData />;
      case "orders":
        nevigate("/adminDash/orders")
        return
        // return <Main />;
      case "tools":
        nevigate("/adminDash/tools")
        return
        // return <CreateCategory />;
      case "businessCategory":
        nevigate("/adminDash/businessCategory")
        return
        // return <CreateBusinessCategory />;
      case "manage-tools":
        nevigate("/adminDash/manage-tools")
        return
        // return <ManageTools />;
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
              onClick={() => {setActiveTab(tab.id)
                renderTabContent(tab.id)
              }}
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
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
