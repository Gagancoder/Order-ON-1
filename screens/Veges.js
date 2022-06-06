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
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import OrderCard from './ItemCard';
import Onion from '../OrdersVeges/OrderOnion';
import Potato from '../OrdersVeges/OrderPotato';
import Tomato from '../OrdersVeges/OrderTomato';
import Mushroom from '../OrdersVeges/OrderMushroom';
import Bell_Pepper from '../OrdersVeges/OrderBell_Pepper';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

let Onion_Details = require('./json/Vegetables/VegesOnion.json');
let Bell_Pepper_Details = require('./json/Vegetables/VegesBell_Pepper.json');
let Mushroom_Details = require('./json/Vegetables/VegesMushroom.json');
let Potato_Details = require('./json/Vegetables/VegesPotato.json');
let Tomato_Details = require('./json/Vegetables/VegesTomato.json');

export default class Vegetables extends Component {
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

  renderItem = ({ item: order }) => {
    return <OrderCard order={order} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <SafeAreaProvider>
          <View style={styles.container}>
            <View>
              <MyHeader
                title="Vegetables"
                navigation={this.props.navigation}
              />
            </View>
            <ScrollView>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Onion')}>
                <ScrollView>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Onion_Details}
                  renderItem={this.renderItem}
                />
                </ScrollView>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Potato')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Potato_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OrderTomato')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Tomato_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Bell_Pepper')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Bell_Pepper_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Mushroom')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Mushroom_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View></ScrollView>
          </View>
        </SafeAreaProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(0),
    backgroundColor: 'white',
    
  },
});
