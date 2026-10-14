import { createContext, useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

function CartProvider({ children }) {
  const { token } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);

  // =========================
  // FETCH CART
  // =========================
  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");

      setCartItems(res.data.cart?.products || []);
    } catch (error) {
      console.log("FETCH CART ERROR:", error);
    }
  };

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (productId) => {
    try {
      await api.post("/cart/add", {
        productId,
      });

      await fetchCart();
    } catch (error) {
      console.log("ADD TO CART ERROR:", error);
    }
  };

  // =========================
  // INCREASE QUANTITY
  // =========================
  const increaseQuantity = async (productId, quantity) => {
    try {
      const newQuantity = Number(quantity) + 1;

      console.log("Product ID:", productId);
      console.log("Old Quantity:", quantity);
      console.log("New Quantity:", newQuantity);

      await api.put(`/cart/update/${productId}`, {
        quantity: newQuantity,
      });

      await fetchCart();
    } catch (error) {
      console.log(
        "INCREASE QUANTITY ERROR:",
        error.response?.data || error
      );
    }
  };

  // =========================
  // DECREASE QUANTITY
  // =========================
  const decreaseQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 1) {
        await removeFromCart(productId);
        return;
      }

      const newQuantity = Number(quantity) - 1;

      await api.put(`/cart/update/${productId}`, {
        quantity: newQuantity,
      });

      await fetchCart();
    } catch (error) {
      console.log(
        "DECREASE QUANTITY ERROR:",
        error.response?.data || error
      );
    }
  };

  // =========================
  // REMOVE FROM CART
  // =========================
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);

      await fetchCart();
    } catch (error) {
      console.log(
        "REMOVE FROM CART ERROR:",
        error.response?.data || error
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;