import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
import TwitterAuth from 'tipsi-twitter'

TwitterAuth.init({
  twitter_key: '<TWITTER_KEY>',
  twitter_secret: '<TWITTER_SECRET>',
})

export default class Root extends Component {
  state = {
    twitterUserName: '',
    errorMessage: '',
  }

  handleCustomLoginPress = async () => {
    try {
      const result = await TwitterAuth.login()
      this.setState({
        errorMessage: '',
        twitterUserName: result.userName,
      })
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        twitterUserName: '',
      })
    }
  }

  render() {
    const { twitterUserName, errorMessage } = this.state

    return (
      <View style={styles.container}>
        <Button
          title="Login Button"
          accessible
          accessibilityLabel="loginButton"
          onPress={this.handleCustomLoginPress}
        />
        <Text
          accessibilityLabel="twitter_response"
          style={styles.instructions}>
          { twitterUserName !== '' ? `twitterUserName: ${twitterUserName}` : ''}
        </Text>
        <Text
          accessibilityLabel="error_message"
          style={styles.error}>
          {errorMessage}
        </Text>
      </View>
    )
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
  button: {
    marginBottom: 20,
    padding: 20,
  },
})
