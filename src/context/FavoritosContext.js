import React, { createContext, useState } from 'react';

export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (cafe) => {
    setFavoritos((prev) => {
      const existe = prev.find((item) => item.id === cafe.id);
      if (existe) {
        return prev.filter((item) => item.id !== cafe.id);
      } else {
        return [...prev, cafe];
      }
    });
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};
