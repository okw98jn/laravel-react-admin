import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "../Pages/components/Loading";

const AdminList  = lazy(() => import('../Pages/Admin/Admin/AdminList'))
const AdminNew   = lazy(() => import('../Pages/Admin/Admin/AdminNew'))
const AdminShow  = lazy(() => import('../Pages/Admin/Admin/AdminShow'))
const NotFound   = lazy(() => import('../Pages/NotFound/NotFound'))
const Layout     = lazy(() => import('../Pages/Admin/Layout'))

const AdminRoutes: React.FC = () => {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="admin/admin" element={<AdminList />} />
                        <Route path="admin/admin/new" element={<AdminNew />} />
                        <Route path="admin/admin/:id" element={<AdminShow />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    )
}

export default AdminRoutes