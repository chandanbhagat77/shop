import React, { useEffect, useState } from 'react'
import ProductListing from './ProductListing';
import axios from 'axios';

export default function EverythingBox() {
    const [businessCategory,setBusinessCategory]=useState([])
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
    return <div key={el._id}>
        <div className="py-2">{el.name}</div>
        {console.log(el)
        }
        <ProductListing productId={el._id}/>
    </div>
   })}
   
   
   </>
  )
}
