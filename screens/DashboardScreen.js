import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "../components/AppDrawerNavigator";

export default function DashboardScreen() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
