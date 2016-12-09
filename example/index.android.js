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
import { TwitterLoginButton } from 'react-native-twitter-sdk'

export default class example extends Component {

  tipsiLogin() {
    const { fb_userId, fb_access_token, fb_expirationTime } = this.state
    fetch("https://test.gettipsi.com/v001/facebookLogin/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: fb_access_token,
        expires: fb_expirationTime,
        uid: fb_userId,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      if (responseData.user_id) {
        this.setState({
          user_id: responseData.user_id
        })
      }
    })
    .catch((error) => {
        console.error(error);
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
//      AccessToken.getCurrentAccessToken().then(
//        (data) => {
//          this.setState({
//            fb_userId: data.getUserId(),
//            fb_access_token: data.accessToken.toString(),
//            fb_expirationTime: moment(data.expirationTime).format('YYYY-MM-DD'),
//          })
//          this.tipsiLogin()
//        }
//      )
    }
  }


  render() {
    return (
      <View style={styles.container}>
      <TwitterLoginButton
           accessible
           accessibilityLabel={'loginButton'}
           onLoginFinished={this.onTwitterLoginFinished}
           onLogoutFinished={() => alert("logout.")}/>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
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
});

AppRegistry.registerComponent('example', () => example);
