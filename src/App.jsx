import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import GameDetail from './pages/GameDetail'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole') || '';
    console.log('roleeeeee', role)
    setIsLoggedIn(loggedIn);
    setUserRole(role);

  }, []);

  console.log('isLoggedIn', isLoggedIn)
  console.log('userRole', userRole)
  if (isLoggedIn === null) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="bg-[#280031] min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={
            isLoggedIn
              ? userRole === 'admin'
                ? <Navigate to="/dashboard" />
                : <Navigate to="/home" />
              : <LoginPage setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
          } />
          <Route path="/home" element={
            isLoggedIn && userRole === 'user'
              ? <HomePage setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
              : <Navigate to="/" />
          } />
          <Route path="/dashboard" element={
            isLoggedIn && userRole === 'admin'
              ? <DashboardPage setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
              : <Navigate to="/" />
          } />

          <Route path="/game/:id" element={
              isLoggedIn && userRole === 'user'
                ? <GameDetail />
                : <Navigate to="/" />
            } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
