import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Certifique-se de ter expo-linear-gradient instalado

export default function StartScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#c49a6c", "#8b5e3c"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#8b5e3c" />

      <View style={styles.content}>
        <Image
          source={require("../img/logo.png")} // Substitua pelo caminho correto da imagem do ícone de café
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Capital Coffee</Text>

        <Text style={styles.subtitle}>
          Aqui você encontra as melhores cafeterias de Brasília!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 40,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75, // metade da largura/altura
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4b2e1e",
    marginBottom: 10,
    fontFamily: "Cochin", // Ou uma fonte mais parecida com a da imagem
  },
  subtitle: {
    fontSize: 16,
    color: "#3a2a1c",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#d1a375",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: "#4b2e1e",
    fontSize: 16,
    fontWeight: "bold",
  },
});
