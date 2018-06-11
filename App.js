/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  Dimensions
} from 'react-native';
import ReCaptchaView from './ReCaptchaView';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <ReCaptchaView
          onMessage={this.onMessage}
          siteKey="6LcxWV4UAAAAAMYZC7ge5gEgP_QWle44hyvCIARl"
          url='http://your-domain.com'
        />
      </View>
    );
  }

  onMessage = (event) => {
    if (!event) return;
    const data = event.nativeEvent.data;
    console.log(data);
    if (!data) return;
    if (data === 'expired') {
      // onExpired();
    } else if (data === 'error') {
      // onError();
    } else {
      // onSuccess(data);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  webview: {
    flex: 1,
    backgroundColor: 'yellow',
    width: deviceWidth,
    height: deviceHeight
  }
});
