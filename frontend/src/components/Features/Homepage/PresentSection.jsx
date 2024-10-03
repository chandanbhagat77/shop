import axios from "axios";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategorySelector from "./PresentSub";
import { useSelector } from "react-redux";
import { GrFormNext } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import ProductCard from "../Common/Cards/ProductCard";

const PresentSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const { gender } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/CATEGORY?gender=${gender}&limit=8&fields=label,_id`
        );

        const data = res.data;
        setCategory([...data.products]);
        setSelectedCategory(data.products[0]._id);
        fetchProducts(data.products[0]._id);
      } catch (e) {
        console.error(e);
      }
    }
    fetchCategories();
  }, [gender]);

  const fetchProducts = async (categoryId) => {
    try {
      const response = await axios.get(
        `/api/v1/tools/getToolById/${categoryId}?populate=products&populateField=name,price,_id,coverImage&populateLimit=4&populatPage=${page}`
      );
      if (response.data.products.length === 0) {
        setPage(1);
      }
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setPage(1);
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  useEffect(() => {
    // fetchProducts(category);
    console.log(selectedCategory);

    // fetchProducts(selectedCategory);
  }, [page]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center py-10 px-4 bg-gray-100">
      {/* Section Title */}

      <motion.h2
        className="text-4xl lg:text-6xl font-bold text-gray-800 mb-12 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Just Have A Look
        <span className="block md:inline-block bg-black text-white px-3 py-1 rounded-md"></span>
      </motion.h2>
      <CategorySelector
        categories={category}
        selectedCategory={selectedCategory}
        category={category}
        handleCategoryClick={handleCategoryClick}
      />

      {/* Category Selector */}
      <div className="flex justify-center space-x-3 mb-10 overflow-x-auto md:justify-start hidden lg:block">
        {category.map((cat) => (
          <motion.button
            key={cat._id}
            className={`px-4 py-2 rounded-md border ${
              cat._id === selectedCategory
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleCategoryClick(cat._id)}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="relative w-full">
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          className="absolute left-0 top-[50%] -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full shadow hover:bg-gray-400"
          disabled={page == 1}
        >
          <IoIosArrowBack className="text-2xl" />
        </button>

        <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          className="absolute right-0 top-[50%] -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full shadow hover:bg-gray-400"
        >
          <GrFormNext className="text-2xl" />
        </button>
      </div>

      {/* Explore More Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-12 px-6 py-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        onClick={() => navigate(`/productList/${selectedCategory}`)}
      >
        Explore More
      </motion.button>
    </div>
  );
};

export default PresentSection;
