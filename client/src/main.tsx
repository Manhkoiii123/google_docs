import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/index.tsx";
import { AuthProvider } from "./contexts/auth-context.tsx";
import { ToastProvider } from "./contexts/toast-context.tsx";
import Register from "./pages/register/index.tsx";
import VerifyEmail from "./pages/user/verify-email.tsx";
import Create from "./pages/document/create.tsx";
import AuthRoute from "./components/molecules/auth-route/auth-route.tsx";
import { DocumentProvider } from "./contexts/document-context.tsx";
import Document from "./pages/document/index.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<h1>I am Home Page</h1>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/verify-email/:token" element={<VerifyEmail />} />
            <Route
              path="/document/create"
              element={<AuthRoute element={<Create />} />}
            />
            <Route
              path="/document/:id"
              element={
                <AuthRoute
                  element={
                    <DocumentProvider>
                      {/* <EditorProvider> */}
                      <Document />
                      {/* </EditorProvider> */}
                    </DocumentProvider>
                  }
                />
              }
            />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
