import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Loading from "../Pages/components/Loading";
import useAdminAuth from "../hooks/useAdminAuth";

const Login = lazy(() => import('../Pages/Admin/Login'))
const Dashboard = lazy(() => import('../Pages/Admin/Dashboard'))

const AdminList = lazy(() => import('../Pages/Admin/Admin/AdminList'))
const AdminNew = lazy(() => import('../Pages/Admin/Admin/AdminNew'))
const AdminShow = lazy(() => import('../Pages/Admin/Admin/AdminShow'))
const AdminEdit = lazy(() => import('../Pages/Admin/Admin/AdminEdit'))

const CategoryList = lazy(() => import('../Pages/Admin/Category/CategoryList'))
const CategoryNew = lazy(() => import('../Pages/Admin/Category/CategoryNew'))
const CategoryShow = lazy(() => import('../Pages/Admin/Category/CategoryShow'))
const CategoryEdit = lazy(() => import('../Pages/Admin/Category/CategoryEdit'))

const NotFound = lazy(() => import('../Pages/NotFound/NotFound'))
const Layout = lazy(() => import('../Pages/Admin/Layout'))

const theme = createTheme({
    palette: {
        primary: {
            main: '#435eb8',
        },
        info: {
            main: '#696969',
        },
    },
    typography: {
        fontFamily: [
            'Noto Sans JP',
        ].join(','),
    },
});

const AdminRoutes: React.FC = () => {
    const { adminStatus, fetchAdmin } = useAdminAuth();
    const [authChecked, setAuthChecked] = useState(false);
    useEffect(() => {
        const init = async () => {
            // ログイン中か判定
            await fetchAdmin();
            return setAuthChecked(true);
        };
        init();
    }, []);


    const RouteAuthGuard: React.FC = () => {
        //ログイン状態の確認が完了していればログインチェックさせる
        if (authChecked) {
            return adminStatus() ? <Outlet /> : <Navigate to="admin/login" replace />;
        } else {
            return <></>;
        }
    };

    return (
        <Suspense fallback={<Loading />}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="admin/login" element={adminStatus() ? <Navigate to="/admin" /> : <Login />} />
                    <Route element={<RouteAuthGuard />}>
                        <Route element={<Layout />}>
                            <Route path="admin" element={<Dashboard />} />
                            <Route path="admin/admin" element={<AdminList />} />
                            <Route path="admin/admin/new" element={<AdminNew />} />
                            <Route path="admin/admin/:id" element={<AdminShow />} />
                            <Route path="admin/admin/edit/:id" element={<AdminEdit />} />

                            <Route path="admin/category" element={<CategoryList />} />
                            <Route path="admin/category/new" element={<CategoryNew />} />
                            <Route path="admin/category/:id" element={<CategoryShow />} />
                            <Route path="admin/category/edit/:id" element={<CategoryEdit />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ThemeProvider>
        </Suspense>
    )
}

export default AdminRoutes