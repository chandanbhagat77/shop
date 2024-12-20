import axios from "axios";
import { IoReorderFour } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { error, success } from "../../../redux/slices/errorSlice";
import FullScreenDialog from "../../common/FullScreenDialog";
import ToolProductAction from "./ToolProductAction";
import url from "../../../assets/url";
import ChangeOrder from "./ChangeOrder";
import { getAllCateogyNames } from "../../../redux/slices/productSlice";

export default function ManageTools() {
  const dispatch = useDispatch(); 
  const [tools, setTools] = useState({
    sliders: [],
    category: [], 
  });


  let [selectedValue, setSelectedValue] = useState("");
  let [businessCategory,setBusinessCategory]=useState([])
  async function getAllTools() {
    try {
      const res = await axios.get(`/api/v1/admin/getAllMyTools?name=SLIDER`);
      const data = res.data.allToolsdata;
      let sliders = [],
        category = [];

      data.forEach((el) => {
        if (el.name === "SLIDER") sliders.push(el); 
        // else custom.push(el);
      });

      setTools({ sliders,category });
    } catch (e) { 
      
      dispatch(
        error({ message: e?.response?.data?.msg || "Something went wrong" })
      );
    }
  }

  async function getCategory() {
    const res = await axios.get(`/api/v1/admin/getAllMyTools?businessCategory=${selectedValue}`);
    setTools({ ...tools,category : res.data.allToolsdata });
  }

  useEffect(() => {
    getAllTools(); 
    getCategoryName()
  }, []);



  async function getCategoryName() {
    try {
   
      const getBusinessCategory = await axios.get(
        `/api/v1/admin/getAllBusinessCategorysList`
      );
 
      
      setBusinessCategory([...getBusinessCategory.data.list])
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


  useEffect(()=>{
    // setTools({ ...tools,category :[] });
 
   selectedValue &&  getCategory()
  },[selectedValue])

  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold text-center py-1 text-gray-800">
        Tool Management
      </h1>
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
      <ContentDisplay tools={tools} />
     
    </div>
  );
}

const ContentDisplay = ({ tools }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenChange, setIsDialogOpenChange] = useState(false);
  const [btn, setBtn] = useState("");

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const openDialogChange = () => setIsDialogOpenChange(true);
  const closeDialogChange = () => setIsDialogOpenChange(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {Object.entries(tools).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 uppercase text-gray-700">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <ContentCard
                key={item._id}
                item={item}
                openDialog={openDialog}
                openDialogChange={openDialogChange}
                setBtn={setBtn}
              />
            ))}
          </div>
        </div>
      ))}
      {isDialogOpen && (
        <FullScreenDialog isOpen={isDialogOpen} onClose={closeDialog}>
          <ToolProductAction docid={btn} />
        </FullScreenDialog>
      )}
      {isDialogOpenChange && (
        <FullScreenDialog
          isOpen={isDialogOpenChange}
          onClose={closeDialogChange}
        >
          <ChangeOrder docid={btn} onClose={closeDialogChange} />
        </FullScreenDialog>
      )}
    </div>
  );
};

const ContentCard = ({ item, openDialog, setBtn, openDialogChange }) => {
  const dispatch = useDispatch();

  async function deleteThisTool(toolid) {
    try {
      const res = await axios.delete(`/api/v1/admin/actionOnTool/${toolid}`);
      if (res.status === 204) {
        dispatch(success({ message: "Tool deleted successfully" }));
      }
    } catch (e) {
      dispatch(error({ message: "Please try again" }));
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden  hover:bg-gray-200">
      <div className="relative pb-72 overflow-hidden">
        <img
          className="absolute inset-0 h-96 object-cover transform hover:scale-110 transition-transform duration-300"
          src={`${url}tools/${item.coverImage}`}
          alt={item.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>
      <div className="p-3">
        <div className="text-xs uppercase tracking-wider font-semibold text-indigo-600">
          {item.name}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-800 leading-tight truncate">
          {item.label}
        </h3>

        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          <FiFileText className="mr-1 inline" />
          {item.shortDescription}
        </p>
        <div className="mt-4 flex flex-col justify-between space-y-2">
          <button
            className=" bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-all duration-300 w-full"
            onClick={() => {
              setBtn(item._id);
              openDialog();
            }}
          >
            <MdOutlinePublishedWithChanges className="mr-2" />
            Make Changes
          </button>
          <button
            className=" bg-green-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-green-700 transition-all duration-300 w-full"
            onClick={() => {
              setBtn(item._id);
              openDialogChange();
            }}
          >
            <IoReorderFour className="mr-2" />
            ChangeOrder
          </button>
          <button
            className=" bg-red-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-red-700 transition-all duration-300 w-full"
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to delete this tool?"
              );
              if (confirmed) deleteThisTool(item._id);
            }}
          >
            <MdDelete className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
