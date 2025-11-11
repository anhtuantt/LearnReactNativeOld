import { LanguageCode } from '@/features/language/utils';
import { IStore } from '@/app/store/types';
import { createSlice } from '@reduxjs/toolkit';

export type IStoreState  = {
  language: string;
};

export const initialState = {
  language: LanguageCode.EN,
} as IStoreState ;

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setLanguage: (state, action) => ({
      ...state,
      language: action.payload,
    }),
  },
});

export const getLanguageKey = (state: IStore) => state?.store?.language;
export const { setLanguage} = storeSlice.actions;

export default storeSlice.reducer;
