import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../../../assets/url';
import { BiCategory } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';



const CategoryCard = ({ cid, coverImage, title }) => {
  const navigate = useNavigate();

  return (
    <div
    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer min-w-[200px]" 
    onClick={() => navigate(`/businesscategoryLists/${cid}`)}
  >
    <div className="relative w-full">
      <img
        src={`${url}Tools/${coverImage}`}
        // alt={name}
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-15 text-white hover:font-extrabold" />
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center lg:text-2xl text-xl">
        <h3 className="  font-bold uppercase text-white">
          {" "}
          {title}
        </h3>
        <div
          className="text-white"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronRight className="text-xl" />
        </div>
      </div>
    </div>
  </div>
  );
};


export default function BusinessCategoryList() {
    const [category,setCategory]=useState([])
    async function getData() {
        const data= await axios.get("/api/v1/businessCategory/getHomepageCategory");
        console.log(data);
        setCategory(data.data?.data)
        
    }
    useEffect(()=>{
        getData()
    },[])
    return (
      <div className="w-full px-5 py-4 overflow-x-auto">
        <div className="hidden md:grid  lg:grid-cols-4 gap-2">
          {
            category.length > 0 && category.map((el) => (
              <CategoryCard
                key={el._id}
                cid={el._id}
                coverImage={el.coverImage}
                title={el.name}
                className="shadow-lg rounded-lg bg-white overflow-hidden"
              />
            ))
          }
          
        </div>
        <div className="flex md:hidden overflow-x-auto space-x-4">
          
          {
            category.length > 0 && category.map((el) => (
              <CategoryCard
                key={el._id}
                cid={el._id}
                coverImage={el.coverImage}
                title={el.name}
              
              />
            ))
          }
          {
            category.length > 0 && category.map((el) => (
              <CategoryCard
                key={el._id}
                cid={el._id}
                coverImage={el.coverImage}
                title={el.name}
               
              />
            ))
          }
        </div>
      </div>
    );
    
    
  
}
