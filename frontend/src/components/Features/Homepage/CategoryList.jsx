import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import ThinkingCard from "../Common/Cards/ThinkingCard";

const CategoryList = () => {
  const navigate = useNavigate();
  const { gender } = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/CATEGORY?&page=${page}&limit=4&fields=name,label,coverImage,_id`
        );

        if (res.data.products === 0) {
          setPage(1);
          return;
        }
        setProduct([...res?.data?.products]);
      } catch (e) {
        return e.response;
      }
    }
    getData();
  }, [gender, page]);

  return (
    <div className="min-h-screen py-12 p-2 lg:px-4 bg-white flex flex-col justify-center items-center space-y-10 lg:space-y-16 pb-20">
     

      {/* Category Grid */}
      <div className="relative w-full max-w-screen-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-2">
          {product.length > 0 &&
            product.map((card, i) => <ThinkingCard product={card} key={i} />)}
        </div>
      </div>

      {/* View All Button */}
      <motion.div
        className="flex justify-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      >
        <motion.button
          whileHover={{
            scale: 1.1,
            backgroundColor: "#1a1a1a",
            boxShadow: "0px 0px 15px rgba(0,0,0,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full font-bold text-lg shadow-lg hover:bg-gray-700 transition-all duration-300 ease-in-out"
          onClick={() => navigate("/categoryLists/CATEGORY")}
        >
          View All Categories
          <FiArrowRight className="ml-3" size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CategoryList;
