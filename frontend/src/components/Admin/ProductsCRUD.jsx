import React, { useState } from "react";
import { motion } from "framer-motion";
import CreateProductForm from "./AddProduct";
import EditProductForm from "./EditProduct";

const ProductActions = () => {
  const [activeComponent, setActiveComponent] = useState("create");

  const buttons = [
    { name: "Create Product", action: "create", icon: "➕" },
    { name: "Delete", action: "delete", icon: "🗑️" },
    { name: "Hide", action: "hide", icon: "👁️" },
    { name: "Edit Product", action: "edit", icon: "✏️" },
  ];

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "create":
        return <CreateProductForm />;
      case "delete":
        return <DeleteProduct />;
      case "hide":
        return <HideProduct />;
      case "edit":
        return <EditProductForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 ">
        {buttons.map((button) => (
          <motion.button
            key={button.action}
            onClick={() => setActiveComponent(button.action)}
            className={`flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition duration-300 ${
              activeComponent === button.action
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{button.icon}</span>
            {button.name}
          </motion.button>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-50 rounded-xl p-1 "
      >
        {renderActiveComponent()}
      </motion.div>
    </>
  );
};

const DeleteProduct = () => (
  <div className="text-gray-800">
    <h3 className="text-2xl font-semibold mb-4">Delete Product</h3>
    <p>Confirmation dialog for product deletion goes here.</p>
  </div>
);

const HideProduct = () => (
  <div className="text-gray-800">
    <h3 className="text-2xl font-semibold mb-4">Hide Product</h3>
    <p>Options to hide/unhide products go here.</p>
  </div>
);

const EditProduct = () => (
  <div className="text-gray-800">
    <h3 className="text-2xl font-semibold mb-4">Edit Product</h3>
    <p>Form to edit an existing product goes here.</p>
  </div>
);

export default ProductActions;
