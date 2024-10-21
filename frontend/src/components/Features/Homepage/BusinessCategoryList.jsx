import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../../../assets/url';
import { BiCategory } from 'react-icons/bi';



const CategoryCard = ({  coverImage, title }) => {
    // const navigate = useNavigate();
  
    return (
      <div className="flex flex-col items-center ">
        <div
          className="w-full  rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        //   onClick={() => navigate(`/productList/${id}`)}
        >
          <img
            src={`${url}Tools/${coverImage}`}
            alt={title}
            className=" h-32 w-32 object-cover  transition-transform duration-500 hover:scale-110"
          />
        </div>
        <h3 className=" font-semibold text-sm my-3   flex items-center">
            <BiCategory className="text-gray-600 mr-2" />
            {title}
          </h3>
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
  return (<div className='grid grid-cols-8 gap-x-2 px-10 py-3'>
    {
        category.length > 0 && category.map((el)=>{
            return  <CategoryCard coverImage={el.coverImage} title={el.name}/>
        })
    }
  </div>
  )
}
