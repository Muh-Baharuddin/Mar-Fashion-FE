import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselComp = () => {
	const [idx, setIdx] = React.useState(0);
	const handleSelect = (selectedIdx: number) => {
		setIdx(selectedIdx);
	};

	const imgs = [
		'https://i.pinimg.com/originals/b6/c9/17/b6c9173bd58f62f49eb550635a5e259f.jpg',
		'https://marketing.co.id/wp-content/uploads/2021/03/ulikids-1.jpg',
		'https://lomboktoday.co.id/wp-content/uploads/2022/03/3.jpg'
	]

	return ( 
		<Carousel activeIndex={idx} onSelect={handleSelect}>
			{imgs.map((e, index) => {
				return (
					<Carousel.Item key={index}>
						<img src={e} alt="Carousel 3" className="d-block w-100" />
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