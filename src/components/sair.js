import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SairScreen({ navigation }) {
  function handleLogout() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Start' }],
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Confirmar Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ccb2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5d2c04', // marrom escuro
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#d9b382', // marrom claro
    fontSize: 18,
    fontWeight: 'bold',
  },
});
