import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

// Salva o café como objeto inteiro (id, nome, subtitulo, imagem local)
export const addFavorite = async (userId, cafe) => {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  const current = docSnap.exists() ? docSnap.data().favorites || [] : [];

  // Verifica se já existe
  const exists = current.find((item) => item.id === cafe.id);
  if (exists) return;

  const novosFavoritos = [...current, cafe];
  await setDoc(userRef, { favorites: novosFavoritos }, { merge: true });
};

export const removeFavorite = async (userId, cafeId) => {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) return;

  const current = docSnap.data().favorites || [];
  const atualizados = current.filter((item) => item.id !== cafeId);

  await setDoc(userRef, { favorites: atualizados }, { merge: true });
};

export const getUserFavorites = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().favorites || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    return [];
  }
};
