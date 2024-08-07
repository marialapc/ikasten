import { db } from "../data/db";
import type { CartItem, Film } from "../types";

export type CartActions =
    { type: 'add-to-cart', payload: { item: Film } } |
    { type: 'remove-from-cart', payload: { id: Film['id'] } } |
    { type: 'decrease-quantity', payload: { id: Film['id'] } } |
    { type: 'increase-quantity', payload: { id: Film['id'] } } |
    { type: 'clear-cart' }

export type CartState = {
    data: Film[]
    cart: CartItem[]
}

const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}


export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

const max_items = 5
const min_items = 1


export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {
    if (action.type === "add-to-cart") {

        const itemExists = state.cart.find(film => film.id === action.payload.item.id);

        let updatedCart: CartItem[] = []

        if (itemExists) {
            updatedCart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < max_items) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })

        } else {
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }
            updatedCart = [...state.cart, newItem]
        }

        setTimeout(() => {
            const carritoIcon = document.querySelector('.js-carrito');
            if (carritoIcon) {
                carritoIcon.classList.add('grow');
                setTimeout(() => carritoIcon.classList.remove('grow'), 200);
            }
        }, 0);

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'remove-from-cart') {
        const cart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart
        }
    }

    if (action.type === 'decrease-quantity') {
        const cart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > min_items) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })

        return {
            ...state,
            cart
        }
    }


    if (action.type === 'increase-quantity') {
        console.log('increase-quantity')
        const cart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity < max_items) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })

        return {
            ...state,
            cart
        }
    }

    if (action.type === 'clear-cart') {
        console.log('clear-cart')
        return {
            ...state,
            cart: []
        }
    }

    return state

}
