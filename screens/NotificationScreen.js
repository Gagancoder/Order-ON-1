import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import OrderCard from './NotificationCard';
import Profile from './Profile';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import db from '../config'
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      alldata: [],
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.recivingData();
  }
  recivingData = () => {
    try {
      var alldata = [];
      var stories = db
        .collection('data')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            alldata.push(doc.data());
            console.log('this are the datas', alldata);
          });
          this.setState({ alldata });
        });
    } catch (error) {
      console.log(error);
    }
  };

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
          <View
            style={
              this.state.light_theme ? styles.containerLight : styles.container
            }>
            <View>
              <MyHeader
                title="Notification"
                navigation={this.props.navigation}
              />
            </View>
            {!this.state.alldata[0] ? (
              <View style={styles.noStories}>
                <Image
                  source={require('../assets/no_notification.png')}
                  style={styles.notification}></Image>
                <View>
                  <Text style={styles.text}> No Notifications Available</Text>
                </View>
              </View>
            ) : (
              <View style={styles.cardContainer}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.alldata}
                  renderItem={this.renderItem}
                />
              </View>
              
            )}
              <FlatList
            data={this.state.alldata}
            renderItem={({ item }) => (
              <View>
                <ScrollView>
                  <View
                    style={styles.listwrapper}>
                  <Text style={styles.row}> {item.armyno}</Text>
                  <Text style={styles.row}>{item.rank_}</Text>
                   <Text style={styles.row}>{item.trade_}</Text>
                  <Text style={styles.row}>{item.name}</Text>
                  
                 
                    
                
                  </View></ScrollView>
              
              </View>
            )}
          />
            <View style={{ flex: 0.08 }} />
          </View>
        </SafeAreaProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    flex: 0.85,
  },
  noStories: {
    flex: 0.71,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    width: RFValue(330),
    height: RFValue(430),
    resizeMode: 'contain',
  },
  text: {
    marginTop: RFValue(-100),
    fontSize: RFValue(22),
  },
});
