import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebaseConfig'; 

export default function PerfilScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setNome(user.displayName || '');
      setEmail(user.email || '');
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileIcon}>
          <Ionicons name="person" size={40} color="#5d2c04" />
        </View>
        <Text style={styles.title}>Perfil</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
          style={styles.input}
          editable={false} 
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          value={email}
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={false} 
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('EditPerfil')}
        >
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecd2ba',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5d2c04',
  },
  card: {
    flex: 1,
    backgroundColor: '#c69363',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: '#3d1d00',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ecd2ba',
    borderRadius: 30,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#a66b41',
    borderRadius: 30,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
