import { useState } from "react"
import type { menuItem, OrderItem } from "../types"

export default function useOrder () {
    const [order, setOrder] = useState<OrderItem[]>([])
  
    const addItem = (item : menuItem) => {
         const itemExist = order.find(orderItem => orderItem.id === item.id)
        if(itemExist) {
            const updatedOrder = order.map( orderItem => orderItem.id === item.id ? 
                {...orderItem, quantity: orderItem.quantity + 1} : 
                orderItem
            )
            setOrder(updatedOrder)
        } else {
            const newItem = {...item, quantity: 1}
            setOrder([...order, newItem])
        }
    }

    return {
        order,
        addItem

    }
}