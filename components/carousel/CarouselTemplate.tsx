"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Spin } from "antd";
import Carousel1 from "./Carousel1";
import "antd/dist/reset.css";
import ListBrand from "../listBrand/ListBrand";
import Carousel2 from "./Carousel2";
import Carousel3 from "./Carousel3";

const CarouselTemplate: React.FC = () => {
  const [isCarouselReady, setIsCarouselReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCarouselReady(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {isCarouselReady ? (
        <Carousel
          afterChange={(currentSlide) => console.log(currentSlide)}
          autoplay
          autoplaySpeed={3000}
        >
          <div style={{ height: "160px", backgroundColor: "#364d79" }}>
            <Carousel1 />
          </div>
          <div style={{ height: "160px", backgroundColor: "#364d79" }}>
            <Carousel2 />
          </div>
          <div style={{ height: "160px", backgroundColor: "#364d79" }}>
            <Carousel3 />
          </div>
        </Carousel>
      ) : (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      )}
      <ListBrand />
    </div>
  );
};

export default CarouselTemplate;
