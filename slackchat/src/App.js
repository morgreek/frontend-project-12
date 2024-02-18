import React from 'react';
import MainPage from './pages/MainPage/MainPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import { AuthorizationContextProvider } from './context/AuthorizationContext.js';
import NavigationBar from './components/NavigationBar.jsx';

import { Provider, ErrorBoundary } from '@rollbar/react';
import rollbarConfig from './configs/rollbar';

function TestError() {
  const a = null
  return a.hello()
}

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        <AuthorizationContextProvider>
          <BrowserRouter>
            <div className="d-flex flex-column vh-100">
              <NavigationBar></NavigationBar>
              <Routes>
                <Route element={<PrivateRoutes/>}>
                  <Route element={<MainPage/>} path="/" exact/>
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<RegisterPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
              </Routes>
            </div>
          </BrowserRouter> 
        </AuthorizationContextProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
