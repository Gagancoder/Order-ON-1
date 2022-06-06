import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Button,
  TextInputAndroidProps,
  Alert,
} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import LogOut from './LogOut';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      username: '',
      lastName: '',
      address: '',
      mobileNumber: '',
      image: firebase.auth().currentUser.email,
      currencyCode: '',

      userId: firebase.auth().currentUser.email,
    };
  }
  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users')
      
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email_id,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            contact: data.contact,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection('users').doc(this.state.image).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address: this.state.address,
      contact: this.state.contact,
    });

    Alert.alert('Profile Updated Successfully');
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('/user_profiles' + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({
          image: url,
        });
      })
      .catch((error) => {
        this.setState({
          image: ''.email(),
        });
      });
  };

  uploadImage = async (uri, image) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('/user_profiles' + image);
    return ref.put(blob).then((response) => {
      this.fetchImage(image);
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
      this.uploadImage(uri, this.state.userId.email);
    }
  };

  componentDidMount() {
    this.getUserDetails();
    this.fetchImage(this.state.image.email);
    console.log();
  }

  render() {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <MyHeader title="Settings" navigation={this.props.navigation} />
          <View style={{ flex: 0.1 }}>
            <View style={{ alignContent: 'centre' }}>
              <View
                style={{
                  marginTop: RFValue(10),
                  marginLeft: RFValue(20),
                  borderRadius: 2,
                }}>
                <Avatar
                  rounded
                  source={{ uri: this.state.image }}
                  size="xlarge"
                  onPress={() => {
                    this.selectPicture();
                  }}
                  placeholderStyle={{ backgroundColor: '#4b48b7' }}
                  showEditButton
                />
              </View>

               <TextInput 
          placeholder="First Name"
          style={styles.tS}
          onChangeText={(text)=>{
          this.setState({
            firstName:text
          })
        }}
        value={this.state.firstName}/>
          <TextInput 
          placeholder="Last Name"
          style={styles.tS}
          onChangeText={(text)=>{
          this.setState({
            lastName:text
          })
        }}
        value={this.state.lastName}/>
          <TextInput 
          placeholder="Phone No."
          style={styles.tS}
          onChangeText={(text)=>{
          this.setState({
            contact:text
          })
        }}
        value={this.state.contact}/>
          <TextInput 
          placeholder="Address"
          style={styles.tS}
          onChangeText={(text)=>{
          this.setState({
            address:text
          })
        }}
        value={this.state.address}/>
          <TouchableOpacity style={styles.bS}
          onPress={()=>{
          this.updateUserDetails();
        }}>
          <Text style={styles.bT}>Save Changes</Text>
          </TouchableOpacity>
            </View>
          </View>
          <View style={styles.logOutContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('LoginScreen');
                firebase.auth().signOut();
              }}>
              <Text style={styles.logOutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  logOutContainer: {
    flex: 0.22,
    justifyContent: 'centre',
    marginTop: 400,
    marginLeft: 125,
    marginRight: 100,
    padding: 'centre',
    borderColor: 'red',
  },
  logOutText: {
    fontSize: RFValue(30),
    fontWeight: 'bold',
    fontFamily: 'Century Gothic',
    color: 'red',
    backgroundColor: 'lightgrey',
    padding: 'centre',
  },
});
