import React from 'react'
import SearchBar from '../../components/searchbar';
import '../../styling/recipegenerator.css'; 



const cart = () => {
  return (
    <div className='recipe-cart-background'>
      <div className="cart-search-bar"><SearchBar />
      </div>
    </div>
  )
}

export default cart;