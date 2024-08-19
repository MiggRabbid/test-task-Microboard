import { combineReducers, configureStore } from '@reduxjs/toolkit';

import GameReducer, { actions as gameActions } from './games.slice';

const rootReducer = combineReducers({
  GameReducer,
});

const actions = {
  ...gameActions,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer, store, actions };
export type AppDispatch = typeof store.dispatch;
