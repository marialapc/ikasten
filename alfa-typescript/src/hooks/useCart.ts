import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";
 
 export const useCart = () => {

    const initialCart = () : CartItem[bb] => {
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
    
      function addToCart(item : Guitar ) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        if(itemExists >= 0) {
          if(cart[itemExists].quantity >= max_items) return
          const updatedCart = [...cart];
          updatedCart[itemExists].quantity++;
          setCart(updatedCart);
        } else {
          const newItem : CartItem = {...item, quantity : 1}
          setCart([...cart, newItem]);
        }
      }
    
      function removeFromCart(id : Guitar['id']) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      function increaseQuantity(id : Guitar['id']) {
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
    
      function decreaseQuantity(id : Guitar['id']) {
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

