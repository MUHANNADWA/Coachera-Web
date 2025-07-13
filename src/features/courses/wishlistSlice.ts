import { createSlice } from "@reduxjs/toolkit";

const getWishlistFromStorage = (): number[] | null => {
  try {
    const wishlist = localStorage.getItem("wishlist");
    return wishlist ? JSON.parse(wishlist) : null;
  } catch (error) {
    console.error("Failed to parse wishlist from localStorage", error);
    return null;
  }
};

const initialState: { wishlist: number[] | null } = {
  wishlist: getWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(action.payload));
    },
    clearWishlist: (state) => {
      state.wishlist = null;
      localStorage.removeItem("wishlist");
    },
  },
});

export const { setWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
