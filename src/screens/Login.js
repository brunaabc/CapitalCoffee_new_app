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
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false); 

  const login = async () => {
    setErro("");
    setCarregando(true); // ativa o spinner
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace("Home");
    } catch (err) {
      console.error("Firebase Login Error:", err.code, err.message);
      if (
        err.code === "auth/invalid-email" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setErro("Email ou senha inválidos.");
      } else if (err.code === "auth/invalid-credential") {
        setErro("Credenciais inválidas. Verifique seu email e senha.");
      } else if (err.code === "auth/too-many-requests") {
        setErro(
          "Acesso bloqueado temporariamente devido a muitas tentativas falhas. Tente novamente mais tarde."
        );
      } else {
        setErro("Ocorreu um erro ao tentar fazer login. Tente novamente.");
      }
    } finally {
      setCarregando(false); // desativa o spinner
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
          <Text style={styles.loginTitle}>Login</Text>
        </View>

        <View style={styles.bottomSection}>
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

          <TouchableOpacity
            style={[styles.loginButton, carregando && { opacity: 0.7 }]}
            onPress={login}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator size="small" color="#5d2c04" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
              <Text style={styles.createAccountLink}>Criar conta</Text>
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
    paddingHorizontal: 0,
  },
  topSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 60 : 100,
    paddingBottom: 20,
  },
  loginTitle: {
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
    shadowOffset: { width: 0, height: -3 },
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
  loginButton: {
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
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccountContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  createAccountText: {
    color: "#E0D0C1",
    fontSize: 14,
  },
  createAccountLink: {
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
