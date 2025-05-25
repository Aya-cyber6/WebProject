import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCardCarousel = () => {
  return (
    <div className="container my-4" style={{ maxWidth: '600px' }}>
      <Carousel indicators={false} interval={null}>
        {[...Array(3)].map((_, i) => (
          <Carousel.Item key={i} interval={null}>
            <img
              src={`https://picsum.photos/600/200?random=${i}`}
              className="d-block w-100 rounded"
              alt={`Slide ${i + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCardCarousel;
