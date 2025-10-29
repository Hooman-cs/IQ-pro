import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// --- Admin Thunks ---

// Fetch all questions for Admin view
export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/questions');
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

// Create a new question
export const createQuestion = createAsyncThunk(
  'questions/createQuestion',
  async (questionData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/questions', questionData);
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

// Update an existing question
export const updateQuestion = createAsyncThunk(
  'questions/updateQuestion',
  async ({ id, questionData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/questions/${id}`, questionData);
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

// Delete a question
export const deleteQuestion = createAsyncThunk(
  'questions/deleteQuestion',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/questions/${id}`);
      return id; // Return the deleted ID
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// --- User Quiz Thunk ---

// Fetch randomized questions for the user test
export const getTestQuestions = createAsyncThunk(
  'questions/getTestQuestions',
  async (_, { rejectWithValue }) => {
    try {
      // Calls the public backend route for randomized questions
      const { data } = await api.get('/questions/test');
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


// --- Slice Definition ---

const initialState = {
  // Admin-specific states (for question list/CRUD)
  questions: [], 
  loading: false,
  error: null,
  success: false,

  // User Quiz-specific states
  testQuestions: null, // The array of questions for the current test
  testLoading: false,
  testError: null,
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    // Reducer to reset success state after Admin CRUD
    resetQuestionSuccess: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin Fetch Questions Cases
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ... (Add cases for createQuestion, updateQuestion, deleteQuestion here, using the 'questions', 'loading', 'error', 'success' states)

      // --- User Test Questions Cases (Quiz Fetch) ---
      .addCase(getTestQuestions.pending, (state) => {
        state.testLoading = true;
        state.testError = null;
        state.testQuestions = null;
      })
      .addCase(getTestQuestions.fulfilled, (state, action) => {
        state.testLoading = false;
        state.testQuestions = action.payload; // Store the randomized questions here
      })
      .addCase(getTestQuestions.rejected, (state, action) => {
        state.testLoading = false;
        state.testError = action.payload;
      });
  },
});

export const { resetQuestionSuccess } = questionSlice.actions;

export default questionSlice.reducer;