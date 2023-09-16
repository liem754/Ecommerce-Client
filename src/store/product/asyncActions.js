import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
export const getProduct = createAsyncThunk(
    "product/product",
    async (pid, { rejectWithValue }) => {
        const response = await apis.apiGetProdcut(pid);
        if (!response.success) return rejectWithValue(response);
        return response.productData;
    },
);
