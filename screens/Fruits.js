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
import Apple from '../Order_Fruits/Order_Apple';
import Banana from '../Order_Fruits/Order_Banana';
import Guava from '../Order_Fruits/Order_Guava';
import Mango from '../Order_Fruits/Order_Mango';
import Orange from '../Order_Fruits/Order_Orange';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

let Apple_Details = require('./json/Fruits/Apple.json');
let Banana_Details = require('./json/Fruits/Banana.json');
let Mango_Details = require('./json/Fruits/Mango.json');
let Orange_Details = require('./json/Fruits/Orange.json');
let Guava_Details = require('./json/Fruits/Guava.json');

export default class Fruits extends Component {
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
              <MyHeader title="Fruits" navigation={this.props.navigation} />
            </View>
            <ScrollView>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Apple')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Apple_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Banana')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Banana_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Guava')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Guava_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Orange')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Orange_Details}
                  renderItem={this.renderItem}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Mango')}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={Mango_Details}
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
