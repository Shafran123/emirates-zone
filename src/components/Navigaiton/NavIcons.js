import { CheckIcon, Icon, Image } from "native-base";
import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { height } = Dimensions.get("window");

export default function NavIcons({ name, focused }) {
  console.log(name, focused);
  switch (name) {
    case "Driver":
      if (focused) {
        return (
          <Icon as={Ionicons} name="man" style={{ marginTop: 4 }} size={6} color={'#2D59CA'} />

        );
      } else {
        return (
          <Icon as={Ionicons} name="man" style={{ marginTop: 4 }} size={6} color={'#707070'} />
        );
      }
    case "Flight":
      if (focused) {
        return (
          <Icon as={Ionicons} name="airplane" style={{ marginTop: 4 }} size={6} color={'#2D59CA'} />
        );
      } else {
        return (
          <Icon as={Ionicons} name="airplane" style={{ marginTop: 4 }} size={6} color={'#707070'} />
        );
      }
    case "Settings":
      if (focused) {
        return (
          <Icon as={Ionicons} name="settings-sharp" style={{ marginTop: 4 }} size={6} color={'#2D59CA'} />
        );
      } else {
        return (
          <Icon as={Ionicons} name="settings-sharp" style={{ marginTop: 4 }} size={6} color={'#707070'} />
        );
      }

    default:
      return (
        <Icon as={Ionicons} name="home" />
      );
  }
}
