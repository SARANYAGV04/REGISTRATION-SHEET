import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import SignIn from './components/SignInForm';
import Users from './components/Users';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home */}
      </Routes>
    </Router>
  );
};

export default App;
