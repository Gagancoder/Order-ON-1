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
import Dal from '../Order_Hotel-Veg/OrderDal';
import Potatos from '../OrdersVeges/OrderPotato';
import Tomatos from '../OrdersVeges/OrderTomato';
import Mushrooms from '../OrdersVeges/OrderMushroom';
import Bell_Peppers from '../OrdersVeges/OrderBell_Pepper';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

let Dal_Details = require('./json/Hotel_Veg/Dal.json');
let Family_Food_Details = require('./json/Hotel_Veg/Family_Food.json');
let Paneer_Details = require('./json/Hotel_Veg/Paneer.json');
let Tandoori_roti_Details = require('./json/Hotel_Veg/Tandoori_roti.json');
let Mix_Veg_Details = require('./json/Hotel_Veg/Mix_Veg.json');

export default class Grocry extends Component {
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
                title="Grocries"
                navigation={this.props.navigation}
              />
            </View><ScrollView>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Dal')}>
                <ScrollView>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Dal_Details}
                  renderItem={this.renderItem}
                />
                </ScrollView>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Family_Food')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Family_Food_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Tomatos')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Paneer_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Bell_Peppers')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Tandoori_roti_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Mushrooms')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Mix_Veg_Details}
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
