import { ErrorBoundary, Provider } from '@rollbar/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavigationBar from './components/NavigationBar.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import rollbarConfig from './configs/rollbar';
import { AuthorizationContextProvider } from './context/AuthorizationContext.js';
import LoginPage from './pages/LoginPage.jsx';
import MainPage from './pages/MainPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import routes from './routes.js';

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthorizationContextProvider>
        <BrowserRouter>
          <div className="d-flex flex-column vh-100">
            <NavigationBar />
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route element={<MainPage />} exact path={routes.chat} />
              </Route>
              <Route element={<LoginPage />} path={routes.login} />
              <Route element={<RegisterPage />} path={routes.signUp} />
              <Route element={<NotFoundPage />} path="*" />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthorizationContextProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
