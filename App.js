import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import RegisterScreen from "./src/screens/ResgisterScreen";
import StartScreen from "./src/screens/StartScreen";
import FavoritosScreen from "./src/screens/FavoritesScreen";
import { FavoritosProvider } from "./src/context/FavoritosContext";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import PerfilScreen from "./src/screens/PerfilScreen";
import EditPefilScreen from "./src/screens/EditPerfilScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FavoritosProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={RegisterScreen} />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Favoritos" component={FavoritosScreen} />
          <Stack.Screen 
            name="Perfil" 
            component={PerfilScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="EditPerfil" 
            component={EditPefilScreen} 
            options={{ title: 'Editar Perfil' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritosProvider>
  );
}

