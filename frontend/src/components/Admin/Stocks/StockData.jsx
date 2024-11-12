import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../../common/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { error } from '../../../redux/slices/errorSlice';
import url from '../../../assets/url';

export default function StockData() {
    
  let [selectedValue, setSelectedValue] = useState("");
  let [businessCategory,setBusinessCategory]=useState([]);
 const dispatch=useDispatch()
  
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  async function getCategoryData() {
    try {
          
        const data=await axios.get(`/api/v1/businessCategory/getCategoryById/${selectedValue}?populate=products&populateField=name,stock,price,coverImage&populatPage=${page}`) 
        const newProducts = data?.data?.products;

        if (newProducts?.length === 0) setHasMore(false);
        else if (newProducts?.length > 0) {
          setProducts((prevProducts) => [...prevProducts, ...newProducts]);
          setPage((prevPage) => prevPage + 1);
        }
        if (newProducts?.length < 8) setHasMore(false);
      } catch (e) {
        dispatch(error({ message: "Failed to load products" }));
      }
  }
    async function getCategoryName() {
        try {
       
          const getBusinessCategory = await axios.get(
            `/api/v1/admin/getAllBusinessCategorysList`
          );
    
        
          
          setBusinessCategory([...getBusinessCategory.data.list])
          
        } catch (e) {
       
          
          return dispatch(
            error({
              message: "somwthing went wrong in fetching wherehouse details",
            })
          );
        }
      }
      useEffect(()=>{
        getCategoryName()
        // selectedValue &
      },[])
    
  return (
    <>
      <div className="flex justify-center space-x-3 items-center p-1">
          <label className="title font-bold text-lg">Select Business category </label>
          <select
            className="rounded-lg border-2 border-indigo-500 focus:ring-2 focus:ring-purple-600 p-2"
            onChange={(e) => setSelectedValue(e.target.value) }
          >
            <option value="">Select</option>
            {
              businessCategory.length > 0 && businessCategory.map((el,i)=>{

                return <option value={el._id}>{el.name}</option>
              })
            }
            </select>
        </div>
    {selectedValue &&
         <InfiniteScroll
         dataLength={products.length}
         next={getCategoryData}
         hasMore={hasMore}
         loader={<LoadingSpinner small={true} />}
         endMessage={
           <div className="text-center text-2xl font-bold mt-20">
             You have seen all products
           </div>
         }
       >
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3  min-h-96 mt-10">
           {products.map((product) => (
             <div key={product._id} className="flex flex-col text-center">
               <div>
                 <img
                   src={`${url}img/${product.coverImage}`}
                   alt=""
                   className="h-28 w-20 mx-auto"
                 />
               </div>
               <div className="py-2">{product.name}</div>
               <div className="mb-4">
                 <h2 className="font-semibold mb-2">Stock : {product.stock}</h2>
                 
               </div>
               <button
                //  onClick={() => handleOpenDialog(product)}
                 className="px-4 py-2 bg-indigo-600 text-white rounded"
               >
                 Refill/Hide
               </button>
             </div>
           ))}
         </div>
       </InfiniteScroll>
    }
    
    </>
  )
}
