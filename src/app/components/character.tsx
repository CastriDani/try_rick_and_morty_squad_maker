"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Character as CharacterType } from "../types/character";
import { useFavoriteStore } from "../store/favoriteStore";

interface CharacterProps {
  character: CharacterType;
}

function Character({ character }: CharacterProps) {
  const router = useRouter();
  const isFavorite = useFavoriteStore((state) => state.isFavorite(character.id));
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  const handleCardClick = () => {
    router.push(`/character/${character.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    toggleFavorite(character);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 hover:from-green-500 hover:to-emerald-600 transition-all duration-300 relative cursor-pointer"
    >
      <button
        onClick={handleFavoriteClick}
        className="cursor-pointer absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        aria-label="Toggle favorite"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill={isFavorite ? "red" : "none"}
          viewBox="0 0 24 24"
          stroke={isFavorite ? "red" : "currentColor"}
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      
      <Image 
        src={character.image} 
        alt={character.name} 
        width={300} 
        height={300} 
        className="w-full h-64 object-cover" 
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center ">{character.name}</h2>
      </div>
    </div>
  );
}

export default Character;
