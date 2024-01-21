import React from 'react';
import MainPage from './pages/MainPage/MainPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import { AuthorizationContextProvider } from './context/AuthorizationContext.js';

function App() {
  return (
    <AuthorizationContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route element={<MainPage/>} path="/" exact/>
          </Route>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter> 
    </AuthorizationContextProvider>
  );
}

export default App;
