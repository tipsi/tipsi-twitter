import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TwitterLoginButton } from 'tipsi-twitter'

TwitterModule.init({
  twitter_key: 'T2VS8tuBEOMBO604qSkg',
  twitter_secret: 'yB8RTQUoUvgcQb0DpSXRIcW2GX8aymjFDnQVYMGCo',
})

export default class example extends Component {

  state = {
    twitterAccessToken: '',
    twitterTokenSecret: '',
    twitterUserId: '',
    errorMessage: '',
  }

  onTwitterLoginFinished = (error, result) => {
    console.log('onTwitterLoginFinished in REACT')
    if (error) {
      alert("login has error: " + error);
         this.setState({
           errorMessage: result.error,
         })
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
    console.log(result)
      this.setState({
        twitterAccessToken: result.authToken.token,
        twitterTokenSecret: result.authToken.secret,
        twitterUserId: result.userId,
      })
    }
  }

  render() {

  const { twitterAccessToken, twitterTokenSecret, twitterUserId, errorMessage } = this.state

    return (
      <View style={styles.container}>
      <TwitterLoginButton
           accessible
           accessibilityLabel="loginButton"
           onLoginFinished={this.onTwitterLoginFinished}
           onLogoutFinished={() => alert("logout.")}/>
        <Text
           accessibilityLabel="twitter_response"
           style={styles.instructions}>
          { twitterAccessToken !== '' ? `twitterAccessToken: ${twitterAccessToken}` : ''} {'\n'}
          { twitterTokenSecret !== '' ? `twitterTokenSecret: ${twitterTokenSecret}` : ''} {'\n'}
          { twitterUserId !== '' ? `twitterUserId: ${twitterUserId}` : ''}
        </Text>
        <Text
          accessibilityLabel="error_message"
          style={styles.error}>
            {errorMessage}
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
