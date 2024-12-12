import CarouselTemplate from "@/components/carousel/CarouselTemplate";
import CategoriesStyle from "@/components/categoriesStyle/CategoriesStyle";
import Navbar from "@/components/navbar/Navbar";
import ListProduct from "@/components/products/ListProduct";

export default function Home() {
  return (
    <div>
      <Navbar />
      <CarouselTemplate />
      <ListProduct title="NEW ARRIVALS" />
      <ListProduct isHideBorder={true} title="TOP SELLING" />
      <CategoriesStyle />
    </div>
  );
}
