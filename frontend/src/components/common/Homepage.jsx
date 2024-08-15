import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getHompageData } from "../../redux/slices/productSlice";
import { Slider } from "./Slider";
import ProductListing from "../ProductL";
import CategoryList from "./CategoryList";
import ProductSection3 from "../ProductSection3";
import ProductCardsOverview from "./ProductCardsOverview";
import MultipleListing from "./MultipleListing";

export default function Homepage() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  // first get the data
  async function getAllDetails() {
    let res = await dispatch(getHompageData());
    console.log(res);

    if (res?.payload?.status == "success") {
      setLoad(false);
    }
  }
  useEffect(() => {
    getAllDetails();

    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);
  return (
    <>
      {!load && (
        <>
          {" "}
          <Slider />
          <ProductListing />
          <CategoryList />
          <ProductCardsOverview />
          <MultipleListing />
          {/* <ProductInCrawsel /> */}
          <ProductSection3 />
          {/* <ProductSection4 /> */}
        </>
      )}
    </>
  );
}
