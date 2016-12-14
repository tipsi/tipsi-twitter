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
import { TwitterLoginButton, TwitterModule } from 'react-native-twitter-sdk'

export default class example extends Component {

  state = {
    twitter_access_token: '',
    twitter_token_secret: '',
    twitter_userId: '',
    user_id: '',
    full_response: '',
    error_message: '',
  }

  tipsiLogin() {
    const { twitter_access_token, twitter_token_secret, twitter_userId, error_message, full_response } = this.state
    fetch("https://test.gettipsi.com/v001/twitterLogin/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: twitter_access_token,
        access_token_secret: twitter_token_secret,
        uid: twitter_userId,
        account_identifier: '',
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log('RESPONSE '+responseData);
      full_response: responseData;
      if (responseData.user_id) {
        this.setState({
          user_id: responseData.user_id
        })
      } else if(responseData.error_message){
        this.setState({
          error_message: responseData.error_message
        })
      }
    })
    .catch((error) => {
        console.error('ERROR '+error);
      });
  }

  onTwitterLoginFinished = (error, result) => {
    console.log('onTwitterLoginFinished in REACT')
    if (error) {
      alert("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
    console.log(result)
          this.setState({
            twitter_access_token: result.authToken.token,
            twitter_token_secret: result.authToken.secret,
            twitter_userId: result.userId,
          })
          this.tipsiLogin()
    }
  }


  render() {

  const { twitter_access_token, twitter_token_secret, twitter_userId, full_response, error_message } = this.state

    return (
      <View style={styles.container}>
      <TwitterLoginButton
           accessible
           accessibilityLabel={'loginButton'}
           onLoginFinished={this.onTwitterLoginFinished}
           onLogoutFinished={() => alert("logout.")}/>
        <Text style={styles.instructions}>
          { twitter_access_token != '' ? 'twitter_access_token: ' + twitter_access_token : ''} {'\n'}
          { twitter_token_secret != '' ? 'twitter_token_secret: ' + twitter_token_secret : ''} {'\n'}
          { twitter_userId != '' ? 'twitter_userId: ' + twitter_userId : ''}
        </Text>
        <Text
          accessibilityLabel="tipsi_response"
          style={styles.instructions}>
            { full_response != '' ? 'Tipsi response: ' + full_response : ''}
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
