import axios from "axios";
import React, { useState } from "react";
import { FiUpload, FiType, FiAlignLeft, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { error, success } from "../../../redux/slices/errorSlice";

 


const CreateBusinessCategory = () => {
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const [label, setLabel] = useState("");  

  const [image, setImage] = useState("");
  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("coverImage", image); 
      fd.append("name", label); 
      
      const data = await axios.post("/api/v1/admin/createBuisnessCategory", fd);

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

  

  return (
    <div className="max-w-2xl mx-auto mt-10 p-10 bg-white rounded-2xl shadow-2xl">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-900">Business Type Form</h2>
        
      </div>

      <div className="space-y-8">
        
 
     
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Cover Image
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
            className="block text-lg font-medium text-gray-800 mb-2"
          >
            Name
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

export default CreateBusinessCategory;
