import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './AppTabNavigator';
import Home from '../screens/Home';
import Hotel_Veg from '../screens/Hotel-Veg';
import Fruits from '../screens/Fruits';
import Hotel_NonVeg from '../screens/Hotel_Non-Veg';
import Veges from '../screens/Veges';
import Notification from '../screens/NotificationScreen';
import Meat from '../screens/Meat';
//////////////////////////////////////////////////////////
import Onion from '../OrdersVeges/OrderOnion';
import Mushroom from '../OrdersVeges/OrderMushroom';
import Bell_Pepper from '../OrdersVeges/OrderBell_Pepper';
import Potato from '../OrdersVeges/OrderPotato';
import Tomato from '../OrdersVeges/OrderTomato';
////////////////////////////////////////////////////////////////////
import MyHeader from '../components/MyHeader';
import Profile from '../screens/Profile';
import Dal from '../Order_Hotel-Veg/OrderDal';
import Family_Fun from '../Order_Hotel-Veg/Order_FamilyFood';
import Paneer from '../Order_Hotel-Veg/Order_Paneer';
import Tandoori_Roti from '../Order_Hotel-Veg/Order_Tandoori-Roti';
import Mix_Veg from '../Order_Hotel-Veg/Order_Mix-Veg';
import Fried_Fish from '../Order_Hotel-NonVeg/Order_Fried-Fish';
import Mutten_Cury from '../Order_Hotel-NonVeg/Order_Mutten-Cury';
import Fried_Chicken from '../Order_Hotel-NonVeg/Order_Fried-Chicken';
import Egg_Cury from '../Order_Hotel-NonVeg/Order_Egg-Cury';
import Chicken_Cury from '../Order_Hotel-NonVeg/Order_Chicken-Cury';
/////////////////////////////////////////////////////////////////
import Apple from '../Order_Fruits/Order_Apple';
import Banana from '../Order_Fruits/Order_Banana';
import Mango from '../Order_Fruits/Order_Mango';
import Guava from '../Order_Fruits/Order_Guava';
import Orange from '../Order_Fruits/Order_Orange';
//////////////////////////////////////////////////////////////
import Grocry from '../screens/Grocries';
import CustomSideBarMenu from './CustomSidebarMenu';




const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}>
 <Stack.Screen name="Home" component={TabNavigator} />

    <Stack.Screen name="Veges" component={Veges} />
    <Stack.Screen name="Onion" component={Onion} />
    <Stack.Screen name="Potato" component={Potato} />
    <Stack.Screen name="Tomato" component={Tomato} />
    <Stack.Screen name="Bell_Pepper" component={Bell_Pepper} />
    <Stack.Screen name="Mushroom" component={Mushroom} />

    <Stack.Screen name="Hotel_Veg" component={Hotel_Veg} />
    <Stack.Screen name="Hotel_NonVeg" component={Hotel_NonVeg} />
    <Stack.Screen name="Fruits" component={Fruits} />
    <Stack.Screen name="Grocry" component={Grocry} />

  </Stack.Navigator>


  )
 };

export default StackNavigator;

