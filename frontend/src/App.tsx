import React from "react";
import { RecoilRoot, } from 'recoil';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import { AdminRoutes } from "./router";
import "./css/app.scss";
import "./css/index.css";
import { CustomSnackbar } from "./Pages/components/CustomSnackbar";

export const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AdminRoutes />
      </BrowserRouter>
      <CustomSnackbar />
    </RecoilRoot>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);