import { useState } from "react"
import type { OrderItem, menuItem } from "../types"

export default function useOrder () {
    const [order, setOrder] = useState<OrderItem[]>([])
  
    const addItem = (item : menuItem) => {
        console.log(item)
    }
    return {
        addItem
    }
}