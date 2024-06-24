import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';
import axios from 'axios';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, thunkAPI ) => {
    try {
      const response = await axios.get("http://localhost:8080/musics");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  albums: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
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

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.albums = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        alert(action.payload);
      });
  }
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
