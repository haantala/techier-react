import { createSlice } from '@reduxjs/toolkit';

export const DataSlice = createSlice({
  name: 'Data',
  initialState: {
    Datalist: [],
  },
  reducers: {
    getDataList: (state, action) => {
      state.Datalist = action.payload;
    },
    insertDataList: (state, action) => {
      console.log(action.payload);
      
      state.Datalist = [...state.Datalist, action.payload];
    },
    updateDataList: (state, action) => {
      const newData = state.Datalist.map((item) => {
        if (item.data_id === action.payload.data_id) {
          item = action.payload;
        }
        return item;
      });
      state.Datalist = newData;
    },
    deleteDataList: (state, action) => {
      const filterData = state.Datalist.filter((item) => item.data_id !== action.payload);
      state.Datalist = filterData;
    },
  },
});

export const {
    getDataList,
  insertDataList,
  updateDataList,
  deleteDataList,
} = DataSlice.actions;

export default DataSlice.reducer;