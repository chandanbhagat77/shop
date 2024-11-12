import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import url from "../../../../assets/url";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/slices/productSlice";
import { error, info, warning } from "../../../../redux/slices/errorSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { msg } = useSelector((state) => state.product);
  async function ATC(id) {
    try {
      const res = await dispatch(addToCart(id));
      if (addToCart.fulfilled.match(res)) {
        dispatch(info({ message: "Product added to cart" }));
      } else {
        dispatch(warning({ message: msg || "Failed to add" }));
      }
    } catch (e) {
  

      dispatch(
        error({
          message: e.message || "Product not added to cart, please try again",
        })
      );
    }
  }

  return (
    <motion.div
      key={product?._id}
      className="  font-semibold  shadow-lg  overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-lg "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          onClick={() => navigate(`/productDetails/${product?._id}`)}
          className="w-full overflow-hidden "
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={`${url}img/${product?.coverImage}`}
            alt={product?.name}  
            className=" object-cover  transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse h-[50vh] w-full"
          />
           <div className="p-2 text-center absolute bottom-0 bg-gradient-to-br from-transparent to-black w-full">
        <h3 className=" font-bold lg:font-semibold  text-white mb-2">
          {product?.name}
        </h3>
        <p className="text-2xl font-bold text-white">₹{product?.price}</p>
      </div>
        </motion.div>
        <div className="absolute bottom-2 right-1 flex space-x-2 ">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white rounded-full shadow-md transition-colors duration-200"
            onClick={() => ATC(product?._id)}
          >
            <FiShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
     
    </motion.div>
  );
};

export default ProductCard;
