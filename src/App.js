import { useState } from "react";
import Header from "./components/Layouts/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/Cart-Provider";

function App() {
  //Adding the setup for cart show logic using state

  const [showCart, isShowCart] = useState(false);

  const showCartHandler = () => {
    isShowCart(true);
  };

  const hideCartHandler = () => {
    isShowCart(false);
  };

  return (
    <CartProvider>
      <Header onClick={showCartHandler} />
      {showCart && <Cart onClose={hideCartHandler} />}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
