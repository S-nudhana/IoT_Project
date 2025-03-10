import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";

import dataReducer from "../features/dataSlice";

const persistConfig = {
    key: import.meta.env.REACT_APP_PERSIST_KEY || "root",
    storage,
};

const rootReducer = combineReducers({
    data: persistReducer(persistConfig, dataReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
