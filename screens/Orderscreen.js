import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';

export default class Searchscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      lastVisibleTransaction: null,
      search: '',
    };
  }

  fetchMoreOrders = async () => {
    var text = this.state.search.toUpperCase();
    var enteredText = text.split('');

    if (enteredText[0].toUpperCase() === '') {
      const query = await db
        .collection('orders')
        .where('bookId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map((doc) => {
        this.setState({
          orders: [...this.state.orders, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    } else if (enteredText[0].toUpperCase() === 'S') {
      const query = await db
        .collection('orders')
        .where('bookId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map((doc) => {
        this.setState({
          orders: [...this.state.orders, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
  };


  componentDidMount = async () => {
    const query = await db.collection('orders').limit(10).get();
    query.docs.map((doc) => {
      this.setState({
        orders: [],
        lastVisibleTransaction: doc,
      });
    });
  };
  render() {
    return (
      <View style={styles.container}>
    
        <FlatList
          data={this.state.orders}
          renderItem={({ item }) => (
            <View style={{ borderBottomWidth: 2 }}>
              <Text>{'Item: ' + item.name_Of_Item}</Text>
              <Text>{'Student id: ' + item.quantity}</Text>
              <Text>{'prize: ' + item.prize}</Text>
              <Text>{'Date of Order: ' + item.date.toDate()}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});
