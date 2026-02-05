import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Character } from '../types/character';

interface FavoriteStore {
  favorites: Character[];
  notification: { show: boolean; message: string } | null;
  addFavorite: (character: Character) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (character: Character) => void;
  showNotification: (message: string) => void;
  hideNotification: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      notification: null,
      
      addFavorite: (character) => {
        set((state) => ({
          favorites: [...state.favorites, character],
        }));
        get().showNotification('Added to Squad!');
      },
      
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((char) => char.id !== id),
        })),
      
      isFavorite: (id) => get().favorites.some((char) => char.id === id),
      
      toggleFavorite: (character) => {
        const state = get();
        if (state.isFavorite(character.id)) {
          state.removeFavorite(character.id);
        } else {
          state.addFavorite(character);
        }
      },
      
      showNotification: (message) => {
        set({ notification: { show: true, message } });
        setTimeout(() => {
          get().hideNotification();
        }, 2000);
      },
      
      hideNotification: () => set({ notification: null }),
    }),
    {
      name: 'rick-morty-favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
