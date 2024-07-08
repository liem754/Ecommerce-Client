import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
    Public,
    Home,
    Login,
    Collection,
    DetailProduct,
    Blogs,
    FinalRegister,
    ResetPassword,
    Contact,
    Introduce,
    DetailBlog,
} from "./pages/public";

import { path } from "./ultils/paths";
import { getCategory } from "./store/app/asyncActions";
import {
    AdminLayout,
    CreateBlog,
    CreateProduct,
    DashBoard,
    ManagerBlog,
    ManagerOrder,
    ManagerProduct,
    ManagerUser,
} from "pages/admin";
import { Cart, Checkout, EditUser, History, MenberLayout } from "pages/menber";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategory());
    }, []);
    return (
        <div className="font-main h-screen">
            <Routes>
                <Route path={path.CHECKOUT} element={<Checkout />} />
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />

                    <Route
                        path={path.DETAIL_PRODUCT}
                        element={<DetailProduct />}
                    />
                    <Route path={path.COLECTIONS} element={<Collection />} />
                    <Route path={path.INTRODUCE} element={<Introduce />} />

                    <Route path={path.BLOG} element={<Blogs />} />
                    <Route path={`${path.BLOGDE}`} element={<Blogs />}></Route>

                    <Route path={`${path.BLOGID}`} element={<DetailBlog />} />
                    <Route path={path.CONTACT} element={<Contact />} />
                    <Route
                        path={path.RESET_PASSWORD}
                        element={<ResetPassword />}
                    />
                </Route>
                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
                <Route path={`/${path.ADMIN}`} element={<AdminLayout />}>
                    <Route
                        path={`${path.CREATE_PRODUCT}`}
                        element={<CreateProduct />}
                    />
                    <Route path={`${path.DASHBOARD}`} element={<DashBoard />} />
                    <Route
                        path={`${path.MANAGER_ORDER}`}
                        element={<ManagerOrder />}
                    />
                    <Route
                        path={`${path.MANAGER_BLOG}`}
                        element={<ManagerBlog />}
                    />
                    <Route
                        path={`${path.CREATE_BLOG}`}
                        element={<CreateBlog />}
                    />
                    <Route
                        path={`${path.MANAGER_PRODUCT}`}
                        element={<ManagerProduct />}
                    />
                    <Route
                        path={`${path.MANAGER_USER}`}
                        element={<ManagerUser />}
                    />
                </Route>
                <Route path={path.MENBER_LAYOUT} element={<MenberLayout />}>
                    <Route path={path.CART} element={<Cart />} />
                    <Route path={path.HISTORY} element={<History />} />

                    <Route path={path.EDIT_USER} element={<EditUser />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
