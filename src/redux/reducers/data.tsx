import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for individual data items
interface DataItem {
  data_id: number; // Adjust the type based on your actual data structure
  [key: string]: any; // Use this to allow other properties if needed
}

// Define the type for the slice state
interface DataState {
  Datalist: DataItem[];
}

// Define the initial state with the DataState type
const initialState: DataState = {
  Datalist: [],
};

// Create the slice with typed state and actions
const DataSlice = createSlice({
  name: 'Data',
  initialState,
  reducers: {
    getDataList: (state, action: PayloadAction<DataItem[]>) => {
      state.Datalist = action.payload;
    },
    insertDataList: (state, action: PayloadAction<DataItem>) => {
      console.log(action.payload);
      state.Datalist = [...state.Datalist, action.payload];
    },
    updateDataList: (state, action: PayloadAction<DataItem>) => {
      const updatedData = state.Datalist.map((item) => 
        item.data_id === action.payload.data_id ? action.payload : item
      );
      state.Datalist = updatedData;
    },
    deleteDataList: (state, action: PayloadAction<number>) => {
      state.Datalist = state.Datalist.filter((item) => item.data_id !== action.payload);
    },
  },
});

// Export actions and reducer
export const {
  getDataList,
  insertDataList,
  updateDataList,
  deleteDataList,
} = DataSlice.actions;

export default DataSlice.reducer;
