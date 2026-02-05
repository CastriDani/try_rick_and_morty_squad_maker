"use client";

import { useState } from "react";
import CharacterList from "./components/characterList";
import Squad from "./components/Squad";
import { useFavoriteStore } from "./store/favoriteStore";

export default function App() {
  const [isSquadOpen, setIsSquadOpen] = useState(false);
  const favorites = useFavoriteStore((state) => state.favorites);
  const notification = useFavoriteStore((state) => state.notification);

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {notification?.show && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce border-2 border-green-300">
          {notification.message}
        </div>
      )}

      <button
        onClick={() => setIsSquadOpen(true)}
        className="fixed bottom-6 right-6 z-30 lg:hidden bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-full shadow-xl hover:from-green-500 hover:to-emerald-600 transition-all border-2 border-green-300"
        aria-label="Open squad"
      >
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-lg">
              {favorites.length}
            </span>
          )}
        </div>
      </button>
      
      <div className="flex gap-6 justify-center">
        <div className="hidden lg:block flex-shrink-0">
          <Squad />
        </div>

        <Squad 
          isOpen={isSquadOpen} 
          onClose={() => setIsSquadOpen(false)} 
          isMobile={true}
        />
        
        <div className="flex-1 max-w-7xl">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 drop-shadow-[0_2px_4px_rgba(34,197,94,0.5)]">
            Rick and Morty
          </h1>
          <CharacterList />
        </div>
      </div>
    </div>
  );
}
