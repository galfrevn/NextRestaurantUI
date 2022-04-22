import React from "react";
import Cart from '../components/Cart/Cart'

export default function cart({ isOpened }) {

  return (
    <div className={`${isOpened && "translate-x-2/3"} relative z-40 transition-all duration-300`} >
      <Cart />
      
    </div>
  )
}
