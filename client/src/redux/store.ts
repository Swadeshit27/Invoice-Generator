
import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./index"
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from 'react-redux'
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const store = configureStore({
    reducer: {
        products: persistReducer(persistConfig, ProductReducer)
    },
});
const persistedStore = persistStore(store)

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store, persistedStore, useAppDispatch, useAppSelector };
