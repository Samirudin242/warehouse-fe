import CarouselTemplate from "@/components/carousel/CarouselTemplate";
import Navbar from "@/components/navbar/Navbar";
import ListProduct from "@/components/products/ListProduct";

export default function Home() {
  return (
    <div>
      <Navbar />
      <CarouselTemplate />
      <ListProduct />
    </div>
  );
}
