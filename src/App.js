import React, { useState, useContext } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

import { CartContext } from "./contexts/CartContext";
import { ProductContext } from "./contexts/ProductContext";

import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

const writeToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const readFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const LSKey = "g0223";

const initializeCart = () => {
  const cart = readFromLocalStorage(LSKey);
  if (cart === null) {
    return [];
  } else {
    return cart;
  }
};

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    writeToLocalStorage("cart", newCart);
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    writeToLocalStorage("cart", newCart);
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation />

          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>
            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
