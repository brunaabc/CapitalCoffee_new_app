import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebaseConfig'; // ajuste conforme o caminho correto
import { updateProfile, updateEmail } from 'firebase/auth';

export default function EditPerfilScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setNome(user.displayName || '');
      setEmail(user.email || '');
    }
  }, []);

  const handleSalvar = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      if (user.displayName !== nome) {
        await updateProfile(user, { displayName: nome });
      }
      if (user.email !== email) {
        await updateEmail(user, email);
      }

      setSalvo(true);

      setTimeout(() => {
        setSalvo(false);
        navigation.navigate('Perfil'); // volta para a tela de perfil
      }, 2000);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações. Verifique os dados ou tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={40} color="#5d2c04" />
            </View>
            <Text style={styles.title}>Editar perfil</Text>
          </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
          style={styles.input}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        {salvo && (
          <View style={styles.successContainer}>
            <Image
              source={require('../img/success.png')} 
              style={styles.successImage}
            />
            <Text style={styles.successText}>Alterações salvas com sucesso!</Text>
          </View>
        )}
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
  successContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  successImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  successText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
