import React, { useEffect, useState } from "react";
import ProductSearch from "../Common/SearchProduct";
import axios from "axios";
import { FaMinus, FaPlus } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { error, message, success } from "../../../redux/slices/errorSlice";
import AddSimillar from "./AddSimillar";
import SimilarColorProducts from "../Common/SimilarColorProduct";
import DataTable from "./DataTable";
const EditProductForm = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState("");

  const [categoryName, setCategoryName] = useState([]);
 

  const [editedProduct, setEditedProduct] = useState({
    name: "",
  });

  const [similarProducts, setSimilarProducts] = useState([]);

  const sizeOptions = [
    { size: "XS", price: 0 },
    { size: "S", price: 0 },
    { size: "M", price: 0 },
    { size: "L", price: 0 },
    { size: "XL", price: 0 },
    { size: "XXL", price: 0 },
  ];

  const handleSizeChange = (size, price = 0) => {
    if (!price) {
      const newSizes = editedProduct.sizes.find(
        (item) => item.size === size.size
      )
        ? editedProduct.sizes.filter((item) => item.size !== size.size)
        : [...editedProduct.sizes, size];
      setEditedProduct({ ...editedProduct, sizes: newSizes });
    } else {
      const newproduct = editedProduct.sizes.map((el) => {
        if (el.size == size.size) {
          el.price = price;
        }
        return el;
      });

      setEditedProduct({ ...editedProduct, sizes: newproduct });
    }
  };

  const handleCategoryChanges = (item) => {
    let category = editedProduct.category.includes(item)
      ? editedProduct.category.filter((el) => el != item)
      : [...editedProduct.category, item];
    setEditedProduct({ ...editedProduct, category: category });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...editedProduct[field]];
    newArray[index] = e.target.value;
    setEditedProduct((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (
        editedProduct?.colors?.simillarProducts?.length &&
        editedProduct?.colors?.simillarProducts?.length !==
          similarProducts?.length
      ) {
        let colors = {
          _id: editedProduct?.colors._id,
          simillarProducts: similarProducts,
        };

        res = await axios.patch(`/api/v1/admin/edit/${editedProduct._id}`, {
          ...editedProduct,
          colorUpdate: true,
          colors,
        });
      } else {
        res = await axios.patch(`/api/v1/admin/edit/${editedProduct._id}`, {
          ...editedProduct,
          colorUpdate: false,
        });
      }

      if (res?.data?.status == "success") {
        dispatch(success({ message: "product updated successfully" }));
      }

      // console.log(res);
      // if (res.data?.status == "success") {
      //   dispatch(success({ message: "product updated successfully" }));
      // }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.data?.msg ||
            "something went wrong please try again later ",
        })
      );
    }
  };

  async function bringProductInfo() {
    try {
      if (selectedProduct) {
        const res = await axios.get(
          `/api/v1/product/getProduct/${selectedProduct}`
        );
        const tool = await axios.get(
          `/api/v1/admin/getAllMyTools/${res.data?.product?.gender}`
        );
        setCategoryName(tool.data.allToolsdata);

        setEditedProduct({
          ...res?.data?.product,
          category: res?.data?.product?.category.map((el) => el._id),
        });
        res?.data?.product?.colors?.simillarProducts?.length > 0 &&
          setSimilarProducts([...res?.data?.product?.colors?.simillarProducts]);
      }
    } catch (e) {
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  }

  const addArrayItem = (field) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    bringProductInfo();
  }, [selectedProduct]);
  useEffect(() => {
 
  });

  return (
    <div className="mb-60">
      <div className="mb-20">
        
        <ProductSearch setSelectedProduct={setSelectedProduct} />
      </div>
      {editedProduct?.name && (
        <>
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto px-2 py-10 space-y-8 rounded-3xl shadow-2xl bg-white border border-gray-200"
          >
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
                Edit Product
              </h2>
              <p className="text-2xl text-blue-500 font-bold">
                {editedProduct.name}
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Name */}
              <div>
                <label className=" block text-lg font-bold text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out"
                />
              </div>
              <div>
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleChange}
                    className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="col-span-1 md:col-span-2">
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Short Description
                </label>
                <textarea
                  name="shortDescription"
                  value={editedProduct.shortDescription}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>

              {/* Long Description */}
              <div className="col-span-1 md:col-span-2">
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Long Description
                </label>
                <textarea
                  name="longDescription"
                  value={editedProduct.longDescription}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>

              <div className="col-span-1 md:col-span-2 ">
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Category
                </label>
                <div className="flex flex-col space-y-1 justify-center mx-auto ">
                  {categoryName.map((category) => (
                    <div className="flex  items-center" key={category._id}>
                      <input
                        type="checkbox"
                        checked={editedProduct?.category?.includes(
                          category._id
                        )}
                        key={category._id}
                        value={category.label}
                        onChange={() => handleCategoryChanges(category._id)}
                      />
                      
                      {category.label}
                      <span className="ml-3 font-bold">({category.name})</span>
                    </div>
                  ))}

                  {/* <DataTable
                    data={categoryName}
                    additon={handleCategoryChanges}
                    edit={true}
                    incategory={editedProduct.category}
                  /> */}
                </div>
              </div>

              {/* Colors */}
              <div className="col-span-1 md:col-span-2">
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Colors
                </label>
                <div className="container mx-auto lg:p-8">
                  {editedProduct?.colors ? (
                    <SimilarColorProducts
                      similarProducts={similarProducts}
                      setSimilarProducts={setSimilarProducts}
                    />
                  ) : (
                    "first combine and add the products from below section "
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="col-span-1 md:col-span-2">
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Features
                </label>
                {editedProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayChange(e, index, "features")}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("features", index)}
                      className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <FaMinus />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("features")}
                  className="mt-2 flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2" /> Add Feature
                </button>
              </div>

              {/* Material */}
              <div>
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={editedProduct.material.join(", ")}
                  onChange={(e) =>
                    setEditedProduct((prev) => ({
                      ...prev,
                      material: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>

              {/* Sizes */}
              <div>
                <label className=" block text-sm font-bold text-gray-700">
                  Sizes and Prices
                </label>
                <div className="mt-2 space-y-2">
                  {sizeOptions.map((size, i) => (
                    <div
                      key={size.size}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={editedProduct.sizes.find(
                          (item) => item.size === size.size
                        )}
                        onChange={() => handleSizeChange(size)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                      />
                      <span className="text-gray-700">{size.size}</span>

                      {editedProduct.sizes.find(
                        (item) => item.size == size.size
                      ) && (
                        <input
                          type="number"
                          placeholder={`Piceswe have ${size.size}`}
                          value={(function getPriceBySize(size) {
                            const item = editedProduct.sizes.find(
                              (item) => item.size === size
                            );
                            return item ? item.price : 0;
                          })(size.size)}
                          className="mt-1 block w-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={(e) =>
                            handleSizeChange(size, e.target.value)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={editedProduct.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                >
                  <option value="in stock">In Stock</option>
                  <option value="out of stock">Out of Stock</option>
                </select>
              </div>

              {/* Care Instructions */}
              <div className="col-span-1 md:col-span-2">
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Care Instructions
                </label>
                <textarea
                  name="careInstructions"
                  value={editedProduct.careInstructions}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>

              {/* Return Details */}
              <div className="col-span-1 md:col-span-2">
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Return Details
                </label>
                <textarea
                  name="returnDetails"
                  value={editedProduct.returnDetails}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>

              {/* Shipping Details */}
              <div className="col-span-1 md:col-span-2">
                <label className="  block text-xl font-bold text-gray-900 mb-1">
                  Shipping Details
                </label>
                <textarea
                  name="shippingDetails"
                  value={editedProduct.shippingDetails}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </form>
        </>
      )}
      <div className=" mx-2 my-3 font-bold text-2xl ">Add Same Color's</div>

      <AddSimillar />
    </div>
  );
};

export default EditProductForm;
