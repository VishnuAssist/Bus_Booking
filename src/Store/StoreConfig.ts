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
import { rolesApi } from "../Api/rolesApi";
import { dictionaryApi } from "../Api/dictionaryApi";
import { salesApi } from "../Api/salesApi";
import { shiftApi } from "../Api/shiftApi";
import { autocompleteApi } from "../Api/AutocompleteApi";
import { rulesApi } from "../Api/rulesApi";
import { storeApi } from "../Api/StoreApi";
import { attendanceApi } from "../Api/AttendanceApi";
import { commissionApi } from "../Api/commisionApi";
import { userGroupApi } from "../Api/userGroupApi";
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
    [rolesApi.reducerPath]: rolesApi.reducer,
    [dictionaryApi.reducerPath]: dictionaryApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
    [shiftApi.reducerPath]: shiftApi.reducer,
    [autocompleteApi.reducerPath]: autocompleteApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [storeTargetApi.reducerPath]: storeTargetApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [rulesApi.reducerPath]: rulesApi.reducer,
    [commissionApi.reducerPath]: commissionApi.reducer,
    [userGroupApi.reducerPath]: userGroupApi.reducer,
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
      storeApi.middleware,
      storeTargetApi.middleware,
      attendanceApi.middleware,
      rulesApi.middleware,
      commissionApi.middleware,
      userGroupApi.middleware,
    ]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
