import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import AuthLoading from "../Auth/AuthLoading";
import Login from "../Auth/Login/Login";
import MainAuth from "../Auth/MainAuth/MainAuth";
import Register from "../Auth/Register/Register";
import DriverDetails from "../Screens/DriverDetails/DriverDetails";
import Home from "../Screens/Home/Home";
import MainTabNavigator from "./MainTabNavigator";


const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="AuthLoading">
        <RootStack.Screen options={{ headerShown: false }} name="AuthLoading" component={AuthLoading} />
        <RootStack.Group>
          <RootStack.Screen options={{headerShown: false}} name="MainAuth" component={MainAuth} />
          <RootStack.Screen options={{headerShown: false}} name="Login" component={Login} />
          <RootStack.Screen options={{headerShown: false}} name="Register" component={Register} />
        </RootStack.Group>
        <RootStack.Group>
          <RootStack.Screen options={{headerShown: false}} name="Home" component={MainTabNavigator} />
          <RootStack.Screen  name="DriverDetails" options={{headerShown: false}} component={DriverDetails} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
