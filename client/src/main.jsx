import React from "react";
import ReactDOM from "react-dom/client";
import {
    RouterProvider,
} from 'react-router-dom';
import { router } from './router';
import  "./index.css";
import { AuthWrapper } from "./contexts/AuthWrapper";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthWrapper>
        <RouterProvider router={router} />
    </AuthWrapper>
);