import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Fetch a single result by ID
export const getResultDetails = createAsyncThunk(
  'result/getResultDetails',
  async (resultId, { rejectWithValue }) => {
    try {
      // NOTE: We need to create a GET /api/results/:id route later
      const { data } = await api.get(`/results/${resultId}`); 
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// Fetch all results for the logged-in user
export const listMyResults = createAsyncThunk(
  'result/listMyResults',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/results/myresults`); 
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

const resultSlice = createSlice({
  name: 'result',
  initialState: {
    resultDetails: null,
    myResults: [],
    loading: false,
    error: null,
    certificatePrice: null,
    // Add other result-related states here (e.g., list of my results)
  },
  reducers: {
    // We will add reducers here if needed
    setResultDetails: (state, action) => {
        state.resultDetails = action.payload;
        state.loading = false;
        state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Result Details Cases
      .addCase(getResultDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resultDetails = null;
      })
      .addCase(getResultDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.resultDetails = action.payload;
      })
      .addCase(getResultDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // List My Results Cases
      .addCase(listMyResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listMyResults.fulfilled, (state, action) => {
        state.loading = false;
        state.myResults = action.payload;
      })
      .addCase(listMyResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setResultDetails } = resultSlice.actions;

export default resultSlice.reducer;