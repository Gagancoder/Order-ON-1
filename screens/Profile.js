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
      docId: '',
      userId: firebase.auth().currentUser.email,
    };
  }

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({
          image: url,
        });
      })
      .catch((error) => {
        this.setState({
          image: firebase.auth().currentUser.image,
        });
      });
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles' + imageName);

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

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users')
      
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          console.log(data);
          this.setState({
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            mobileNumber: data.mobile_number,
            currencyCode: data.currency_code,
            email: data.username,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection('users').doc(this.state.docId).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address: this.state.address,
      mobile_Number: this.state.mobileNumber,
      email: this.state.email,
    });
    alert('Profile Updated Successfully');
  };

  componentDidMount() {
    this.getUserDetails();
    this.fetchImage(this.state.userId);
    console.log();
  }

  render() {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <MyHeader title="Profile" navigation={this.props.navigation} />
          <View style={{ flex: 0.1 }}>
            <View style={{ alignContent: 'centre' }}>
              <View
                style={{
                  marginTop: RFValue(10),
                  borderColor: 'black',
                  borderRadius: 2,
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
              </View>

              <View
                style={{
                  flexDirection: 'row',
                
                  height: RFValue(40),
                }}>
                <Text style={styles.label1}>Name:-</Text>
                <Text style={styles.label}>{this.state.firstName} </Text>
                <Text style={styles.label}>{this.state.lastName} </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
             
                  height: RFValue(40),
                }}>
                <Text style={styles.label1}>Mobile.No:-</Text>
                <Text style={styles.label}>{this.state.mobileNumber} </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
              
                  height: RFValue(40),
                }}>
                <Text style={styles.label1}>Email:-</Text>
                <Text style={styles.label}>{this.state.email} </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
   
         
                  height: RFValue(40),
                }}>
                <Text style={styles.label1}>Address:-</Text>
                <Text style={styles.label}>{this.state.address} </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
           
                  height: RFValue(40),
                }}>
                <Text style={styles.label1}>Country:-</Text>
                <Text style={styles.label}>{this.state.currencyCode} </Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateUserDetails();
                  }}>
                  <Text style={styles.buttonText}></Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({

  label: {
    marginLeft: RFValue(20),
    fontSize: RFValue(25),
  },
  label1: {
    marginLeft: RFValue(10),
    fontSize: RFValue(25),
  },
});
