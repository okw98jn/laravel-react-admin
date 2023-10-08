import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Loading from "../Pages/components/Loading";

const Login = lazy(() => import('../Pages/Admin/Login'))
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
    return (
        <>
            <Suspense fallback={<Loading />}>
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route element={<Layout />}>
                            <Route path="admin/admin" element={<AdminList />} />
                            <Route path="admin/admin/new" element={<AdminNew />} />
                            <Route path="admin/admin/:id" element={<AdminShow />} />
                            <Route path="admin/admin/edit/:id" element={<AdminEdit />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ThemeProvider>
            </Suspense>
        </>
    )
}

export default AdminRoutes