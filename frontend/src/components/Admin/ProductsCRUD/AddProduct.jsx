import { useEffect, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllCateogyNames } from "../../../redux/slices/productSlice";
import ProductSearch from "./../Common/SearchProduct";
import DataTable from "./DataTable";
import { error, success } from "../../../redux/slices/errorSlice";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const { categoryName } = useSelector((state) => state.product);

  let [store, setStore] = useState([]);
  let [selectedValue, setSelectedValue] = useState("");

  let [businessCategory,setBusinessCategory]=useState([])
  const [product, setProduct] = useState({
    name: "",
    price: 1000,
    shortDescription: "",
    longDescription: "",
    sizes: [],
    material: "",
    images: [],
    coverImage: null,
    features: ["", "", "", "", ""],
    shippingDetails: "",
    returnDetails: "",
    category: [],
    colorCategory: "",
    careInstructions: "",
   
    stock: 20,
    dimension: [0, 0, 0],
    stockPlace: 0,
    weight: 0,
  });

   
  const colorCategoryOptions = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Yellow",
    "Purple",
    "Orange", 
    "Brown",
    "Gray",
  ];

  function handleClickSelectedProduct(id) {
    bringProductInfo(id);
  }
  function handleDimension(value, index) {
    let dim = [...product.dimension];
    dim[index] = value;
    setProduct({
      ...product,
      dimension: dim,
    });
  }

  async function bringProductInfo(id) {
    try {
      if (id) {
        const res = await axios.get(`/api/v1/product/getProduct/${id}`);

        const p = res?.data?.product;
        setProduct({
          name: p.name,
          price: 1000,
          shortDescription: p.shortDescription,
          longDescription: p.longDescription,
        
          material: p.material,
          images: [],
          coverImage: null,
          features: p.features,
          shippingDetails: p.shippingDetails,
          returnDetails: p.returnDetails,
          category: [],
          colorCategory: "",
          careInstructions: p.careInstructions,
        
          stock: 20,
          stockPlace: p.stockPlace,
          weight: p.weight,
          dimension: p.dimension,
        });
      }
    } catch (e) {
      dispatch(
        error({ message: e?.response?.data?.msg || "something went wrong" })
      );
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChanges = (item) => {
    let category = product.category.includes(item)
      ? product.category.filter((el) => el != item)
      : [...product.category, item];
    setProduct({ ...product, category: category });
  };
 

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...product.features];
    newFeatures[index] = value;
    setProduct({ ...product, features: newFeatures });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: [...product.images, ...files] });
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, coverImage: file });
  };

  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({ ...product, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      if (product?.name?.length < 5) {
        dispatch(
          error({ message: "Product name must be at least of 5 character" })
        );
        return;
      }

      for (const key in product) {
        if (key == "images") {
          product.images.map((el) => {
            fd.append("images", el);
          });
        } else if (key == "features") {
          product.features.map((el) => {
            fd.append("features", el);
          });
        }  else if (key == "category") {
          fd.append("category", JSON.stringify(product.category));
        } else {
          fd.append(`${key}`, product[key]);
        }
      }

      fd.append("businessCategoryId", selectedValue);
      const res = await axios.post("/api/v1/admin/create", fd);

      if (res.data.status == "success") {
        dispatch(success({ message: "product added successfully" }));
      } else {
        dispatch(error({ message: "something went wrong please try again" }));
      }
    } catch (e) {
      dispatch(
        error({
          message:
            e?.response?.data?.msg ||
            e?.response?.data?.message ||
            "something went wrong please try again",
        })
      );
    }
  };


  async function getCategory() {
    await dispatch(getAllCateogyNames(selectedValue));
  }
  useEffect(()=>{
    selectedValue && getCategory()
  },[selectedValue])

  useEffect(() => {
    async function getstockPlace() {
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
        
        setBusinessCategory([...getBusinessCategory.data.list])
        // setStore(wd);
      } catch (e) { 
        
        return dispatch(
          error({
            message: "somwthing went wrong in fetching wherehouse details",
          })
        );
      }
    }
    getstockPlace();
  }, []);

  return (
    <>
      <div className=" min-h-screen py-12 px-1 sm:px-1 lg:px-2 ">
        

        {/* Product Search Section */}
        <div className="mb-10">
          <div className="mx-auto text-start my-1 font-bold capitalize text-xl">
            Auto Fill Product
          </div>
          <ProductSearch setSelectedProduct={handleClickSelectedProduct} />
        </div>

        {/* Select Gender */}
        <div className="flex justify-start space-x-10 items-center p-2">
          <label className="title font-bold text-lg">
            <div>Select Business category</div>
             </label>
         <div>
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
        </div>

    {   selectedValue &&  <form onSubmit={handleSubmit} className="py-8 p-1 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 gap-1 lg:gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Track pant"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Short Description
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={product.shortDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=" Comfortable, stylish, and perfect for any workout or casual day out."
              required
            />
          </div>

          <div>
            <label
              htmlFor="longDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Long Description
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              rows="4"
              value={product.longDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Elevate your athleisure wardrobe with our Classic Black Track Pants. Designed for both comfort and style, these pants are crafted from a soft, breathable fabric that moves with you. The elastic waistband ensures a secure fit,"
              required
            ></textarea>
          </div>

         

          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700"
            >
              Material
            </label>
            <input
              type="text"
              id="material"
              name="material"
              value={product.material}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Polyester,Nylon,Fleece etc"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="images"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload images</span>
                    <input
                      id="images"
                      name="images"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="coverImage"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload cover image</span>
                    <input
                      id="coverImage"
                      name="coverImage"
                      type="file"
                      className="sr-only"
                      onChange={handleCoverImageUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {product.coverImage && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(product.coverImage)}
                  alt="Cover"
                  className="h-64 w-full object-contain rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            {product.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="shippingDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Shipping Details
              </label>
              <textarea
                id="shippingDetails"
                name="shippingDetails"
                rows="3"
                value={product.shippingDetails}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Rs 50.99, delivery in 5-7 business days"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="returnDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Return Details
              </label>
              <textarea
                id="returnDetails"
                name="returnDetails"
                rows="3"
                value={product.returnDetails}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="7-Day Return Policy etc.. "
              ></textarea>
            </div>
          </div>

          <div className="my-5">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
              placeholder="Pant , Track pant , jeans .. etc"
            >
              Add Into Category
            </label>
            <DataTable data={categoryName} additon={handleCategoryChanges} />
          </div>
          <div>
            <label
              htmlFor="colorCategory"
              className="block text-sm font-medium text-gray-700"
            >
              Color Category
            </label>
            <select
              id="colorCategory"
              name="colorCategory"
              value={product.colorCategory}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a color category</option>
              {colorCategoryOptions.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="careInstructions"
              className="block text-sm font-medium text-gray-700"
            >
              Care Instructions
            </label>
            <textarea
              id="careInstructions"
              name="careInstructions"
              rows="3"
              value={product.careInstructions}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Dimension (in cm)
              </label>
              <div className="flex space-x-1">
                <input
                  type="text"
                  id="Dimension"
                  name="Dimension"
                  placeholder="Length"
                  value={product?.dimension[0] || ""}
                  onChange={(e) => handleDimension(e.target.value * 1, 0)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="text"
                  id="Dimension"
                  name="Dimension"
                  placeholder="breadth"
                  value={product?.dimension[1] || ""}
                  onChange={(e) => handleDimension(e.target.value * 1, 1)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="text"
                  id="Dimension"
                  name="Dimension"
                  placeholder="Height"
                  value={product?.dimension[2] || ""}
                  onChange={(e) => handleDimension(e.target.value * 1, 2)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock Warehouse
              </label>
              <select
                name="stockPlace"
                id="stockPlace"
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">select</option>
                {store.map((el) => {
                  return (
                    <option value={el.id} key={el.id}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Weight (in kg)
              </label>
              <input
                type="text"
                name="weight"
                onChange={handleInputChange}
                value={product.weight || ""}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.5 Kg"
              />
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Product
              </button>
            </div>
          </div>
        </form>}
      </div>
    </>
  );
};

export default CreateProductForm;
