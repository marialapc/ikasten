export type Film = {
    id: number
    name: string
    image: string
    director: string
    price: number
  }

  export type CartItem = Film & {
    quantity: number
  }

  export type FilmID = Film['id']

