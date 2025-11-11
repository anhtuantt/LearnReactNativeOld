import storeSlice from '@/features/system/store/storeSlice';
import { combineReducers, Reducer } from 'redux';
import { FluxStandardAction } from 'redux-promise-middleware';

const appReducer = combineReducers({
  store: storeSlice,
});

export const rootReducer: Reducer = (state: any, action: FluxStandardAction) => {
  return appReducer(state, action);
};
