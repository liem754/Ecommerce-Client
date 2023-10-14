import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import productSlice from "./product/productSlice";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import globalSlice from "./global/globalSlice";
const commonConfig = {
    key: "shop/user",
    storage,
};
const userConfig = {
    ...commonConfig,
    whitelist: ["isLoggedin", "token", "cart"],
};
export const store = configureStore({
    reducer: {
        appReducer: appSlice,
        product: productSlice,
        user: persistReducer(userConfig, userSlice),
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export const persistor = persistStore(store);
