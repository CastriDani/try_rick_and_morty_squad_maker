"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Character } from "../../types/character";
import { useFavoriteStore } from "../../store/favoriteStore";

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  
  const isFavorite = useFavoriteStore((state) => 
    character ? state.isFavorite(character.id) : false
  );
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${params.id}`
        );

        if (!response.ok) {
          router.push("/");
          return;
        }

        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error("Error fetching character:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchCharacter();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <p className="text-2xl text-green-400">Loading...</p>
      </div>
    );
  }

  if (!character) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 drop-shadow-[0_2px_4px_rgba(34,197,94,0.5)]">
          Rick and Morty
        </h1>

        
        <button
          onClick={() => router.push("/")}
          className="mb-6 px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-500 hover:to-emerald-600 transition-all flex items-center gap-2 shadow-lg border-2 border-green-300/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <Image
                src={character.image}
                alt={character.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleFavorite(character)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                aria-label="Toggle favorite"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
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
            </div>

            <div className="md:w-1/2 p-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center md:text-left">
                {character.name}
              </h2>

              <div className="space-y-5">
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Status
                  </h3>
                  <p className="text-xl text-gray-800 flex items-center gap-2 font-semibold">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        character.status === "Alive"
                          ? "bg-green-500"
                          : character.status === "Dead"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    />
                    {character.status}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Species
                  </h3>
                  <p className="text-xl text-gray-800 font-semibold">{character.species}</p>
                </div>

                {character.type && (
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Type
                    </h3>
                    <p className="text-xl text-gray-800 font-semibold">{character.type}</p>
                  </div>
                )}

                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Gender
                  </h3>
                  <p className="text-xl text-gray-800 font-semibold">{character.gender}</p>
                </div>

                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Origin
                  </h3>
                  <p className="text-xl text-gray-800 font-semibold">
                    {character.origin.name}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Last known location
                  </h3>
                  <p className="text-xl text-gray-800 font-semibold">
                    {character.location.name}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Episodes
                  </h3>
                  <p className="text-xl text-gray-800 font-semibold">
                    {character.episode.length} episodes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
