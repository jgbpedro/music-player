import React, { Component } from 'react';
import {
  View,
  WebView,
  StyleSheet,
} from 'react-native';
import Style from '../Style';

export default class WebPageLoader extends Component {
  render() {
    return (
      <View>
        <WebView
          source={{ uri: 'https://hiteshsahu.com' }}
        />
      </View>
    );
  }
}
