import HeroSlider from "../components/Home/HeroSlider";
import CategorySection from "../components/Home/CategoriesSection";
import ShopBySpace from "../components/home/ShopBySpace";
import NurseryStory from "../components/Home/NurseryStory";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import SeasonalCollection from "../components/Home/SeasonalCollection";
// import Testimonials from "../components/home/Testimonials";
import PlantCareTips from "../components/Home/PlantCareTips";
import Newsletter from "../components/Home/Newsletter";

function Home() {
  return (
    <>
      <HeroSlider />
      <CategorySection />
      <ShopBySpace />
      <NurseryStory />
      <FeaturedProducts />
      <WhyChooseUs />
      <SeasonalCollection />
      {/* <Testimonials /> */}
      <PlantCareTips />
      <Newsletter />
    </>
  );
}

export default Home;
