import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  category: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  sort: string;
  inStock: boolean;
  rating: number;
}

const initialState: FiltersState = {
  category: '',
  search: '',
  minPrice: 0,
  maxPrice: 10000,
  sort: 'newest',
  inStock: false,
  rating: 0,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setInStock: (state, action: PayloadAction<boolean>) => {
      state.inStock = action.payload;
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setCategory,
  setSearch,
  setPriceRange,
  setSort,
  setInStock,
  setRating,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
