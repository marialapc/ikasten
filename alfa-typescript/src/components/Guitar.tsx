import type { Guitar } from '../types'

type GuitarProps = {
  guitar : Guitar,
  addToCart : (item: Guitar) => void
}


export default function Guitar({ guitar, addToCart} : GuitarProps) {

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
        <h3 className="text-black fs-5 fw-bold text-uppercase">{guitar.name}</h3>
        <p>{guitar.description}</p>
        <h3 className="fw-black fs-4">${guitar.price}</h3>
        <button
          type="button"
          className="btn btn-dark w-100 fs-2"
          onClick={() => addToCart(guitar)}
        >
          Añadir a la cesta
        </button>
      </div>
    </div>
  );
}
