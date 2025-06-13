import { useEffect, useState } from "react";
import axios from "axios";
// src/pages/Home.jsx
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BannerCarousel from "../components/BannerCarousel";

export default function HomePage({ setIsLoggedIn, setUserRole  }) {

  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/games");
        setGames(res.data);

        console.log('res.data',res )
      } catch (err) {
        console.error("Gagal mengambil data game:", err);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
        <Navbar setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
        <BannerCarousel />
        <main className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6 text-[#EAE8F7]">Pilih Game Kamu</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
            </div>
        </main>
        <Footer/>
    </>
  );
}
