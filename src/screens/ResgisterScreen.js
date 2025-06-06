import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const cadastrar = async () => {
    setErro("");
    if (!nome.trim()) {
      setErro("Por favor, insira seu nome.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      // Atualizar o displayName com o nome
      await updateProfile(userCredential.user, { displayName: nome });
      navigation.replace("Home");
    } catch (err) {
      console.error("Firebase Cadastro Error:", err.code, err.message);
      if (err.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está em uso.");
      } else if (err.code === "auth/invalid-email") {
        setErro("E-mail inválido.");
      } else if (err.code === "auth/weak-password") {
        setErro("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setErro("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F2E6DB" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.topSection}>
          <Text style={styles.title}>Criar Conta</Text>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.inputLabel}>Digite seu nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#A1816A"
            autoCapitalize="words"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.inputLabel}>Digite seu e-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#A1816A"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>Digite sua senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#A1816A"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          {erro ? <Text style={styles.errorMessage}>{erro}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={cadastrar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <View style={styles.loginRedirect}>
            <Text style={styles.text}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2E6DB",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  topSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 60 : 100,
    paddingBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#654B3A",
  },
  bottomSection: {
    width: "100%",
    backgroundColor: "#B7977F",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 40,
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  inputLabel: {
    fontSize: 16,
    color: "#E0D0C1",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginTop: 25,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#DBC5B3",
    borderRadius: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#654B3A",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#98755D",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginRedirect: {
    flexDirection: "row",
    marginTop: 30,
  },
  text: {
    color: "#E0D0C1",
    fontSize: 14,
  },
  link: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  errorMessage: {
    color: "red",
    marginTop: -10,
    marginBottom: 10,
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});