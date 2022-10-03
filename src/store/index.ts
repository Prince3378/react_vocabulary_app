import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from './wordsSlice';

const store = configureStore({
  reducer: {
    words: wordsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
