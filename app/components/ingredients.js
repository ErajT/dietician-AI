import * as React from 'react';

export default function IngredientsList({ recipe }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        marginTop: '8%',
        marginLeft: '7%',
        backgroundColor: 'transparent',
        overflow: 'visible',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.5em', marginBottom: '1em' }}>
        Ingredients
      </div>
      {recipe.ingredients.map((ingredient, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '1em',
            padding: '0.5em',
            borderRadius: '8px',
            backgroundColor: index % 2 === 0 ? '#5c9db5' : '#497e91', // Alternating background colors
          }}
        >
          <div style={{ fontWeight: 'bold', marginRight: '1em' }}>{index + 1}.</div>
          <div style={{ flex: 1 }}>{ingredient.name}</div>
          <div style={{ textAlign: 'right' }}>
            <img
              src={ingredient.image}
              alt={ingredient.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '8px',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
              className="ingredient-image"
            />
            
          </div>
        </div>
      ))}
      <style jsx>{`
        .ingredient-image:hover {
          transform: scale(1.5); // Scale effect on hover
        }
      `}</style>
    </div>
  );
}
