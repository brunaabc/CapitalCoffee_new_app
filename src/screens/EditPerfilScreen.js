import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EditPefilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página de edição de perfil</Text>
      {/* Adicione os campos de edição aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecd2ba',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#5d2c04',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
