import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './AppStackNavigator';
import TabNavigator from './AppTabNavigator';
import Profile from '../screens/Profile';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import Logout from '../screens/LogOut';
import Settings from '../screens/SettingsScreen';
import Notification from '../screens/NotificationScreen';
import firebase from 'firebase';
import db from "../config";
import CustomSidebarMenu from '../components/CustomSidebarMenu';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      drawerContent: '',
      userId: firebase.auth().currentUser.email,
      image: firebase.auth().currentUser.email,
      name: '',
      docId: '',
    };
  }

 selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.image);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("/user_profiles" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("/user_profiles" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#".email() });
      });
  };

  getUserProfile() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + " " + doc.data().last_name,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }

  render() {

    return (   
     
       
            
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: this.state.light_theme ? 'black' : 'white',
          itemStyle: { marginVertical: 5 },
        }}>
 
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
      
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />

        <Drawer.Screen
          name="Notification"
          component={Notification}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: false }}
        />
      </Drawer.Navigator>
    );
  }
}