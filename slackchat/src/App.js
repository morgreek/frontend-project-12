import { ErrorBoundary, Provider } from "@rollbar/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavigationBar from "./components/NavigationBar.jsx";
import rollbarConfig from "./configs/rollbar";
import { AuthorizationContextProvider } from "./context/AuthorizationContext.js";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthorizationContextProvider>
        <BrowserRouter>
          <div className="d-flex flex-column vh-100">
            <NavigationBar />
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route element={<MainPage />} exact path="/" />
              </Route>
              <Route element={<LoginPage />} path="/login" />
              <Route element={<RegisterPage />} path="/signup" />
              <Route element={<NotFoundPage />} path="*" />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthorizationContextProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
