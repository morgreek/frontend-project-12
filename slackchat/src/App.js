import { ErrorBoundary, Provider } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
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

const App = ({ i18n, socket }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthorizationContextProvider>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <div className="d-flex flex-column vh-100">
              <NavigationBar />
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route element={<MainPage socket={socket} />} exact path={routes.chat} />
                </Route>
                <Route element={<LoginPage />} path={routes.login} />
                <Route element={<RegisterPage />} path={routes.signUp} />
                <Route element={<NotFoundPage />} path="*" />
              </Routes>
            </div>
          </BrowserRouter>
        </I18nextProvider>
      </AuthorizationContextProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
