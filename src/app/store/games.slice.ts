import { createSlice } from '@reduxjs/toolkit';
import { iGameState } from './slice.types';

const initialState: iGameState = {
  scoreHero1: 0,
  scoreHero2: 0,
};

const GameSlice = createSlice({
  name: 'duel',
  initialState,
  reducers: {
    addScoreHero1(state) {
      return { ...state, scoreHero1: state.scoreHero1 + 1 };
    },
    addScoreHero2(state) {
      return { ...state, scoreHero2: state.scoreHero2 + 1 };
    },
  },
});

export const { actions } = GameSlice;
export default GameSlice.reducer;
