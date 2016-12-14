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
  View
} from 'react-native';
import { TwitterLoginButton } from 'tipsi-twitter'

export default class example extends Component {

  state = {
    twitter_access_token: '',
    twitter_token_secret: '',
    twitter_userId: '',
    error_message: '',
  }

  onTwitterLoginFinished = (error, result) => {
    console.log('onTwitterLoginFinished in REACT')
    if (error) {
      alert("login has error: " + error);
         this.setState({
           error_message: result.error,
         })
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
    console.log(result)
          this.setState({
            twitter_access_token: result.authToken.token,
            twitter_token_secret: result.authToken.secret,
            twitter_userId: result.userId,
          })
    }
  }

  render() {

  const { twitter_access_token, twitter_token_secret, twitter_userId, error_message } = this.state

    return (
      <View style={styles.container}>
      <TwitterLoginButton
           accessible
           accessibilityLabel={'loginButton'}
           onLoginFinished={this.onTwitterLoginFinished}
           onLogoutFinished={() => alert("logout.")}/>
        <Text
           accessibilityLabel="twitter_response"
           style={styles.instructions}>
          { twitter_access_token != '' ? 'twitter_access_token: ' + twitter_access_token : ''} {'\n'}
          { twitter_token_secret != '' ? 'twitter_token_secret: ' + twitter_token_secret : ''} {'\n'}
          { twitter_userId != '' ? 'twitter_userId: ' + twitter_userId : ''}
        </Text>
        <Text
          accessibilityLabel="error_message"
          style={styles.error}>
            {error_message}
        </Text>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  error: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FF0000',
  },
});

AppRegistry.registerComponent('example', () => example);
