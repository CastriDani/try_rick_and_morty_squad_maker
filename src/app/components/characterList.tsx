"use client";

import { useEffect, useState } from "react";
import Character from "./character";
import SearchInput from "./SearchInput";
import NavPage from "./NavPage";
import { Character as CharacterType, ApiResponse } from "../types/character";

function CharacterList() {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [search, setSearch] = useState(""); 
  const [page, setPage] = useState(1); 

  useEffect(() => {
  async function fetchData() {
    try {
      const url = new URL("https://rickandmortyapi.com/api/character");
      
      if (search) {
        url.searchParams.append("name", search);
      }
      url.searchParams.append("page", page.toString());

      const response = await fetch(url.toString());

      if (!response.ok) {
        setCharacters([]); 
        return;
      }

      const data: ApiResponse = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
    }
  }

  fetchData();
}, [search, page]);

  const handleSearch = () => {
    setSearch(searchTerm); 
    setPage(1);
  };

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };


  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-center mb-8">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          placeholder="Search characters..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </div>
      <NavPage page={page} onNextPage={handleNextPage} onPrevPage={handlePrevPage} />
    </div>
  );
}

export default CharacterList;
