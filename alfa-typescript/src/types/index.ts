export type Guitar = {
    id: number
    name: string
    image: string
    director: string
    price: number
  }

  export type CartItem = Guitar & {
    quantity: number
  }

  export type GuitarID = Guitar['id']

