import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import CameraScreen from "../screens/CameraScreen";
import ShareScreen from "../screens/ShareScreen";
import SettingsScreen from "../screens/SettingsScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const CameraStack = createStackNavigator(
  {
    Home: CameraScreen
  },
  config
);

CameraStack.navigationOptions = {
  tabBarLabel: "Camera",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-camera` : "md-camera"}
    />
  )
};

CameraStack.path = "";

const ShareStack = createStackNavigator(
  {
    Share: ShareScreen
  },
  config
);

ShareStack.navigationOptions = {
  tabBarLabel: "Share",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

ShareStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Customize",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  CameraStack,
  ShareStack,
  SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
