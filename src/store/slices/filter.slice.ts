import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  status: 'all' | 'completed' | 'pending';
  searchQuery: string;
}

const initialState: FilterState = {
  status: 'all',
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<'all' | 'completed' | 'pending'>) => {
      state.status = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setStatus, setSearchQuery } = filterSlice.actions;
export default filterSlice.reducer;