import { createSlice } from "@reduxjs/toolkit";
const initialState: { wishlistIds: number[] } = {
  wishlistIds: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlistIds = action.payload;
    },
    clearWishlist: (state) => {
      state.wishlistIds = [];
    },
    addToWishlistSlice: (state, action) => {
      if (!state.wishlistIds.includes(action.payload)) {
        state.wishlistIds.push(action.payload);
      }
    },
    removeFromWishlistSlice: (state, action) => {
      state.wishlistIds = state.wishlistIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const {
  setWishlist,
  clearWishlist,
  addToWishlistSlice,
  removeFromWishlistSlice,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
