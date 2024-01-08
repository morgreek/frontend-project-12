import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth.js'

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  // доделать
  // return auth.user ? children : <Navigate to={appPaths.login} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFoundPage/>}/>
      <Route path="/" element={<App/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  </BrowserRouter>
);
// Добавить роут
// <Route path="/mainpage" element={<ProtectedRoute><MainPage /><ProtectedRoute/>}/>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
