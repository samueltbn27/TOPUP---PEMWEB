// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Navbar({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();

  const promos = [
    "Website top-up terbesar",
    "Transaksi tercepat dan aman",
    "Top-up terpercaya sejak 2020",
    "Pembelian kredit game & entertainment",
    "Diskon dan promo menarik setiap hari",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [promos.length]);


  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('userRole'); 
    localStorage.removeItem('userName'); 
    setIsLoggedIn(false); 
    setUserRole('');
    navigate('/'); 
  };
  
  

  return (
    <nav className="bg-[#3C1F42] px-6 py-4 text-white flex justify-between">
      <div className="flex items-center gap-10">
      <h1 className="text-2xl font-bold">MuelTopUp</h1>
      <p className="text-md sm:text-base text-white transition-opacity duration-500">
          {promos[currentIndex]}
      </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
      >
        Logout
      </button>
    </nav>
  );
}
