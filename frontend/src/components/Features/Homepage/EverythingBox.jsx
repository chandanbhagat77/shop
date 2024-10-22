import React, { useEffect, useState } from 'react'
import ProductListing from './ProductListing';
import axios from 'axios';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function EverythingBox() {
    const [businessCategory,setBusinessCategory]=useState([]);
    const neviagate=useNavigate()
    useEffect(() => {
        async function getBusinessList() {
          try {
            // const wherhouseDetails = await axios.get(
            //   "/api/v1/ship/getAllWarehouseDetails"
            // );
            const getBusinessCategory = await axios.get(
              "/api/v1/admin/getAllBusinessCategorysList"
            );
    
            // let wd = wherhouseDetails.data.warehouse.map((el) => {
            //   let obj = { name: el.warehouse_name, id: el.location_id };
            //   return obj;
            // });
            console.log(getBusinessCategory);
            
            setBusinessCategory([...getBusinessCategory.data.list])
            console.log(getBusinessCategory.data.list);
            
            // setStore(wd);
          } catch (e) {
            console.log(e);
            
            return dispatch(
              error({
                message: "somwthing went wrong in fetching wherehouse details",
              })
            );
          }
        }
        getBusinessList();
      }, []);
  return (
   <>
   {businessCategory.length > 0 && businessCategory.map((el)=>{
    return <div key={el._id} className=' my-10  '>
      <div className="flex justify-between items-center bg-white  lg:px-10  border-gray-300 border-b-2 ">
      <h2 className="text-2xl tracking-tight  animate-fadeIn my-5 p-3 font-bold">
       {el.name}
          </h2> 
          <button
          
          className=" py-3 px-5 bg-white text-gray-700 ring-1 ring-gray-200 font-bold hover:scale-105 rounded-full flex space-x-1 hover:bg-black hover:text-white"
          onClick={() => neviagate(`/businesscategoryLists/${el._id}`)}
        >
          Explore All
          {/* <FaArrowTrendUp className="ml-3" size={24} /> */}
        </button>
      </div>
        
      <div className=''>
      <ProductListing productId={el._id}/>
      </div>
    </div>
   })}
   
   
   </>
  )
}
