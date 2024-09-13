"use client";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Row, Col, Button, Card, Placeholder } from 'react-bootstrap';

function CardExample() {
  return (
    <div className="container">
      <Row className="g-4"> {/* Adds spacing between the grid items */}
        {/* First Card */}
        <Col xs={12} sm={6} md={4} lg={3}> {/* Responsive breakpoints */}
          <Card style={{ width: '100%' }}> {/* Make the card full width in its column */}
          <Card.Img 
      variant="top" 
      src="/images/recipe1.jpg" 
      style={{ height: '150px', objectFit: 'cover' }}  // Adjust height and fit
    />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>


         {/* Second Card */}
        <Col xs={12} sm={6} md={4} lg={3}> {/* Responsive breakpoints */}
          <Card style={{ width: '100%' }}> {/* Make the card full width in its column */}
          <Card.Img 
      variant="top" 
      src="/images/recipe1.jpg" 
      style={{ height: '150px', objectFit: 'cover' }}  // Adjust height and fit
    />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>

{/* Third Card */}
<Col xs={12} sm={6} md={4} lg={3}> {/* Responsive breakpoints */}
          <Card style={{ width: '100%' }}> {/* Make the card full width in its column */}
          <Card.Img 
      variant="top" 
      src="/images/recipe1.jpg" 
      style={{ height: '150px', objectFit: 'cover' }}  // Adjust height and fit
    />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>

        
        {/* Additional Cards Can Go Here */}
        <Col xs={12} sm={6} md={4} lg={3}> {/* Responsive breakpoints */}
          <Card style={{ width: '100%' }}> {/* Make the card full width in its column */}
              <Card.Img 
      variant="top" 
      src="/images/recipe1.jpg" 
      style={{ height: '150px', objectFit: 'cover' }}  // Adjust height and fit
    />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CardExample;
