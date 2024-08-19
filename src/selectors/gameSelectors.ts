import { RootState } from '../app/store/index';

export const getScoreHero1 = (state: RootState) => state.GameReducer.scoreHero1;

export const getScoreHero2 = (state: RootState) => state.GameReducer.scoreHero2;
