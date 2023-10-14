import { createSlice } from "@reduxjs/toolkit";
export const globalSlice = createSlice({
    name: "global",
    initialState: {
        category: null,
        isLoading: false,
        show: false,
    },
    reducers: {
        // setShow: (state, action) => {
        //     state.show = action.payload.show;
        // },
    },
    // extraReducers: builder => {
    //     builder.addCase(actions.getCategory.pending, state => {
    //         state.isLoading = true;
    //     });

    //     builder.addCase(actions.getCategory.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.category = action.payload;
    //     });

    //     builder.addCase(actions.getCategory.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.errorMessage = action.payload.message;
    //     });
    // },
});
// export const { setShow } = globalSlice.actions;

export default globalSlice.reducer;
