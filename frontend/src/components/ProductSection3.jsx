import { FaShoppingBag, FaRegHeart, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import url from "../assets/url";

const LuxuryProductShowcase = () => {
  const { posters } = useSelector((state) => state.product);

  return (
    <motion.section
      className=" bg-white  py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-gray-500 mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Thinking Will Be
          <span className="block md:inline-block bg-black text-white p-1 md:p-2">
            Present Hear
          </span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {posters?.length > 0 &&
            posters.map((product, index) => (
              <LuxuryProductCard
                key={product._id}
                product={product}
                index={index}
              />
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const LuxuryProductCard = ({ product, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="group relative bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/toolsDetails/${product._id}`)}
      >
        <motion.div
          className="overflow-hidden aspect-w-3 aspect-h-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}Tools/${product.coverImage}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>

        {/* Overlay with product details */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="text-lg font-bold">{product.label}</h3>
            <div className="flex items-center mt-2">
              <FaStar className="text-yellow-400 mr-1" />
              <FaStar className="text-yellow-400 mr-1" />
              <FaStar className="text-yellow-400 mr-1" />
              <FaStar className="text-yellow-400 mr-1" />
              <FaStar className="text-gray-400 mr-1" />
              <span className="ml-2">4.0</span>
            </div>
            <p className="mt-2">Starting from ₹{product.price}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <FaShoppingBag className="text-gray-800" />
        </button>
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <FaRegHeart className="text-red-500" />
        </button>
      </div>

      {/* Product name and price */}
      <div className="py-4 px-6 text-center">
        <h3 className="font-semibold text-gray-800 text-lg">{product.label}</h3>
      </div>
    </motion.div>
  );
};

export default LuxuryProductShowcase;
