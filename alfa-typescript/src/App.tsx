
import { useReducer, useEffect } from "react";
import Film from "./components/Film";
import Header from "./components/Header";
import { cartReducer, initialState } from "./reducers/cart-reducer";

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState )

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])
    

  return (

    <>
      <Header  
        cart={state.cart}
        dispatch={dispatch}
      />
      <main className="container-xl mt-5">

        <div className="row mt-5" style={{ marginRight: 0, marginLeft: 0, justifyContent: 'center' }}>
          {state.data.map((film) => (
            <Film
              key={film.id}
              film={film}
              dispatch={dispatch}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark py-5">
        <div className="">
          <p className="text-center fs-2 mt-4 m-md-0">
          Created with ❤ by <a className="copy-link link-name" href="https://github.com/marialapc">@marialapc</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
