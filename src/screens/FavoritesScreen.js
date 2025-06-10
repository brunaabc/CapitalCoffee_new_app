import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FavoritosContext } from '../context/FavoritosContext';
import { FontAwesome } from '@expo/vector-icons';

const FavoritosScreen = ({ navigation }) => {
  const { favoritos, toggleFavorito } = useContext(FavoritosContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  if (favoritos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Nenhum café favoritado ainda.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {favoritos.map((cafe) => (
        <View key={cafe.id} style={styles.card}>
          <Image source={cafe.imagem} style={styles.cardImage} />

          <View style={styles.nameContainer}>
            <Text style={styles.cafeName}>{cafe.nome}</Text>
            <TouchableOpacity onPress={() => toggleFavorito(cafe)}>
              <FontAwesome name="heart" size={24} color="#7a4e28" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.cafeSubname}>{cafe.subtitulo}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6ccb2', padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#5d2c04', textAlign: 'center' },
  card: {
    backgroundColor: '#d8b49c',
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 10,
    width: 600,
    alignSelf: 'center',
  },
  cardImage: {
    width: 350,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  icon: {
    marginLeft: 8,
  },
  cafeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5d2c04',
  },
  cafeSubname: {
    fontSize: 14,
    color: '#5d2c04',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 100,
    color: '#5d2c04',
  },
});

export default FavoritosScreen;
