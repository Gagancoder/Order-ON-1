import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import Settings from "../screens/SettingsScreen";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();

export default class TabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      isUpdated: false
    };
  }

  renderHome = props => {
    return <Home setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderSettings = props => {
    return <Settings setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  changeUpdated = () => {
    this.setState({ isUpdated: true });
  };

  removeUpdated = () => {
    this.setState({ isUpdated: false });
  };

  componentDidMount() {
    
    
  }

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={
          this.state.light_theme
            ? styles.bottomTabStyleLight
            : styles.bottomTabStyle
        }
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
              
            } else if (route.name === "Settings") {
              iconName = focused ? "md-settings" : "md-settings-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          }
        })}
        activeColor={"#4B48B7"}
        inactiveColor={"#000"}
      >
        <Tab.Screen
          name="Home"
          component={this.renderHome}
          
          options={{ unmountOnBlur: false }}
        />
        <Tab.Screen
          name="Settings"
          component={this.renderSettings}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(60),
    borderTopRightRadius: RFValue(60),
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(0),
    borderTopRightRadius: RFValue(0),
    overflow: "hidden",
    position: "absolute",
    borderTopColor: "grey",
    borderTopWidth:2
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});
