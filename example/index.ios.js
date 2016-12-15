/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import TPSTwitterModule from 'tipsi-twitter'

export default class example extends Component {

  initTwitter = async () => {
    try {
      const result = await TPSTwitterModule.init(
        {
          consumerKey: $TWITTER_KEY,
          consumerSecret: $TWITTER_SECRET
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  handleTwitterPress = async () => {
    try {
      const result = await TPSTwitterModule.login();
      Alert.alert(
        'Login success',
        '@' + result.userName,
        [
          {text: 'OK'},
        ]
      );
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    this.initTwitter()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.handleTwitterPress}>
          <Text>Twitter login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('example', () => example);
