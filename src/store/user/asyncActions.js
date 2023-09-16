import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
// export const getRegister = createAsyncThunk(
//     "user/signup",
//     async (data, { rejectWithValue }) => {
//         const response = await apis.apiRegister(data);
//         if (!response.sucess) return rejectWithValue(response);
//         return response;
//     },
// );
// export const getLogin = createAsyncThunk(
//     "user/signin",
//     async (data, { rejectWithValue }) => {
//         const response = await apis.apiLogin(data);
//         if (!response.sucess) return rejectWithValue(response);
//         return response;
//     },
// );
export const getCurrent = createAsyncThunk(
    "user/current",
    async (data, { rejectWithValue }) => {
        const response = await apis.apiCurrent();

        if (!response.sucess) return rejectWithValue(response);
        return response.rs;
    },
);
//
