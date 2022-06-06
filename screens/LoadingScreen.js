import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('DashboardScreen');
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
      
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: RFValue(1),
                  width: RFValue(1),
                  height: RFValue(130),
                  top: RFValue(40),
                  left: RFValue(0),
                }}>
                <View>
                  <View style={styles.routeCard1}></View>
                </View>
                <View>
                  <View style={styles.routeCard1}></View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: RFValue(1),
                  width: RFValue(1),
                  height: RFValue(130),
                  top: RFValue(40),
                  left: RFValue(0),
                }}>
                <View>
                  <View style={styles.routeCard1}></View>
                </View>
                  <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    
                }}
            >
                <ActivityIndicator size="large" />
            </View>
                <View>
                  <View style={styles.routeCard1}></View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: RFValue(1),
                  width: RFValue(1),
                  height: RFValue(130),
                  top: RFValue(40),
                  left: RFValue(0),
                }}>
                <View>
                  <View style={styles.routeCard1}></View>
                </View>
                <View>
                  <View style={styles.routeCard1}></View>
                </View>
              </View>
              <View
              style={{backgroundColor:'white',
              bottom:'-55%',width:'100%',height:'20%'}}
              >
              
              </View>
            </View>
       
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F2ECe9',
  },

  routeCard1: {
    flex: 1,
    marginLeft: RFValue(30),
    marginRight: RFValue(20),
    marginTop: RFValue(50),
    borderRadius: RFValue(10),
    backgroundColor: 'white',
    width: RFValue(125),
    height: RFValue(30),
  },
});
