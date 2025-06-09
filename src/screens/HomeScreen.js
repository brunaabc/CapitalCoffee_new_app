import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { FavoritosContext } from '../context/FavoritosContext';

const cafes = [
  {
    id: '1',
    nome: 'Aloom',
    subtitulo: 'The Wow Lab',
    local: 'Asa Sul',
    imagem: require('../img/aloom2.webp'),
  },
  {
    id: '2',
    nome: 'Bimi',
    local: 'Asa Norte',
    imagem: require('../img/bimicafe.png'),
  },
  {
    id: '3',
    nome: 'Oliva Café',
    local: 'Noroeste',
    imagem: require('../img/olivacafe1.webp'),
  },
  {
    id: '4',
    nome: 'Acervo Café',
    local: 'Casa Park',
    imagem: require('../img/acervocafe.webp'),
  },
  {
    id: '6',
    nome: 'Ernesto',
    subtitulo: 'Cafés Especiais',
    local: 'Asa Sul',
    imagem: require('../img/ernesto.jpeg'),
  },
  {
    id: '7',
    nome: 'Casa de Chá',
    local: 'Praça dos Três Poderes',
    imagem: require('../img/casadecha.jpeg'),
  },
  {
    id: '8',
    nome: 'Chico',
    subtitulo: 'Banca e Café',
    local: 'Asa Sul',
    imagem: require('../img/chicocafe.webp'),
  },
  {
    id: '9',
    nome: 'Café e um Cherô',
    local: 'Asa Norte',
    imagem: require('../img/cafechero.webp'),
  },
];

const HomeScreen = ({ navigation }) => {
  const { favoritos, toggleFavorito } = useContext(FavoritosContext);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReload = () => {
    setRefreshKey(prev => prev + 1);
  };

  const isFavorito = (id) => favoritos.some((c) => c.id === id);

  return (
    <SafeAreaView style={styles.container}>
      {/* Botões de navegação */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={handleReload}>
          <FontAwesome name="home" size={18} color="#7a4e28" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Favoritos')}
        >
          <FontAwesome name="heart" size={18} color="#7a4e28" />
          <Text style={styles.navText}>Favoritos</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Cafeterias</Text>

      <ScrollView key={refreshKey}>
        {cafes.map((cafe) => (
          <View key={cafe.id} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={cafe.imagem} style={styles.cardImage} resizeMode="cover" />
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() => toggleFavorito(cafe)}
              >
                <FontAwesome
                  name={isFavorito(cafe.id) ? 'heart' : 'heart-o'}
                  size={24}
                  color="#7a4e28"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cafeName}>{cafe.nome}</Text>
                <Text style={styles.cafeSubname}>{cafe.subtitulo}</Text>
              </View>
              <View style={styles.location}>
                <MaterialIcons name="location-pin" size={18} color="#7a4e28" />
                <Text style={styles.locationText}>{cafe.local}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6ccb2', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, marginTop: 10 },
  navButton: {
    backgroundColor: '#d8b49c',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  navText: { marginLeft: 5, color: '#7a4e28', fontWeight: 'bold' },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#5d2c04',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: '#d8b49c',
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 10,
    width: 600,
    alignSelf: 'center',
  },
  imageContainer: { position: 'relative' },
  cardImage: {
    width: 350,
    height: 200,
    borderRadius: 10,
    marginBottom: 1,
    alignSelf: 'center',
  },
  heartIcon: { position: 'absolute', top: 200, right: 30 },
  cardContent: { marginTop: 10 },
  cafeName: { fontWeight: 'bold', fontSize: 16, color: '#5d2c04' },
  cafeSubname: { fontWeight: 'bold', fontSize: 16, color: '#5d2c04' },
  location: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  locationText: { marginLeft: 4, color: '#5d2c04' },
});

export default HomeScreen;
