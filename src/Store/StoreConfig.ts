import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import accountReducer from "./slice/Account";
import loginReducer from "./slice/loginSlice";
import testDataReducer from "./slice/TestSlice";
import ParamsReducer from "./slice/ParamsSlice";

//import shiftReducer from "./slice/ShiftSlice";
import { authApi } from "../Api/authApi";
import { autocompleteApi } from "../Api/AutocompleteApi";
import { storeApi } from "../Api/StoreApi";
import { storeTargetApi } from "../Api/storeTargetApi";

const rootAuthReducer = combineReducers({
  account: accountReducer,
  login: loginReducer,
  testData: testDataReducer,
  Params: ParamsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};

const persistedAuthReducer = persistReducer(persistConfig, rootAuthReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [autocompleteApi.reducerPath]: autocompleteApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [storeTargetApi.reducerPath]: storeTargetApi.reducer,
    auth: persistedAuthReducer,
    testData: testDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      autocompleteApi.middleware,
      storeApi.middleware,
      storeTargetApi.middleware,
    ]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
