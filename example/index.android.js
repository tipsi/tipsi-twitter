import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
import { TwitterModule } from 'tipsi-twitter'

TwitterModule.init({
  twitter_key: 'T2VS8tuBEOMBO604qSkg',
  twitter_secret: 'yB8RTQUoUvgcQb0DpSXRIcW2GX8aymjFDnQVYMGCo',
})

export default class example extends Component {
  state = {
    twitterUserId: '',
    errorMessage: '',
  }

  handleCustomLoginPress = async () => {
  try {
     const result = await TwitterModule.logIn()
     console.log('Result:', result)
       this.setState({
         errorMessage: '',
         twitterUserId: result.userId,
       })
     } catch (error) {
     console.log(error.name + ': ' + error.message)
       this.setState({
         errorMessage: error.message,
       })
     }
  }

  render() {
    const { twitterAccessToken, twitterTokenSecret, twitterUserId, errorMessage } = this.state

    return (
      <View style={styles.container}>
        <Button
          title="Login Button"
          accessible
          accessibilityLabel='loginButton'
          onPress={this.handleCustomLoginPress}
        />
        <Text
          accessibilityLabel="twitter_response"
          style={styles.instructions}>
          { twitterUserId !== '' ? `twitterUserId: ${twitterUserId}` : ''}
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

AppRegistry.registerComponent('example', () => example)
