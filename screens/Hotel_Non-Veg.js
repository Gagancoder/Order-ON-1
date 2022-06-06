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
import Fried_Fish from '../Order_Hotel-NonVeg/Order_Fried-Fish';
import Mutten_Cury from '../Order_Hotel-NonVeg/Order_Mutten-Cury';
import Fried_Chicken from '../Order_Hotel-NonVeg/Order_Fried-Chicken';
import Egg_Cury from '../Order_Hotel-NonVeg/Order_Egg-Cury';
import Chicken_Cury from '../Order_Hotel-NonVeg/Order_Chicken-Cury';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

let FriedFish_Details = require('./json/Hotel_NonVeg/Fried_Fish.json');
let MuttonCury_Details = require('./json/Hotel_NonVeg/Mutten_Cury.json');
let ChickenCury_Details = require('./json/Hotel_NonVeg/Chicken-Cury.json');
let EggCury_Details = require('./json/Hotel_NonVeg/Egg_Cury.json');
let FriedChicken_Details = require('./json/Hotel_NonVeg/Fried_Chicken.json');

export default class Hotel_NonVeg extends Component {
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
                title="Hotel - Non Veg"
                navigation={this.props.navigation}
              />
            </View>
            <ScrollView>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Fried_Fish')}>
                <ScrollView>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={FriedFish_Details}
                  renderItem={this.renderItem}
                />
                </ScrollView>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Mutten_Cury')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={MuttonCury_Details }
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Chicken_Cury')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={ChickenCury_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Egg_Cury')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={EggCury_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Fried_Chicken')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={FriedChicken_Details}
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
