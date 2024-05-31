import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
 
 export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      const [data] = useState(db);
      const [cart, setCart] = useState(initialCart);
    
      const max_items = 5
      const min_items = 1
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
      function addToCart(item) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        if(itemExists >= 0) {
          if(cart[itemExists].quantity >= max_items) return
          const updatedCart = [...cart];
          updatedCart[itemExists].quantity++;
          setCart(updatedCart);
        } else {
          item.quantity = 1;
          setCart([...cart, item]);
        }
    
        saveLocalStorage()
      }
    
      function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      function increaseQuantity(id) {
        const updatedCart = cart.map( item => {
          if(item.id === id && item.quantity < max_items) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
            return item 
        })
        setCart(updatedCart)
      }
    
      function decreaseQuantity(id) {
         const updatedCart = cart.map( item => {
          if(item.id === id && item.quantity > min_items) {
            return {
              ...item,
              quantity: item.quantity -1
            }
          }
            return item
         })
    
         setCart(updatedCart)
      }
    
      function clearCart() {
        setCart([])
      }
    
  

      
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [cart] )
    
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

