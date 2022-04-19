import React, { useState } from "react";

const CartContext = React.createContext()

export function CartContextProvider ({ children }) {
  const [cartItems, setCartItems] = useState([])

  return <CartContext.Provider value={{ cartItems, setCartItems }}>
    {children}
  </CartContext.Provider>
}

export default CartContext