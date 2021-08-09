import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IDetailsState {
  customerName: string, aadharNumber: number, aadharFrontImage: string, aadharBackImage: string
}
export interface kycState {
  data: IDetailsState
}

const initialState: kycState = {
  data: {
    aadharBackImage: '',
    aadharFrontImage: '',
    aadharNumber: 0,
    customerName: ''
  }
};

export const kycReducer = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    sendKycData: (state, action: PayloadAction<IDetailsState>) => {
      state.data = action.payload;
    },
  }
});

export const { sendKycData } = kycReducer.actions;

export default kycReducer.reducer;
