
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useCart } from "./hooks/useCart";

function App() {


  const { data, cart,addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } =  useCart();

  return (
    <>
      <Header  
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty= {isEmpty}
        cartTotal={cartTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center fs-3">Our Collection</h2>

        <div className="row mt-5" style={{ marginRight: 0, marginLeft: 0, justifyContent: 'center' }}>
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
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
