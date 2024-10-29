"use client";
import React from 'react'
import SearchBar from '../../components/searchbar';
import CardExample from '../../components/placeholder';
import '../../styling/recipegenerator.css'; 



const cart = () => {
  return (
    <div className='recipe-cart-background'>
      <div className="cart-search-bar">
        <SearchBar />
        <div className='all-carts'>
        <CardExample   />
        <CardExample />
        <CardExample />
        <CardExample />
        </div>
      </div>
    </div>
  )
}

export default cart;