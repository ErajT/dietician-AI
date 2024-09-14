"use client";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap';
import '../styling/recipegenerator.css'; 
function CardExample() {
  return (
    <div className="container">
      <Row className="g-4"> {/* Adds spacing between the grid items */}
        
        {/* First Card */}
        <Col xs={12} sm={6} md={4} lg={3}> {/* Responsive breakpoints */}
          <div className="card-container">
            <Card style={{ width: '100%', padding: '4%' }}> {/* Add padding around the card */}
              <Card.Img 
                variant="top" 
                src="/images/recipe1.jpg" 
                className="card-image" 
                style={{ height: '150px', objectFit: 'cover' }} 
              />
              <div className="card-overlay"> {/* Overlay that shows on hover */}
                <div className="card-title">Recipe Name</div> {/* Title displayed on hover */}
                <div className="card-title">Recipe Name</div> 
              </div>
            </Card>
          </div>
        </Col>

      </Row>
    </div>
  );
}

export default CardExample;
