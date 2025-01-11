import CarouselTemplate from "@/components/carousel/CarouselTemplate";
import CategoriesStyle from "@/components/categoriesStyle/CategoriesStyle";
import Comments from "@/components/comments/Comments";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ListProduct from "@/components/products/ListProduct";

export default function Home() {
  return (
    <div>
      <CarouselTemplate />
      <ListProduct title="NEW ARRIVALS" />
      <ListProduct isHideBorder={true} title="TOP SELLING" />
      <CategoriesStyle />
      <Comments />
    </div>
  );
}
