import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';

const initialState = {
  albums: cartItems,
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action) => {
      const album = state.albums.find(album => album.id === action.payload.id);
      if (album) {
        album.amount += 1;
      }
    },
    decrease: (state, action) => {
      const album = state.albums.find(album => album.id === action.payload.id);
      if (album) {
        album.amount -= 1;
        if (album.amount < 1) {
          state.albums = state.albums.filter(album => album.id !== action.payload.id);
        }
      }
    },
    removeItem: (state, action) => {
      state.albums = state.albums.filter(album => album.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.albums = [];
    },
    calculateTotals: (state) => {
      let totalQuantity = 0;
      let totalPrice = 0;
      state.albums.forEach(album => {
        totalQuantity += album.amount;
        totalPrice += album.amount * album.price;
      });
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    }
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
