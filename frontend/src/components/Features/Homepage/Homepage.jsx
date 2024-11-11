import ProductListing from "./ProductListing";
import CategoryList from "./CategoryList";
import ThinkingSection from "./ThinkingSection";
import PresentSection from "./PresentSection";
import Slider from "./Slider";
import Banner from "./Banner";
import Offer from "./Offer";
import BusinessCategoryList from "./BusinessCategoryList";
import EverythingBox from "./EverythingBox";

export default function Homepage() {
  return (
    <div className="bg-white">
      
      {/* <PresentSection /> */}
      {/* <ThinkingSection />
      <Banner /> */}
      {/* <BusinessCategoryList/> */}
      <Slider/>
      <EverythingBox/>
    </div>
  );
}
