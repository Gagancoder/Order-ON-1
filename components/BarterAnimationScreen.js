import React from 'react';
import LottieView from 'lottie-react-native';

export default class BarterAnimation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/animations/barter-animation.json')}
      style={{width:"40%",marginBottom:0}}
      autoPlay loop />
    )
  }
}
