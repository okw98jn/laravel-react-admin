import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Loading from "../Pages/components/Loading";
import { useAdminState } from "../Recoil/Admin/auth";

const Login = lazy(() => import('../Pages/Admin/Login'))
const Dashboard = lazy(() => import('../Pages/Admin/Dashboard'))
const AdminList = lazy(() => import('../Pages/Admin/Admin/AdminList'))
const AdminNew = lazy(() => import('../Pages/Admin/Admin/AdminNew'))
const AdminShow = lazy(() => import('../Pages/Admin/Admin/AdminShow'))
const AdminEdit = lazy(() => import('../Pages/Admin/Admin/AdminEdit'))
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
    const authAdmin = localStorage.getItem("authAdmin");
    const { setAdmin } = useAdminState();
    useEffect(() => {
        authAdmin && setAdmin(JSON.parse(authAdmin));
    }, [setAdmin, authAdmin]);

    const isLoggedIn = () => {
        return authAdmin !== null;
    };

    const RouteAuthGuard: React.FC = () => {
        return isLoggedIn() ? <Outlet /> : <Navigate to="admin/login" replace />;
    };

    return (
        <Suspense fallback={<Loading />}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="admin/login" element={isLoggedIn() ? <Navigate to="/admin" /> : <Login />} />
                    <Route element={<RouteAuthGuard />}>
                        <Route element={<Layout />}>
                            <Route path="admin" element={<Dashboard />} />
                            <Route path="admin/admin" element={<AdminList />} />
                            <Route path="admin/admin/new" element={<AdminNew />} />
                            <Route path="admin/admin/:id" element={<AdminShow />} />
                            <Route path="admin/admin/edit/:id" element={<AdminEdit />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ThemeProvider>
        </Suspense>
    )
}

export default AdminRoutes