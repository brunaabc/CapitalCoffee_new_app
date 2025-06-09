import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { getUserFavorites, addFavorite, removeFavorite } from '../services/firebaseFavorites';

export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const favoritosSalvos = await getUserFavorites(user.uid);
        setFavoritos(favoritosSalvos);
      } else {
        setUserId(null);
        setFavoritos([]);
      }
    });

    return unsubscribe;
  }, []);

  const toggleFavorito = async (cafe) => {
    if (!userId) return;

    const jaFavoritado = favoritos.some((item) => item.id === cafe.id);

    if (jaFavoritado) {
      await removeFavorite(userId, cafe.id);
      setFavoritos((prev) => prev.filter((item) => item.id !== cafe.id));
    } else {
      await addFavorite(userId, cafe);
      setFavoritos((prev) => [...prev, cafe]);
    }
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};
