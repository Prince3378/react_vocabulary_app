import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vocabular } from '../types/Vocabular';

type WordsState = {
  words: Vocabular[],
}

const initialState: WordsState = {
  words: [],
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWords(state, action: PayloadAction<Vocabular>) {
      state.words.push({
        id: action.payload.id,
        word: action.payload.word,
        translation: action.payload.translation,
      });
    },
    addListWords(state, action: PayloadAction<Vocabular[]>) {
      state.words.push(...action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.words = state.words.filter(word => word.id !== action.payload);
    },
    removeWords(state, action: PayloadAction<[]>) {
      state.words = action.payload;
    },
  },
});

export const {
  addWords, addListWords, deleteItem, removeWords,
} = wordsSlice.actions;

export default wordsSlice.reducer;
