import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import dataReducer from "../Features/dataSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  data: persistReducer(persistConfig, dataReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
