import { createSlice } from "@reduxjs/toolkit";
import type {  PayloadAction } from "@reduxjs/toolkit";
import type { QueryParamsType } from "../../model/common";

interface ParamsState {
  SalesParams: QueryParamsType;
  DictionaryParams: QueryParamsType;
  AttendanceParams: QueryParamsType;
  UserGroupParams: QueryParamsType;
}

function initParams(status?: number): QueryParamsType {
  return {
    // category: null,
    OrderBy: "decdate",
    SearchTerm: "",
    
    Status: status ?? undefined,
    PageNumber: 1,
    PageSize: 10,
  };
}

const initialState: ParamsState = {
  SalesParams: initParams(),
  DictionaryParams :initParams(),
  AttendanceParams :initParams(),
  UserGroupParams :initParams(),
};

export const Paramsslice = createSlice({
  name: "Params",
  initialState,
  reducers: {
    setSalesParams: (state, action: PayloadAction<Partial<QueryParamsType>>) => {
      state.SalesParams = { ...state.SalesParams, ...action.payload };
    },
    setDictionaryParams :(state ,action : PayloadAction<Partial<QueryParamsType>>) =>{
      state.DictionaryParams = {...state.DictionaryParams,...action.payload};
    },
    setAttendanceParams :(state ,action : PayloadAction<Partial<QueryParamsType>>) =>{
      state.AttendanceParams = {...state.AttendanceParams,...action.payload};
    },
    setUserGroupParams :(state ,action : PayloadAction<Partial<QueryParamsType>>) =>{
      state.UserGroupParams = {...state.UserGroupParams,...action.payload};
    },
    resetSalesParams: (state) => { 
      state.SalesParams = initParams(); 
    },
  },
});

export const {
  setSalesParams,
  setDictionaryParams,
  setAttendanceParams,
  setUserGroupParams,
  resetSalesParams,
} = Paramsslice.actions;

export default Paramsslice.reducer;