import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { error } from "../../../redux/slices/errorSlice";
import LoadingSpinner from "../../common/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../Common/Cards/ProductCard";
import BulkListLayoutProduct from "./BulkListLayoutProduct";
import {  FaFilter } from "react-icons/fa6";
import { FaSortAmountDown } from "react-icons/fa";  

const BulkListLayoutCategory = ({ tool }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState({
    id: "",
    tab: ""
  });
  const [sortOption, setSortOption] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  // Keeping all the existing functions unchanged
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `/api/v1/businessCategory/getCategoryById/${params.tool}?page=${page}&limit=6&populate=products`
      );
     
      if (filters.length == 0) {
        const res2 = await axios.get(
          `/api/v1/businessCategory/getBusinessCategoryFilterList/${params.tool}`
        );
        
      const filterOptions = res2?.data?.data || [];
      
      setFilters(filterOptions);
      }

      const newProducts = res?.data?.products;

      if (newProducts?.length === 0) {
        setHasMore(false);
      } else if (newProducts?.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }

    } catch (e) {
      dispatch(error({ message: "Failed to load products" }));
    }
  };

  const handleLabelFilter = (label, id) => {
    setSelectedLabel({
      id: id,
      tab: label
    });
    setProducts([]);
    // setPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setProducts([]);
    // setPage(1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [page]);
  useEffect(()=>{
    async function getData(params) {
      try {
        const res2 = await axios.get(
          `/api/v1/businessCategory/getBusinessCategoryFilterList/${params.tool}`
        );
        
      const filterOptions = res2?.data?.data || [];
      
      setFilters(filterOptions);
      } catch (e) {
        
      }
      
    }
    getData()
  },[params.tool])

  return (
    <motion.div
      className="py-3 min-h-screen bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-2">
        {/* Header Section */}
        <div className="mb-2 space-y-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between  lg:px-16 px-3 lg:space-y-0 space-y-2 lg:py-5">
            {/* Filter Section */}
            <div className="space-y-4 ">
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">Filter by Label</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <button
                    key={filter._id.originalId}
                    onClick={() => handleLabelFilter(filter._id.label, filter._id.originalId)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      ${selectedLabel.tab === filter._id.label
                        ? 'bg-gray-600 text-white shadow-lg shadow-gray-200 transform scale-105'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span>{filter._id.label}</span>
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-opacity-20
                      ${selectedLabel.tab === filter._id.label ? 'bg-white text-white' : 'bg-gray-100 text-gray-600'}">
                      {filter.productCount}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Section */}
            <div className="relative">
              <div className="flex items-center space-x-2 mb-2">
                <FaSortAmountDown className="text-gray-600" />
                <label className="text-xl font-bold text-gray-900">Sort by</label>
              </div>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full md:w-64 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm 
                          text-gray-700 appearance-none hover:border-gray-300 focus:outline-none 
                          focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select sorting option</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="priceLowToHigh">Price: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
          {selectedLabel.id ? (
            <BulkListLayoutProduct key={selectedLabel.id} toolId={selectedLabel.id} />
          ) : (
            <InfiniteScroll
              dataLength={products.length}
              next={fetchProducts}
              hasMore={hasMore}
              loader={<LoadingSpinner small={true} />}
              endMessage={
                <div className="text-center py-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    You've seen all products
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/categoryLists/POSETER")}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 
                              text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl 
                              transition-all duration-300 group"
                  >
                    Explore more
                    {/* <FaArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /> */}
                  </motion.button>
                </div>
              }
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                {products.length > 0 &&
                  products.map((card) => (
                    <ProductCard key={card._id} product={card} />
                  ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BulkListLayoutCategory;