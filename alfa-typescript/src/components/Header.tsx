import { useState, useEffect, useMemo, useRef, Dispatch } from "react";
import type { CartItem } from "../types";
import type { CartActions } from "../reducers/cart-reducer";

type HeaderProps = {
  cart: CartItem[];
  dispatch: Dispatch<CartActions>;
};

export default function Header({ cart, dispatch }: HeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartQuantity = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );
  const roundedCartTotal = roundToTwo(cartTotal);

  function roundToTwo(num: number): number {
    return Math.round(num * 100) / 100;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && !target.closest('[data-prevent-close]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="py-5 header">
      <a href="index.html">
        <img className="logo" src="img\TW.jpg" alt="" />
      </a>
      <nav>
        <div
          className="carrito js-carrito"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img
            className="img-fluid"
            src="img\shopping-bag.png"
            alt="imagen carrito"
          />
          {cartQuantity > 0 && (
            <span className="counter js-counter">{cartQuantity}</span>
          )}
        </div>

        <div id="carrito" className={`${isOpen ? "--is-open" : ""}`} ref={cartRef}>
          {isEmpty ? (
            <p className="text-center empty-cart">La cesta está vacía</p>
          ) : (
            <>
              <div className="table">
                <div>
                  {cart.map((film) => (
                    <section key={film.id}>
                      <div className="cart-item">
                        <div>
                          <div>
                            <img
                              className="img-fluid"
                              src={`/img/${film.image}.jpg`}
                              alt="imagen filmra"
                            />
                          </div>
                        </div>
                        <div className="info-container">
                          <div >
                            <div className="film-title">{film.name}</div>
                            <div className="fw-bold">{film.price} €</div>
                          </div>

                          <div className="button-container">
                            <div className="button-container">
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
                            </div>
                            <div>
                              <button
                                className=" x-btn"
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
                            </div>
                          </div>
                        </div>
                      </div>
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
              Vaciar Cesta
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
