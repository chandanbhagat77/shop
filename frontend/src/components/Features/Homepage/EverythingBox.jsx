import React, { useEffect, useState } from 'react';
import ProductListing from './ProductListing';
import axios from 'axios';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function EverythingBox() {
  const [businessCategory, setBusinessCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBusinessList() {
      try {
        setIsLoading(true);
        const getBusinessCategory = await axios.get(
          "/api/v1/admin/getAllBusinessCategorysList"
        );
        setBusinessCategory([...getBusinessCategory.data.list]);
        console.log(getBusinessCategory.data.list);
      } catch (e) {
        console.log(e);
        return dispatch(
          error({
            message: "Something went wrong in fetching business categories",
          })
        );
      } finally {
        setIsLoading(false);
      }
    }
    getBusinessList();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-1 lg:px-2 py-8 bg-gray-50">
      {businessCategory.length > 0 && businessCategory.map((el) => (
        <div key={el._id} className="mb-12 transform transition-all duration-300 hover:translate-y-[-4px]">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center lg:px-10 py-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                  {el.name}
                </h2>
                <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                  Featured
                </span>
              </div>
              
              <button
                onClick={() => navigate(`/businesscategoryLists/${el._id}`)}
                className="group flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-full 
                          transition-all duration-300 ring-1 ring-gray-200 
                          hover:bg-black hover:text-white hover:ring-black"
              >
                <span>Explore All</span>
                <FaArrowTrendUp className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            <div className="p-1">
              <ProductListing productId={el._id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}