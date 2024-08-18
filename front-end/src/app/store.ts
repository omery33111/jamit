import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import songReducer from '../features/song/songSlice';
import administratorReducer from '../features/administrator/administratorSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    song: songReducer,
    administrator: administratorReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
