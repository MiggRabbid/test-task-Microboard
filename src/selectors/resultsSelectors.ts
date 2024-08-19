import { RootState } from '../app/store/index';

export const getResults = (state: RootState) => state.ResultsReducer.results;