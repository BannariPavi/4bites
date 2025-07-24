import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Feed from './Feed';
import Invites from './Invites';
import PlateHistory from './PlateHistory';
import PaymentPage from './PaymentPage';
import MyEvents from './MyEvents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/invites" element={<Invites />} />
        <Route path="/history" element={<PlateHistory />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/myevents" element={<MyEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
