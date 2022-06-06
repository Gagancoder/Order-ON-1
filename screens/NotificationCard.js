import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      story_id: this.props.story,
      story_data: this.props.story,
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
    let story = this.state.story_data;
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let images = {};
      return (
        <SafeAreaProvider>
          <View>
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <Text></Text>
                <Text></Text>
                <Text></Text>
              </View>
            </View>
          </View>
        </SafeAreaProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#2f345d',
    borderRadius: RFValue(20),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  titleTextContainer: {
    flex: 0.8,
  },
  descriptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(13),
    color: 'white',
  },
});
////////////////////
<View style={styles.container}>
  <View style={styles.cardContainer}>
    <View style={styles.nameContainer}>
      <Text style={styles.orderNameText}></Text>
      <View
        style={{
          flexDirection: 'row',
          flexGrow: RFValue(1),
          top: RFValue(30),
          left: RFValue(10),
        }}>
        <Image
          source={{
            uri: 'https://img.phonandroid.com/2021/03/google-earth.jpg',
          }}
          style={styles.orderImage}></Image>

        <Text style={styles.orderFeedbackText}></Text>
      </View>
      <Text style={styles.orderShopText}></Text>
      <Text style={styles.descriptionText}></Text>
    </View>
  </View>
</View>;
