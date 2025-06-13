import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function DashboardPage({ setIsLoggedIn, setUserRole }) {
  const [games, setGames] = useState([]);
  const [topups, setTopups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newGame, setNewGame] = useState({ name: "", imageUrl: "" });
  const [editingGame, setEditingGame] = useState(null); 



  const fetchGames = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/games");
      setGames(res.data);
    } catch (err) {
      console.error("Gagal mengambil data game:", err);
    }
  };

  const fetchTopups = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/topups");
      console.log('res top', res)
      setTopups(res.data);
    } catch (err) {
      console.error("Gagal mengambil data topup:", err);
    }
  };

  const handleDeleteGame = async (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus game ini?");
    if (!confirmed) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/games/${id}`);
      fetchGames(); // refresh daftar game
    } catch (err) {
      console.error("Gagal menghapus game:", err);
    }
  };

  const imageInputRef = useRef(null);
  

  useEffect(() => {
    fetchGames();
    fetchTopups();
  }, []);

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
      <main className="max-w-6xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* === MANAJEMEN GAME === */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Manajemen Game</h2>
            <button
  onClick={() => setShowForm(true)}
  className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
>
  + Tambah Game
</button>

          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left bg-[#421B56] rounded-lg">
              <thead>
                <tr className="text-[#EAE8F7] border-b border-purple-700">
                  <th className="p-3">ID</th>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Gambar</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.id} className="border-t border-purple-700">
                    <td className="p-3">{game.id}</td>
                    <td className="p-3">{game.name}</td>
                    <td className="p-3">
                      <img src={`http://localhost:5000/images/${game.imageUrl}`} alt={game.name} className="w-20 h-12 object-cover rounded" />
                    </td>
                    <td className="p-3 space-x-2">
                    <button
  onClick={() => {
    setEditingGame(game);   
    setNewGame({ name: game.name, imageUrl: game.imageUrl }); 
    setShowForm(true);
  }}
  className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
>
  Edit
</button>

                      <button
  onClick={() => handleDeleteGame(game.id)}
  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
>
  Hapus
</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {showForm && (
  <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
    <div className="bg-[#2C1236] p-6 rounded-lg w-full max-w-md shadow-lg">
    <h3 className="text-xl font-semibold text-white mb-4">
  {editingGame ? "Edit Game" : "Tambah Game Baru"}
</h3>
      <label className="block text-white mb-2">
        Nama Game:
        <input
          type="text"
          className="w-full p-2 mt-1 rounded bg-[#4C2A5F] text-white"
          value={newGame.name}
          onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
        />
      </label>

      <label className="block text-white mb-4">
        Gambar:
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          className="w-full p-2 mt-1 rounded bg-[#4C2A5F] text-white"
        />
      </label>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
        >
          Batal
        </button>

        <button
       onClick={async () => {
        try {
          const formData = new FormData();
          formData.append("name", newGame.name);
          if (imageInputRef.current?.files[0]) {
            formData.append("image", imageInputRef.current.files[0]);
          }
      
          if (editingGame) {
            // mode edit
            await axios.put(
              `http://localhost:5000/api/games/${editingGame.id}`,
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );
          } else {
            // mode tambah
            await axios.post("http://localhost:5000/api/games/add", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
      
          setShowForm(false);
          setNewGame({ name: "", imageUrl: "" });
          setEditingGame(null);
          fetchGames();
        } catch (err) {
          console.error("Gagal menyimpan game:", err);
        }
      }}
      
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
)}


        {/* === RIWAYAT TOP UP === */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Riwayat Top Up</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left bg-[#421B56] rounded-lg">
              <thead>
                <tr className="text-[#EAE8F7] border-b border-purple-700">
                  <th className="p-3">Game</th>
                  <th className="p-3">User ID</th>
                  <th className="p-3">Zone ID</th>
                  <th className="p-3">Nominal</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">HP</th>
                  <th className="p-3">Metode</th>
                </tr>
              </thead>
              <tbody>
                {topups.map((topup, index) => (
                  <tr key={index} className="border-t border-purple-700">
                    <td className="p-3">{topup?.Game?.name || 'Game telah dihapus'}</td>
                    <td className="p-3">{topup.user_id}</td>
                    <td className="p-3">{topup.zone_id}</td>
                    <td className="p-3">Rp {topup.nominal}</td>
                    <td className="p-3">{topup.email}</td>
                    <td className="p-3">{topup.phone}</td>
                    <td className="p-3">{topup.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
