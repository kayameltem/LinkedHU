import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComp = () => {
  return (

<Carousel variant="dark">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src ="./assets/images/ai-banner.png"
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="./assets/images/banner_erkut.png"
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="./assets/images/bilgisayar_social.png"
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>


  );
};

export default CarouselComp;
