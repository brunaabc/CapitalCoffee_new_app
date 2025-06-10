import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import PerfilScreen from "../screens/PerfilScreen";
import sair from "../components/sair"; // importe seu SairScreen aqui
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#ecd2ba" }}>
      <DrawerItemList {...props} />
      {/* BotaoSair removido pois será item Drawer.Screen */}
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitle: "",
        headerShown: true,
        drawerStyle: {
          backgroundColor: "#ecd2ba",
        },
        drawerActiveTintColor: "#5d2c04",
        drawerInactiveTintColor: "#a66b41",
        drawerActiveBackgroundColor: "#d9b382",
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
        },
        headerStyle:{ backgroundColor: '#e6ccb2'}
      }}
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
      <Drawer.Screen
        name="Sair"
        component={sair}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
