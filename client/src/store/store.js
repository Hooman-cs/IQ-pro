import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import questionReducer from '../slices/questionSlice.js';
import configReducer from '../slices/configSlice';
import resultReducer from '../slices/resultSlice';

const store = configureStore({
  // The reducer defines how the state is changed
  reducer: {
    auth: authReducer,
    question: questionReducer,
    config: configReducer,
    result: resultReducer,
    // Add other slices here (e.g., test: testReducer, results: resultsReducer)
  },
});

export default store;