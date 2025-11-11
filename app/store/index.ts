import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import { rootReducer } from './reducers';
import { reduxStorage } from '@/features/system/localStorageServices';
import persistStore from 'redux-persist/es/persistStore';
import reduxFlipper from 'redux-flipper';

// Configuration for persisting Redux state
const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
  timeout: 0,
};

// Setup middlewares conditionally for development environment
const middlewares : any = [];
if (__DEV__) {
  middlewares.push(reduxFlipper());
}

// Apply persistence to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and customized middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

// Persistor to manage persisted state
export const persistor = persistStore(store);

// Define the RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;

export default store;
