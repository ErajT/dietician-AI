"use client";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap';
import '../styling/recipegenerator.css'; 

function CardExample({ name, image, calories, cuisineType }) {
  return (
    <div className="container">
      <Row className="g-4"> {/* Adds spacing between the grid items */}
        
        {/* Recipe Card */}
        <Col xs={12} sm={6} md={4} lg={3}> {/* Responsive breakpoints */}
          <div className="card-container">
          <Card style={{ width: '100%', position: 'relative' }}> {/* Add padding around the card */}
              <Card.Img 
                variant="top" 
                src={image || "/images/default-recipe.jpg"}
                className="card-image" 
                style={{ height: '150px', objectFit: 'cover' }} 
              />
              <div className="card-overlay">
              <Card.Body>
                <Card.Title className="card-title">{name}</Card.Title> 
                <Card.Text>Calories: {calories ? `${calories} kcal` : "N/A"}</Card.Text>
                <Card.Text>cuisineType : {cuisineType}</Card.Text>
      
              </Card.Body>
              </div>
            </Card>
          </div>
        </Col>

      </Row>
    </div>
  );
}

export default CardExample;
