import { Dispatch } from 'react';
import type { Film } from '../types'
import type { CartActions } from '../reducers/cart-reducer';

type FilmProps = {
  film: Film,
  dispatch: Dispatch<CartActions>
}


export default function Film({ film, dispatch }: FilmProps) {

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${film.image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div>
        <h3 className="text-white fs-5 fw-bold">{film.name}</h3>
        <p  style={{ color: 'grey' }}>{film.director}</p>
        <div className='price-button-container'>
        <h3 className="text-white" style={{ fontSize: '14px' }}>{film.price}  €</h3>
        <button
          type="button"
          className="btn btn-dark w-50" style={{ fontSize: '14px' }}
          onClick={() => dispatch({ type: 'add-to-cart', payload: { item: film } })}
        >
          Añadir a la cesta
        </button>
        </div>
      </div>
    </div>
  );
}
