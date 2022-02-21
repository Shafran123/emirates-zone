import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home/Home";
import Flights from "../Screens/Flights/Flights";
import Settings from "../Screens/Settings/Settings";


const DriverStack = createStackNavigator();
const DriverTabs = () => {
  return (
    <DriverStack.Navigator initialRouteName="DriverHome">
      <DriverStack.Screen
        options={{ headerShown: false }}
        name="DriverHome"
        component={Home}
      />
    </DriverStack.Navigator>
  );
};
const FlightStack = createStackNavigator();
const FlightTabs = () => {
  return (
    <FlightStack.Navigator initialRouteName="FlightHome">
      <FlightStack.Screen
        options={{ headerShown: false }}
        name="FlightHome"
        component={Flights}
      />
    </FlightStack.Navigator>
  );
};


const SettingStack = createStackNavigator();
const SettingTabs = () => {
  return (
    <SettingStack.Navigator initialRouteName="SettingHome">
      <SettingStack.Screen
        options={{ headerShown: false }}
        name="SettingHome"
        component={Settings}
      />
    </SettingStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Driver"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#2D59CA",
        tabBarInactiveTintColor: "#707070",
        tabBarHideOnKeyboard: true,
        tabBarStyle: { position: "absolute" },
        tabBarIconStyle: { display: "none" },
        tabBarShowLabel: true
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Driver"
        component={DriverTabs}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Flight"
        component={FlightTabs}
      />
    
      <Tab.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingTabs}
      /> 
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
