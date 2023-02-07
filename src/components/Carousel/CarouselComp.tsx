import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselComp = () => {
	const [idx, setIdx] = React.useState(0);
	const handleSelect = (selectedIdx: number) => {
		setIdx(selectedIdx);
	};

	return ( 
		<Carousel activeIndex={idx} onSelect={handleSelect}>
			{[1,2,3].map((e, index) => {
				return (
					<Carousel.Item key={index}>
						<img src={'https://i.pinimg.com/originals/b6/c9/17/b6c9173bd58f62f49eb550635a5e259f.jpg'} alt="Carousel 3" className="d-block w-100" />
						<Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
				)
			})}
		</Carousel>
	);
}
 
export default CarouselComp;