import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import url from "../../../assets/url";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { error, success } from "../../../redux/slices/errorSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ p, onCancelOrder }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex flex-col p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
  >
    {/* Order Info */}
    <div className="flex flex-col items-center mb-4 border-b pb-2">
      <div className="text-gray-500 text-sm">
        Ordered On: {Date(p?.time) || "not updated"}
      </div>
      <div
        className={`text-sm font-semibold ${
          p?.orderStatus === "Delivered" ? "text-green-600" : "text-yellow-500"
        }`}
      >
        Status: {p?.orderStatus || "Not updated"}
      </div>
      <div className="text-sm text-gray-500">Type: {p?.type}</div>
    </div>

    {/* Product Details */}
    <div className="grid grid-cols-1 gap-4">
      {p.productData.map((el) => (
        <div className="flex items-center space-x-4" key={el._id}>
          <img
            src={`${url}img/${el.coverImage}`}
            alt={el.name}
            className="w-24 h-24 object-cover rounded-md shadow-md"
          />
          <div>
            <div className="font-semibold">{el.name}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Cancel Order Button */}
    {p?.orderStatus !== "Cancelled" && (
      <button
        onClick={() => onCancelOrder(p._id)}
        className="mt-4 py-2 px-4 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
      >
        <FaTrash className="mr-2" /> Cancel Order
      </button>
    )}
  </motion.div>
);

export default function ProductOrdredList() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  // Fetch Orders
  async function getData() {
    try {
      const res = await axios.get("/api/v1/user/getOrderProducts");
      if (res?.data?.status === "success") {
        setOrders(res.data.orders);
      }
    } catch (e) {
      dispatch(
        error({ message: e?.response?.data?.message || "Something went wrong" })
      );
    }
  }

  // Handle Cancel Order
  async function handleCancelOrder(orderId) {
    try {
      const res = await axios.post("/api/v1/ship/cancleOrderAndRefund", {
        orderId,
      });
      if (res?.data?.status === "success") {
        dispatch(success({ message: "Order cancled successfully" }));
        getData(); // Refresh orders after cancellation
      } else {
        dispatch(error({ message: "failed please try again" }));
      }
    } catch (e) { 

      dispatch(
        error({ message: e?.response?.data?.message || "Cancellation failed" })
      );
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((p) => (
            <ProductCard key={p._id} p={p} onCancelOrder={handleCancelOrder} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No orders found</div>
      )}
    </>
  );
}
