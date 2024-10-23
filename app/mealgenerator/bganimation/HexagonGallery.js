import React from 'react';
import './HexagonGallery.css'; // Importing CSS for hexagon shapes and animations

const hexagons = [
  { id: 1, imgSrc: '/images/meal9.jpg', quote: 'Food is essential to life. Enjoy it.' },
  { id: 2, imgSrc: '/images/meal2.jpg', quote: 'Cooking is love made visible.' },
  { id: 3, imgSrc: '/images/meal7.jpg', quote: 'Good food is good mood.' },
  { id: 4, imgSrc: '/images/meal10.jpg', quote: 'Eat food, not much, mostly plants.' },
  { id: 5, imgSrc: '/images/meal5.jpg', quote: 'Cooking is like love. It should be entered into with abandon or not at all.' },
  { id: 6, imgSrc: '/images/meal6.jpg', quote: 'The only thing I like better than talking about food is eating.' },
  { id: 7, imgSrc: '/images/meal12.jpg', quote: 'A recipe has no soul. You as the cook must bring soul to the recipe.' },
  { id: 8, imgSrc: '/images/meal11.jpg', quote: 'Life is a combination of magic and pasta.' },
];

const HexagonGallery = () => {
  return (
    <div className="hexagon-gallery">
      {hexagons.map((hexagon) => (
        <div key={hexagon.id} className="hexagon">
          <div
            className="hexagon-image"
            style={{ backgroundImage: `url(${hexagon.imgSrc})` }}
          ></div>
          <div className="quote">{hexagon.quote}</div> {/* Add this line */}
        </div>
      ))}
    </div>
  );
};

export default HexagonGallery;
