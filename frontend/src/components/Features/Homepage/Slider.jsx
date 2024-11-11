import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import url from "../../../assets/url";

const Slider = () => {
  const [slider, setSlider] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slider.length - 1 ? 0 : prevIndex + 1
    );
  }, [slider.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slider.length - 1 : prevIndex - 1
    );
  }, [slider.length]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `/api/v1/tools/getTool/SLIDER?page=1&limit=10&fields=coverImage,_id`
        );
        if (res.data.products.length > 0) {
          setSlider([...res.data.products]);
        }
      } catch (e) {
        console.error("Error fetching slider data:", e);
      }
    }
    getData();
  }, []);

  if (!slider?.length) return null;

  return (
    <div className="relative w-full h-[40vh] lg:h-[70vh] bg-gray-900 overflow-hidden mt-2 md:mt-5">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={`${url}Tools/${slider[currentIndex]?.coverImage}`}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={prevSlide}
          className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors duration-300"
        >
          <FaChevronLeft className="text-2xl text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors duration-300"
        >
          <FaChevronRight className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
