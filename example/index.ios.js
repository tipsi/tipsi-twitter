/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import TPSTwitterModule from 'tipsi-twitter'

const initState = {
  tw_userId: '',
  tw_account_identifier: '',
}

export default class example extends Component {
  state = initState

  handleTwitterPress = async () => {
    try {
      const result = await TPSTwitterModule.login();
      this.setState({
        tw_userId: result.userID,
        tw_account_identifier: result.userName
      })
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    TPSTwitterModule.setTwitterKeys(
      {
        consumerKey: '',
        consumerSecret: ''
      }
    );
  }

  render() {
    const { tw_userId, tw_account_identifier } = this.state;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.handleTwitterPress}>
          <Text>Twitter login</Text>
        </TouchableHighlight>
        <View
          style={styles.params}>
          <Text
            accessibilityLabel="tw_userId"
            style={styles.instruction}>
            Twitter id: {tw_userId}
          </Text>
          <Text
            accessibilityLabel="tw_account_identifier"
            style={styles.instruction}>
            Twitter name: {tw_account_identifier}
          </Text>
        </View>
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
  params: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: 300,
  },
});

AppRegistry.registerComponent('example', () => example);
