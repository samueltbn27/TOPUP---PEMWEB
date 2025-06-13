import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Navbar from "../components/Navbar";
import axios from "axios";

export default function GameDetail() {
    const navigate = useNavigate()

    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [userId, setUserId] = useState('');
    const [zoneId, setZoneId] = useState('');
    const [nominal, setNominal] = useState('10000');
    const [payment, setPayment] = useState('gopay');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
    const fetchGame = async () => {
        try {
        const res = await axios.get(`http://localhost:5000/api/games/${id}`);
        setGame(res.data);
        } catch (err) {
        console.error("Gagal mengambil detail game:", err);
        }
    };

    fetchGame();
    }, [id]);

    const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    };

    const handleConfirm = async () => {
    try {
        await axios.post('http://localhost:5000/api/topup', {
        game_id: id,
        user_id: userId,
        zone_id: zoneId,
        nominal,
        payment,
        email,
        phone
        });
        alert('Top up berhasil!');
        setShowModal(false);
      // Reset form
      setUserId('');
      setZoneId('');
      setNominal('10000');
      setPayment('gopay');
      setEmail('');
      setPhone('');
      navigate('/');
    } catch (error) {
      console.error("Gagal melakukan topup:", error);
      alert('Top up gagal!');
    }
  };

  if (!game) return <div className="text-white p-6">Loading...</div>;

  return (
    <>
     <Navbar />

    <main className="max-w-3xl mx-auto p-6 text-[#EAE8F7]">
      <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
      <img
        src={`http://localhost:5000/images/${game.imageUrl}`}
        alt={game.name}
        className="rounded-xl mb-6 w-full    h-64 object-cover"
      />
      <button
  onClick={() => navigate(-1)}
  className="mb-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
>
  ← Kembali
</button>

      <form onSubmit={handleSubmit} className="bg-[#3C1F42] p-6 rounded-xl space-y-4">
        <div>
          <label className="block mb-1">User ID</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-[#280031] text-[#EAE8F7]"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Zone ID</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-[#280031] text-[#EAE8F7]"
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Nominal Top Up</label>
          <select
            className="w-full p-2 rounded bg-[#280031] text-[#EAE8F7]"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
          >
            <option value="10000">10.000</option>
            <option value="20000">20.000</option>
            <option value="50000">50.000</option>
            <option value="100000">100.000</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Metode Pembayaran</label>
          <select
            className="w-full p-2 rounded bg-[#280031] text-[#EAE8F7]"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="gopay">GoPay</option>
            <option value="dana">DANA</option>
            <option value="ovo">OVO</option>
            <option value="bca">Transfer BCA</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-[#280031] text-[#EAE8F7]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Nomor HP</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-[#280031] text-[#EAE8F7]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 p-2 rounded text-white font-bold w-full"
        >
          Top Up Sekarang
        </button>
      </form>

      {/* MODAL KONFIRMASI */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-[#3C1F42] p-6 rounded-xl w-full max-w-md text-[#EAE8F7]">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Top Up</h2>
            <ul className="space-y-2 mb-4">
              <li><strong>Game:</strong> {game.name}</li>
              <li><strong>User ID:</strong> {userId}</li>
              <li><strong>Zone ID:</strong> {zoneId}</li>
              <li><strong>Nominal:</strong> {nominal}</li>
              <li><strong>Metode Pembayaran:</strong> {payment}</li>
              <li><strong>Email:</strong> {email}</li>
              <li><strong>No HP:</strong> {phone}</li>
            </ul>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="bg-gray-600 px-4 py-2 rounded">Batal</button>
              <button onClick={handleConfirm} className="bg-green-600 px-4 py-2 rounded">Konfirmasi</button>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
    
  );
}
