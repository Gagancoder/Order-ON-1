import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.orderNameText}>{this.props.order.name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: RFValue(1),
                  top: RFValue(40),
                  left: RFValue(10),

                }}>
                <Image
                  source={this.props.order.imageSource}
                  style={styles.orderImage}></Image>
                  <View style={styles.verticleLine}></View>
                <Text style={styles.orderFeedbackText}>
                  {this.props.order.feedback}
                </Text>
              </View>
              <Text style={styles.orderShopText}>{this.props.order.shop}</Text>
              <Text style={styles.descriptionText}>
                {this.props.order.description}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#F2ECE2',
    borderRadius: RFValue(20),
    shadowColor: 'black',
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5.32,
    elevation: 1,
  },
  orderImage: {
    resizeMode: 'contain',
    width: '25%',
    alignSelf: 'center',
    height: RFValue(200),
    justifyContent: 'center',
    marginTop: RFValue(-100),
    marginLeft: RFValue(-20),
  },
  nameContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  orderNameText: {
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    color: '#404041',
    marginTop: RFValue(10),
  },
  orderShopText: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: '#404041',
  },
  descriptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 13,
    color: '#404041',
    paddingTop: RFValue(10),
  },
  orderFeedbackText: {
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
    color: '#404041',
    marginRight: RFValue(15),
    marginBottom: RFValue(60),
    marginLeft: RFValue(30),
  },
   verticleLine:{
    height: '90%',
    width: RFValue(2),
    backgroundColor: '#909090',
    top:RFValue(-20),
    left:RFValue(10),
borderRadius:200
  },
});
