"use client";

import Image from "next/image";
import { useFavoriteStore } from "../store/favoriteStore";

interface SquadProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

function Squad({ isOpen = true, onClose, isMobile = false }: SquadProps) {
  const favorites = useFavoriteStore((state) => state.favorites);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  if (isMobile && !isOpen) return null;

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={`
        ${isMobile ? 'fixed top-0 left-0 h-full z-50 transform transition-transform duration-300' : ''}
        ${isMobile && isOpen ? 'translate-x-0' : ''}
        ${isMobile && !isOpen ? '-translate-x-full' : ''}
        w-80 bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-lg shadow-2xl border-2 border-green-400/30
      `}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 text-center flex-1">Squad</h2>
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 lg:hidden"
              aria-label="Close squad"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      
      {favorites.length === 0 ? (
        <p className="text-gray-400 text-center">No characters in your squad yet</p>
      ) : (
        <div className="space-y-4">
          {favorites.map((character) => (
            <div
              key={character.id}
              className="flex items-center gap-3 bg-slate-700/80 p-3 rounded-lg hover:bg-slate-600 transition-all hover:border-green-400/50 border-2 border-transparent"
            >
              <Image
                src={character.image}
                alt={character.name}
                width={50}
                height={50}
                className="rounded-full border-2 border-gray-500"
              />
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{character.name}</p>
                <p className="text-gray-400 text-xs">{character.species}</p>
              </div>
              <button
                onClick={() => removeFavorite(character.id)}
                className="text-red-400 hover:text-red-500 transition-colors"
                aria-label="Remove from squad"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
}

export default Squad;
