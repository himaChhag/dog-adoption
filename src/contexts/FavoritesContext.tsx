import React, { createContext, useContext, useState } from "react";

import { FavoritesContextType, FavoritesProviderProps } from "../types";

// Create a context with a default value
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (dogId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(dogId)) {
        return prevFavorites.filter((id) => id !== dogId); // Remove from favorites
      } else {
        return [...prevFavorites, dogId]; // Add to favorites
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the FavoritesContext
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
