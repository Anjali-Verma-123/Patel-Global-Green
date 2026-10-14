import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const { token } = useContext(AuthContext);

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (token) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [token]);

  // const fetchWishlist = async () => {
  //   try {
  //     const res = await api.get("/wishlist");

  //     setWishlistItems(res.data.wishlist.products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
   const fetchWishlist = async () => {
  try {
    const res = await api.get("/wishlist");

    console.log("Wishlist:", res.data.wishlist.products);

    setWishlistItems(res.data.wishlist.products);
  } catch (error) {
    console.log(error);
  }
};

  const addToWishlist = async (productId) => {
    try {
      await api.post("/wishlist/add", {
        productId,
      });

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/remove/${productId}`);

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;