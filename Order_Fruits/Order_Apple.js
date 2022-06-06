import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert,
  Animated,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Speech from 'expo-speech';
import firebase from 'firebase';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Linking } from 'react-native';
import Carousel from '../components/Carousel';
import { Apple } from '../screens/Item_imges_js/Fruits/Apple';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from '../screens/Home';
import db from '../config';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Order_Apple extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      previewText: '',
      dropdownHeight: 40,
      quantity: '',
      item: 'Apple',
      email: firebase.auth().currentUser.email,
      Total: '',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  addOrder = (item, quantity) => {
    var userId = this.state.email;
    var prize = this.state.previewText;
    db.collection('orders').add({
      email: userId,
      name_Of_Item: item,
      quantity: quantity,
      prize: prize,
      date: firebase.firestore.Timestamp.now().toDate(),
      Total: prize + quantity,
    });

    this.setState({
      item: '',
      quantity: '',
    });
    this.props.navigation.navigate('HomeScreen');
    return alert('Successfully Requested for the item');
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.appTitle}>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Apple</Text>
            </View>
          </View>
          <View style={styles.orderContainer}>
            <View style={{ flex: 1, height: RFValue(100) }}>
              <Carousel data={Apple} />
            </View>
            <View>
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  label="Prize"
                  items={[
                    { label: '250 grams', value: '₹  40' },
                    { label: '500 grams', value: '₹  75' },
                    { label: '750 grams', value: '₹  100' },
                    { label: '1 kg', value: '₹  150' },
                    { label: '1.500 kg', value: '₹  225' },
                  ]}
                  defaultValue={this.state.previewText}
                  containerStyle={{
                    marginTop: RFValue(10),
                    height:RFValue( 40),
                    borderRadius: RFValue(20),
                    marginBottom: RFValue(20),
                    marginHorizontal: RFValue(10),
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 200 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 30 });
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    fontFamily: 'Bubblegum-Sans',
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                    fontFamily: 'Bubblegum-Sans',
                  }}
                  dropDownStyle={{
                    backgroundColor: '#e2e8f2',
                    fontFamily: 'Bubblegum-Sans',
                  }}
                  onChangeItem={(item) =>
                    this.setState({
                      previewText: item.value,
                      quantity: item.label,
                    })
                  }
                />
              </View>
              <View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: RFValue(40),
                    marginLeft: RFValue(10),
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(50),
                      marginTop: '0.1%',
                      fontFamily: 'Bubblegum-Sans',
                      color: '#4b48b7',
                      marginLeft: RFValue(-2),
                    }}>
                    Prize :- {this.state.previewText}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.dataContainer}>
                <View style={styles.submitButton}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.addOrder(this.state.item, this.state.quantity);
                    }}>
                    <Text
                      style={{
                        
                        fontSize: RFValue(25),
                      }}>
                      Order
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    backgroundColor: 'white',
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
    marginLeft: RFValue(160),
  },
  orderContainer: {
    flex: 1,
  },
  dataContainer: {
    padding: RFValue(20),
  },
  submitButton: {
    marginTop: RFValue(40),
    alignItems: 'center',
    justifyContent: 'center',

    color: 'white',
  },
});
