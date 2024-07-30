import { useMemo, Dispatch } from "react"
import type { CartItem } from "../types"
import type { CartActions } from "../reducers/cart-reducer"

type HeaderProps = {
    cart: CartItem[]
    dispatch: Dispatch<CartActions>
}

export default function Header({ cart, dispatch }: HeaderProps) {

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    const roundedCartTotal = roundToTwo(cartTotal);

    function roundToTwo(num: number): number {
        return Math.round(num * 100) / 100;
    }

    return (
        <header className="py-5 header">
        <a href="index.html">
           <img className="logo" src="img\TW.jpg" alt="" />
        </a>
        <nav className="">
                        <div
                            className="carrito js-carrito"
                        >
                            <img className="img-fluid" src="img\shopping-bag.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">La cesta está vacía</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(film => (
                                                    <tr key={film.id}>
                                                        <td>
                                                            <img
                                                                className="img-fluid"
                                                                src={`/img/${film.image}.jpg`}
                                                                alt="imagen filmra"
                                                            />
                                                        </td>
                                                        <td>{film.name}</td>
                                                        <td className="fw-bold">
                                                            {film.price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => dispatch({
                                                                    type: 'decrease-quantity',
                                                                    payload: { id: film.id }
                                                                })}
                                                            >
                                                                -
                                                            </button>
                                                            {film.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => dispatch({
                                                                    type: 'increase-quantity',
                                                                    payload: { id: film.id }
                                                                })}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn"
                                                                type="button"
                                                                onClick={() => dispatch({
                                                                    type: 'remove-from-cart',
                                                                    payload: { id: film.id }
                                                                })}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <p className="text-end">Total pagar:
                                            <span className="fw-bold">${roundedCartTotal}</span></p>

                                    </>
                                )}

                                <button
                                    onClick={() => dispatch({ type: 'clear-cart' })}
                                    className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                            </div>
                        </div>
        </nav>
             
        </header>

    )
}


