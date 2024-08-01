import { useState, useMemo, Dispatch } from "react";
import type { CartItem } from "../types";
import type { CartActions } from "../reducers/cart-reducer";

type HeaderProps = {
  cart: CartItem[];
  dispatch: Dispatch<CartActions>;
};

export default function Header({ cart, dispatch }: HeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );
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
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img
            className="img-fluid"
            src="img\shopping-bag.png"
            alt="imagen carrito"
          />
        </div>

        <div id="carrito" className={`bg-white ${isOpen ? "--is-open" : ""}`}>
          {isEmpty ? (
            <p className="text-center">La cesta está vacía</p>
          ) : (
            <>
              <div className="table">
                <div>
                  {cart.map((film) => (
                    <section key={film.id}>
                      <ul className="cart-list">
                        <div>
                          <li>
                            <img
                              className="img-fluid"
                              src={`/img/${film.image}.jpg`}
                              alt="imagen filmra"
                            />
                          </li>
                        </div>
                        <div>
                          <div>
                            <li>{film.name}</li>
                            <li className="fw-bold">{film.price} €</li>
                          </div>

                          <ul className="button-container">
                            <li className="button-container">
                              <button
                                type="button"
                                className="price-btn"
                                onClick={() =>
                                  dispatch({
                                    type: "decrease-quantity",
                                    payload: { id: film.id },
                                  })
                                }
                              >
                                -
                              </button>
                              {film.quantity}
                              <button
                                type="button"
                                className="price-btn"
                                onClick={() =>
                                  dispatch({
                                    type: "increase-quantity",
                                    payload: { id: film.id },
                                  })
                                }
                              >
                                +
                              </button>
                            </li>
                            <li>
                              <button
                                className="btn"
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  dispatch({
                                    type: "remove-from-cart",
                                    payload: { id: film.id },
                                  });
                                }}
                              >
                                x
                              </button>
                            </li>
                          </ul>
                        </div>
                      </ul>
                      <hr />
                    </section>
                  ))}
                </div>
              </div>

              <p className="text-end">
                Total:
                <span className="fw-bold"> {roundedCartTotal} €</span>
              </p>
            </>
          )}

          {!isEmpty && (
            <button
              onClick={() => dispatch({ type: "clear-cart" })}
              className="btn btn-dark w-100 mt-3"
            >
              Vaciar Carrito
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
