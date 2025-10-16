import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import accountReducer from "./slice/Account";
import loginReducer from "./slice/loginSlice";
import shiftReducer from "./slice/ShiftSlice";
import { authApi } from "../Api/authApi";
import { rolesApi } from "../Api/rolesApi";
import { dictionaryApi } from "../Api/dictionaryApi";
import { shiftApi } from "../Api/shiftApi";

const rootAuthReducer = combineReducers({
  account: accountReducer,
  login: loginReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};

const persistedAuthReducer = persistReducer(persistConfig,rootAuthReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [dictionaryApi.reducerPath]: dictionaryApi.reducer,
    [shiftApi.reducerPath]: shiftApi.reducer,

    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authApi.middleware, rolesApi.middleware, dictionaryApi.middleware,shiftApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
