import axios from "axios";
import React, { useEffect, useState } from "react";
import BarGraph from "../Bar/BargraphforViewProduct";
import ChartData from "../Bar/ChartData";

const VerticalCardList = ({ data }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 ">
      {data?.length > 0 &&
        data.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <span className="text-lg font-semibold truncate">{item.name}</span>
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
              {item.viewCount} views
            </span>
          </div>
        ))}
    </div>
  );
};

export default function ProductData() {
  const [productData, setProductData] = useState([]);
  
  let [selectedValue, setSelectedValue] = useState("");
  let [businessCategory,setBusinessCategory]=useState([])
  async function getCategoryName() {
    try {
   
      const getBusinessCategory = await axios.get(
        `/api/v1/admin/getAllBusinessCategorysList`
      );

    
      
      setBusinessCategory([...getBusinessCategory.data.list])
      setSelectedValue(`${getBusinessCategory.data.list[0]._id}`)
      // setTools({ sliders : tools.sliders,category : getBusinessCategory.data.list });
      // setStore(wd);
    } catch (e) { 
      
      return dispatch(
        error({
          message: "somwthing went wrong in fetching wherehouse details",
        })
      );
    }
  }
  async function getData() {
    try {
      const res = await axios.get(
        `/api/v1/businessCategory/getAnlytics/${selectedValue}`
      ); 
      
      setProductData([...res?.data?.data]);
    } catch (e) {}
  }

  useEffect(() => {
    getCategoryName()
    
  }, []);

  useEffect(() => {
    selectedValue && getData();
    
  }, [selectedValue]);

  return (
    <>
      <p className=" text-2xl font-bold ">Top View Products</p>
      <div className="flex justify-center space-x-3 items-center p-1">
          <label className="title font-bold text-lg">Select Business category </label>
          <select
            className="rounded-lg border-2 border-indigo-500 focus:ring-2 focus:ring-purple-600 p-2"
            onChange={(e) => setSelectedValue(e.target.value) }
            value={selectedValue}
          >
            <option value="">Select</option>
            {
              businessCategory.length > 0 && businessCategory.map((el,i)=>{

                return <option value={el._id}>{el.name}</option>
              })
            }
            </select>
        </div>
      <div className=" min-h-screen  ">
        <div className=" ">
          <VerticalCardList data={productData} />

          <ChartData data={productData} />
        </div>

        <BarGraph data={productData} />
      </div>
    </>
  );
}
