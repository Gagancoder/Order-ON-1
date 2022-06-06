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
  ImageBackground,
} from 'react-native';
import { Card } from 'react-native-paper';
import Veg from './Hotel-Veg';
import NonVeg from './Hotel_Non-Veg';
import Veges from './Veges';
import Fruits from './Fruits';
import Meat from './Meat';
import Grocry from './Grocries';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
export default class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View>
            <MyHeader title="Home" navigation={this.props.navigation} />
          </View>
          
          <View>
            <View
              style={{
                flexDirection: 'row',         
                height: RFValue(130),
                top: RFValue(30),
                left: RFValue(-15),
              }}>
              <View>
                <TouchableOpacity
                  style={styles.routeCard1}
                  onPress={() => this.props.navigation.navigate('Hotel_Veg')}>
                  <Text style={styles.routeText}>Hotel-Veg</Text>
                  <Text style={styles.bgDigit}>1</Text>
                  <Image
                    source={{
                      uri: 'https://www.vippng.com/png/full/26-261497_indian-cuisine-pakora-samosa-rajma-indian-food-cartoon.png',
                    }}
                    style={styles.iconImage}></Image>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.routeCard1}
                  onPress={() => this.props.navigation.navigate('Hotel_NonVeg')}>
                  <Text style={styles.routeText1}>Hotel-NonVeg</Text>
                  <Text style={styles.bgDigit1}>2</Text>
                  <Image
                    source={{
                      uri: 'https://img.pikbest.com/element_our/20201116/bg/f35f45a0336e6.png!c1024wm0/compress/true/progressive/true/format/webp/fw/1024',
                    }}
                    style={styles.iconImage1}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
         
                height: RFValue(130),
                top: RFValue(40),
                left: RFValue(-15),
              }}>
              <View>
                <TouchableOpacity
                  style={styles.routeCard1}
                  onPress={() => this.props.navigation.navigate('Fruits')}>
                  <Text style={styles.routeText2}>Fruits</Text>
                  <Text style={styles.bgDigit2}>3</Text>
                  <Image
                    source={{
                      uri: 'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/13561/fruits-food-clipart-md.png',
                    }}
                    style={styles.iconImage}></Image>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.routeCard1}
                  onPress={() => this.props.navigation.navigate('Veges')}>
                  <Text style={styles.routeText3}>Vegetables</Text>
                  <Text style={styles.bgDigit1}>4</Text>
                  <Image
                    source={{
                      uri: 'https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Vegetables-PNG/Basket_with_Vegetables_PNG_Picture_Clipart.png?m=1507172105',
                    }}
                    style={styles.iconImage1}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: RFValue(130),
                top: RFValue(50),
                left: RFValue(-15),
              }}>
              <View>
                <TouchableOpacity
                  style={styles.routeCard1}
                  onPress={() => this.props.navigation.navigate('Meat')}>
                  <Text style={styles.routeText4}>Meat</Text>
                  <Text style={styles.bgDigit2}>5</Text>
                  <Image
                    source={{
                      uri: 'https://www.nicepng.com/png/full/406-4068681_raw-meat-bbq-raw-food-cartoon-png.png',
                    }}
                    style={styles.iconImage}></Image>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.routeCard1}
                  onPress={() => this.props.navigation.navigate('Grocry')}>
                  <Text style={styles.routeText5}>Groceries</Text>
                  <Text style={styles.bgDigit1}>6</Text>
                  <Image
                    source={{
                      uri: 'https://freepngimg.com/download/grocery/41625-7-groceries-image-png-download-free.png',
                    }}
                    style={styles.iconImage1}></Image>
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
  container: {
    flex:1,
    backgroundColor: '#F2ECE2',
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
  routeText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#4b48b7',
    marginTop: RFValue(10),
    marginLeft: RFValue(20),
    paddingLeft: RFValue(20),
  },
  routeText1: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#4b48b7',
    marginTop: RFValue(10),
    marginLeft: RFValue(20),
    paddingLeft: RFValue(20),
  },
  routeText2: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#4b48b7',
    marginTop: RFValue(25),
    marginLeft: RFValue(10),
    paddingLeft: RFValue(30),
  },
  routeText3: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#4b48b7',
    marginTop: RFValue(39),
    marginLeft: RFValue(-14),
    paddingLeft: RFValue(30),
  },

  routeText4: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#4b48b7',
    marginTop: RFValue(25),
    marginLeft: RFValue(10),
    paddingLeft: RFValue(30),
  },

  routeText5: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#4b48b7',
    marginTop: RFValue(35),
    marginLeft: RFValue(-10),
    paddingLeft: RFValue(30),
  },

  bgDigit: {
    position: 'absolute',
    color: 'rgba(183, 183, 183, 0.5)',
    fontSize: RFValue(50),
    right: '80%',
    bottom: '30%',
    
  },
  bgDigit2: {
    position: 'absolute',
    color: 'rgba(183, 183, 183, 0.5)',
    fontSize: RFValue(50),
    right: '75%',
    bottom: '30%',
    
  },
  bgDigit1: {
    position: 'absolute',
    color: 'rgba(183, 183, 183, 0.5)',
    fontSize: RFValue(50),
    right: '75%',
    bottom: '30%',
  
  },
  iconImage: {
    position: 'absolute',
    height: RFValue(60),
    width: RFValue(100),
    resizeMode: 'contain',
    top: RFValue(-20),
    left: RFValue(80),
  },
  iconImage1: {
    position: 'absolute',
    height: RFValue(50),
    width: RFValue(100),
    resizeMode: 'contain',
    top: RFValue(-20),
    left: RFValue(77),
  },

});
