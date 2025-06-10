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
import DetalhesScreen from "./src/screens/DetalhesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FavoritosProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={StartScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ headerShown: false}}
          />
          <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ headerTitle: '', headerStyle:{ backgroundColor: '#e6ccb2'} }} />
          <Stack.Screen name="Favoritos" component={FavoritosScreen} options={{ headerTitle: '', headerStyle:{ backgroundColor: '#e6ccb2'} }}/>
          <Stack.Screen 
            name="Perfil" 
            component={DrawerNavigator} 
            options={{ headerShown: false}}
          />
          <Stack.Screen 
            name="EditPerfil" 
            component={EditPefilScreen} 
            options={{ headerTitle: '', headerStyle:{ backgroundColor: '#e6ccb2'}}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritosProvider>
  );
}

