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

//import shiftReducer from "./slice/ShiftSlice";
import { authApi } from "../Api/authApi";
import { rolesApi } from "../Api/rolesApi";
import { dictionaryApi } from "../Api/dictionaryApi";
import { salesApi } from "../Api/salesApi";
import { shiftApi } from "../Api/shiftApi";
import { autocompleteApi } from "../Api/AutocompleteApi";
import { rulesApi } from "../Api/rulesApi";

const rootAuthReducer = combineReducers({
  account: accountReducer,
  login: loginReducer,
  testData: testDataReducer,
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
    [rolesApi.reducerPath]: rolesApi.reducer,
    [dictionaryApi.reducerPath]: dictionaryApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
    [shiftApi.reducerPath]: shiftApi.reducer,
    [autocompleteApi.reducerPath]: autocompleteApi.reducer,
    [rulesApi.reducerPath]: rulesApi.reducer,

    auth: persistedAuthReducer,
    testData: testDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      rolesApi.middleware,
      dictionaryApi.middleware,
      salesApi.middleware,
      shiftApi.middleware,
      autocompleteApi.middleware,
      rulesApi.middleware,
    ]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
