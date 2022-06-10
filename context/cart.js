
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartId, setCartId] = useState(null);

    const handleChangeCartId = (cartId) => {
      localStorage.setItem('@eventozz::cartId', cartId);
      setCartId(cartId)
    }

    useEffect( () => {
      const cartIdStorage = localStorage.getItem('@eventozz::cartId');
      console.log(cartIdStorage);
      if (cartIdStorage) {
        setCartId(cartIdStorage)
      }
    }, [])

    return (
      <CartContext.Provider value={{ cartId, handleChangeCartId }}>
        {children}
      </CartContext.Provider>
    );
  }
  
  export function useCart() {
    const context = useContext(CartContext);

    return context;
  }