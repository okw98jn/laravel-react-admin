import React, { useEffect } from "react";
import { RecoilRoot, } from 'recoil';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import { AdminRoutes } from "./router";
import "./css/app.scss";
import "./css/index.css";
import { CustomSnackbar } from "./Pages/components/CustomSnackbar";
import { AxiosClientProvider } from "./Axios/AxiosClientProvider";
export const App: React.FC = () => {
    useEffect(() => {
        import('preline');
    }, []);
    return (
        <RecoilRoot>
            <BrowserRouter>
                <AxiosClientProvider>
                    <AdminRoutes />
                </AxiosClientProvider>
            </BrowserRouter>
            <CustomSnackbar />
        </RecoilRoot>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);