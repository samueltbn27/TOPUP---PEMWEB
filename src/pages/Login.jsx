import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      alert(res.data.message);

      console.log('res role', res.data)

      // Simpan status login dan data user
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', res.data.role);
      localStorage.setItem('userName', res.data.name);

      setIsLoggedIn(true);

      window.location.reload();
    } catch (err) {
      alert('Login gagal: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1B0B2B] text-white">
      <form onSubmit={handleLogin} className="bg-[#3C1F42] p-6 rounded-xl space-y-4 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-[#280031] text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-[#280031] text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="bg-purple-600 hover:bg-purple-700 p-2 rounded w-full">
          Login
        </button>
      </form>
    </main>
  );
}
