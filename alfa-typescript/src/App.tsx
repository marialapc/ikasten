
import { useReducer, useEffect } from "react";
import Guitar from "./components/Guitar";
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
        <h3 className="text-center" style={{ fontSize: '32px' }}>ToWatch Shop</h3>

        <div className="row mt-5" style={{ marginRight: 0, marginLeft: 0, justifyContent: 'center' }}>
          {state.data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              dispatch={dispatch}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-2 mt-4 m-md-0">
            ToWatch - Shop
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
