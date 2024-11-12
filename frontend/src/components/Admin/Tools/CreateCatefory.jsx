import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload, FiType, FiAlignLeft, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { error, success, warning } from "../../../redux/slices/errorSlice";

const CreateCategory = () => {
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const [label, setLabel] = useState(""); 
  const [shortDescription, setShortDescription] = useState("");
  
  let [businessCategory,setBusinessCategory]=useState([])
  const [selectedValue, setSelectedValue] = useState(""); 
  const [selectedValue1, setSelectedValue1] = useState(""); 
  const [image, setImage] = useState([]);

  

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!image || !label || !shortDescription) {
        
        dispatch(warning({ message:"please fill all the fields"}));
        return 
      }
      if (selectedValue == "CATEGORY" && !selectedValue1) {
        dispatch(warning({ message:"please fill all the fields"}));
        return 
      }

      const fd = new FormData();
      fd.append("coverImage", image);
      fd.append("name",  selectedValue);
      fd.append("label", label);
      fd.append("shortDescription", shortDescription); 
      fd.append("businessCategory", selectedValue1 || ""); 
      
      const data = await axios.post("/api/v1/admin/createCategory", fd);

      dispatch(success({ message: data.data.msg || "something went wrong" }));
    } catch (e) { 
      
      dispatch(
        error({
          message:
            e?.response?.data?.msg ||
            e?.response?.data?.message ||
            "something went wrong",
        })
      );
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  async function getAllCategory(){
    const getBusinessCategory = await axios.get(
      "/api/v1/admin/getAllBusinessCategorysList"
    );

     
    
    setBusinessCategory([...getBusinessCategory.data.list])
  }

  useEffect(()=>{
    getAllCategory()
  },[])

  return (
    <div className="max-w-2xl mx-auto py-20  px-10  bg-white rounded-2xl shadow-2xl">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-900">Web Ui Data Form</h2>
        <p className="text-sm text-gray-500">
          Create Slider and Sub-Category for your site
        </p>
      </div>

      <div className="space-y-8">
        {/* Choose a category */}
        <div>
          <label
            htmlFor="categories"
            className="block  text-gray-800"
          >
            Choose a category 
            <span className="text-red-400 font-bold"><sup>*</sup></span>
          </label>
          <select
            id="categories"
            value={selectedValue}
            onChange={handleChange}
            className="mt-2 block w-full pl-3 pr-10 py-2 text-base  border-black border-1 border focus:ring-indigo-600 focus:border-indigo-600 rounded-lg"
          >
            <option value="">Select an option</option>
            <option value="SLIDER">SLIDER</option>
            <option value="CATEGORY">CATEGORY</option> 
          </select>
        </div>

         
 
          <div>
            <label className="block font-medium text-gray-800 mb-2">
              Cover Image
              <span className="text-red-400 font-bold"><sup>*</sup></span>
            </label>
            <div className="mt-1 flex justify-center items-center px-6 py-5 border-2 border-dashed rounded-lg transition-all duration-150 hover:border-indigo-600">
              <div className="text-center">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="h-64 w-64 object-cover rounded-lg mx-auto"
                  />
                ) : (
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600 mt-2">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
       

        {/* Label */}
        <div>
          <label
            htmlFor="label"
            className="block font-medium text-gray-800 mb-2"
          >
            Label / Title
            <span className="text-red-400 font-bold"><sup>*</sup></span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiType className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="label"
              className="focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-10 py-2 sm:text-base border-gray-300 rounded-lg"
              placeholder="Enter label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
        </div>

        {/* Gender (Radio Button) */}
        {
       selectedValue == "CATEGORY" && 
       <>
         <div>
         <label className="title ">Select Business category </label>
         <span className="text-red-400 font-bold"><sup>*</sup></span>
         </div>
           <select
          className="rounded-lg border-2 border-indigo-500 focus:ring-2 focus:ring-purple-600 p-2 w-full"
          onChange={(e) => setSelectedValue1(e.target.value)}
        >
          <option value="" >Select</option>
          {
            businessCategory.length > 0 && businessCategory.map((el,i)=>{

              return <option value={el._id} >{el.name}</option>
            })
          }
          </select>
       </>
        }
     

        {/* Short Description */}
        <div>
          <label
            htmlFor="short-description"
            className="block  font-medium text-gray-800 mb-2"
          >
            Short Description  <span className="text-red-400 font-bold"><sup>*</sup></span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiAlignLeft className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="short-description"
              rows="4"
              className="focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-10 py-2 sm:text-base border-gray-300 rounded-lg"
              placeholder="Enter short description"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-5">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
