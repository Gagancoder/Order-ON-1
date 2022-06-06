import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import db from '../config';

export default class CustomSideBarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '#',
      name: '',
      userId: firebase.auth().currentUser.email,
      docId: '',
    };
  }

  getUserProfile() {
      db.collection('users')
      .where('email_id', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name.email + ' ' + doc.data().last_name.email,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('Secret_Image$#%@/' + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({
          image: url,
        });
      })
      .catch((error) => {
        this.setState({
          image: '#',
        });
      });
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('Secret_Image$#%@/' + imageName);
    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!cancelled) {
      this.setState({
        image: uri,
      });
      this.uploadImage(uri, this.state.userId);
    }
  };

  componentDidMount() {
    this.getUserProfile();
    this.fetchImage(this.state.userId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            backgroundColor: 'violet',
          }}>
          <Avatar
            rounded
            source={{ uri: this.state.image }}
            size="xlarge"
            onPress={() => {
              this.selectPicture();
            }}
            placeholderStyle={{ backgroundColor: 'white' }}
            showEditButton
          />
          <Text
            style={{
              fontFamily: 'Century Gothic',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {this.state.name}
          </Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props} />
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              this.props.navigation.navigate('SignInPage');
              firebase.auth().signOut();
            }}>
            <Text style={styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: { flex: 1 },
  drawerItemsContainer: { flex: 0.8 },
  logOutContainer: { flex: 0.2, justifyContent: 'flex-end', paddingBottom: 30 },
  logOutButton: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  logOutText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    color: 'grey',
  },
});

