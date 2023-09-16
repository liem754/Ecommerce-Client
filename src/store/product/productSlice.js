import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
export const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null,
        isLoading: false,
        data: null,
    },
    reducers: {
        Update: (state, action) => {
            state.data = action.payload.data;
        },
    },
    extraReducers: builder => {
        builder.addCase(actions.getProduct.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(actions.getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
        });

        builder.addCase(actions.getProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});
export const { Update } = productSlice.actions;

export default productSlice.reducer;
