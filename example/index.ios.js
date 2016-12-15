import React, { Component } from 'react'
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import TPSTwitterModule from 'tipsi-twitter'

export default class example extends Component {
  componentWillMount() {
    TPSTwitterModule.init({
      consumerKey: '<TWITTER_KEY>',
      consumerSecret: '<TWITTER_SECRET>',
    })
  }

  handleTwitterPress = async () => {
    try {
      const result = await TPSTwitterModule.login()
      Alert.alert(
        'Login success',
        `@${result.userName}`,
        [{ text: 'OK' }]
      )
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.handleTwitterPress}>
          <Text>Twitter login</Text>
        </TouchableHighlight>
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
})

AppRegistry.registerComponent('example', () => example)
