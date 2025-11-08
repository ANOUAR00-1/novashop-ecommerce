import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersApi, Order } from '../../services/api';

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
  currentOrder: Order | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
  currentOrder: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await ordersApi.getAll();
  return response;
});

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id: string) => {
    const response = await ordersApi.getById(id);
    return response;
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: any) => {
    const response = await ordersApi.create(orderData);
    return response;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
