import { useNavigate } from "react-router-dom";

export default function GameCard({ game }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/game/${game.id}`)}
      className="bg-[#3C1F42] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
    >
      <div className="w-full h-40 md:h-48 lg:h-56 overflow-hidden">
      <img
        src={`http://localhost:5000/images/${game.imageUrl}`}
        alt={game.name}
        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-140"
      />
      </div>
      <div className="p-3 text-center text-[#EAE8F7] font-medium">
        {game.name}
      </div>
    </div>
  );
}
