import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import kycReducer from '../kycSlice';

export const store = configureStore({
  reducer: {
    kyc: kycReducer,
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
