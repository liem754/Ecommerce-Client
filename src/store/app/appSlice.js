import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
export const appSlice = createSlice({
    name: "app",
    initialState: {
        category: null,
        isLoading: false,
        isShow: false,
    },
    reducers: {
        show: (state, action) => {
            state.isShow = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(actions.getCategory.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.category = action.payload;
        });

        builder.addCase(actions.getCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});
export const { show } = appSlice.actions;

export default appSlice.reducer;
