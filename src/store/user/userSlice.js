import { createSlice } from "@reduxjs/toolkit";
import { getCurrent } from "./asyncActions";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedin: false,
        current: null,
        token: null,
        isLoading: false,
        isUpdate: false,
        idCurrent: null,
        data: null,
    },
    reducers: {
        register: (state, action) => {
            state.isLoggedin = action.payload.isLoggedin;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLoggedin = false;
            state.token = null;
        },
        update: (state, action) => {
            state.isUpdate = action.payload.isUpdate;
        },
        IdCurrent: (state, action) => {
            state.idCurrent = action.payload.idCurrent;
            state.data = action.payload.data;
        },
    },
    // extraReducers: builder => {
    //     builder.addCase(getCurrent.pending, state => {
    //         state.isLoading = true;
    //     });

    //     builder.addCase(getCurrent.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.current = action.payload;
    //         console.log(action.payload);
    //     });

    //     builder.addCase(getCurrent.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.errorMessage = action.payload.message;
    //     });
    // },
});

export const { register, logout, update, IdCurrent } = userSlice.actions;

export default userSlice.reducer;
