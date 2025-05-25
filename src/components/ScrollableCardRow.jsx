import React, { useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

const ScrollableCardRow = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 300; // px
      scrollRef.current.scrollLeft += direction === 'left' ? -amount : amount;
    }
  };

  return (
    <div className="position-relative">
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="d-flex overflow-auto px-5"
        style={{ whiteSpace: 'nowrap', scrollBehavior: 'smooth' }}
      >
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="me-3" style={{ minWidth: '200px' }}>
            <Card.Img variant="top" src={`https://picsum.photos/200/150?random=${i}`} />
            <Card.Body>
              <Card.Title>Card {i + 1}</Card.Title>
              <Card.Text>Example content</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Left arrow */}
      <Button
        variant="light"
        className="position-absolute top-50 start-0 translate-middle-y"
        onClick={() => scroll('left')}
      >
        <ChevronLeft size={24} />
      </Button>

      {/* Right arrow */}
      <Button
        variant="light"
        className="position-absolute top-50 end-0 translate-middle-y"
        onClick={() => scroll('right')}
      >
        <ChevronRight size={24} />
      </Button>
    </div>
  );
};

export default ScrollableCardRow;
