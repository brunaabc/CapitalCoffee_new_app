import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Alert } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import PerfilScreen from "../screens/PerfilScreen";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const navigation = useNavigation();

const handleLogout = () => {
  Alert.alert(
    "Sair",
    "Deseja realmente sair?",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Start" }],
            })
          );
        },
      },
    ],
    { cancelable: true }
  );
};

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        icon={({ color, size }) => (
          <MaterialIcons name="logout" size={size} color={color} />
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerTitle: "", headerShown: true }}
    >
      <Drawer.Screen
        name="Início"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
