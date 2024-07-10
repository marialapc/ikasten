import { Dispatch } from 'react';
import type { Guitar } from '../types'
import type { CartActions } from '../reducers/cart-reducer';

type GuitarProps = {
  guitar: Guitar,
  dispatch: Dispatch<CartActions>
}


export default function Guitar({ guitar, dispatch }: GuitarProps) {

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${guitar.image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8 flex flex-col justify-between">
        <h3 className="text-black fs-5 fw-bold">{guitar.name}</h3>
        <p>{guitar.director}</p>
        <h3 className="fw-black" style={{ fontSize: '16px' }}>${guitar.price}</h3>
        <button
          type="button"
          className="btn btn-dark w-50" style={{ fontSize: '14px' }}
          onClick={() => dispatch({ type: 'add-to-cart', payload: { item: guitar } })}
        >
          Añadir a la cesta
        </button>
      </div>
    </div>
  );
}
