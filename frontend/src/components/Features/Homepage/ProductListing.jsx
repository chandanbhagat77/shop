import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowTrendUp } from "react-icons/fa6";
import ProductCard from "../Common/Cards/ProductCard";

const ProductListing = ({ productId }) => {
  const navigate = useNavigate();
  const { gender } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `/api/v1/product/getAllTrendingProducts/${productId}?populate=products&populateField=name,price,_id,coverImage&populateLimit=6&populatPage=${page}`
        );
        if (res.data.products === 0) {
          setPage(1);
          return;
        }
        setProducts(res?.data?.products);
        setId(res?.data?.id);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [page]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="py-2 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-1 lg:px-6">
        {/* Add padding for better spacing on small screens */}
        <div className="relative mt-1">
          <AnimatePresence mode="wait">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-2"
            >
              {/* Ensure grid is responsive */}
              {products?.length > 0 &&
                products.map((product) => (
                  <motion.div key={product._id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center"
          >
            <IoIosArrowBack size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage(page + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center"
          >
            <GrFormNext size={20} />
          </motion.button>
        </div>
      </div>

    
    </motion.div>
  );
};

export default ProductListing;
