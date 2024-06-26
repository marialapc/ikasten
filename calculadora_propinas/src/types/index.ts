export type MenuItem = {
    id: Number,
    name: string,
    price: number
}

export type OrderItem = menuItem & {
    quantity: number
}