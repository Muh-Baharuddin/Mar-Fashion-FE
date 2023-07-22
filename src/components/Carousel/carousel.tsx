import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="carousel-1.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Mar Fashion</h3>
          <p>It will fit for you.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="carousel-2.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Mar Fashion</h3>
          <p>It will fit for you.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="carousel-3.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Mar Fashion</h3>
          <p>It will fit for you.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;