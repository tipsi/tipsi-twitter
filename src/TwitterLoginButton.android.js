import React, {
  PropTypes,
} from 'react';
import {
  requireNativeComponent,
  StyleSheet,
  View,
} from 'react-native';


type Event = Object;
type TooltipBehaviorIOS = 'auto' | 'force_display' | 'disable';

/**
 * A button that initiates a log in or log out flow upon tapping.
 */
 class TwitterLoginButton extends React.Component {
   static defaultProps: {
     style: typeof styles.defaultButtonStyle,
   };

   props: {
     /**
      * Represents the read permissions to request when the login button
      * is pressed.
      */
     readPermissions?: Array<string>,

     /**
      * Represents the publish permissions to request when the login
      * button is pressed.
      */
     publishPermissions?: Array<string>,

     /**
      * The callback invoked upon error/completion of a login request.
      */
     onLoginFinished?: (error: Object, result: Object) => void,

     /**
      * The callback invoked upon completion of a logout request.
      */
     onLogoutFinished?: () => void,

     /**
      * View style, if any.
      */
     style?: any,
   };

   _eventHandler(event: Event) {
   console.log('EVENT_IN_REACT '+event)
     const eventDict = event.nativeEvent;
     if (eventDict.type === 'loginFinished') {
       if (this.props.onLoginFinished){
         this.props.onLoginFinished(eventDict.error, eventDict.result);
       }
     } else if (eventDict.type === 'logoutFinished') {
       if (this.props.onLogoutFinished) {
         this.props.onLogoutFinished();
       }
     }
   }

   render() {
     return (
       <RCTTwitterLoginButton
         {...this.props}
         onChange={this._eventHandler.bind(this)}
       />
     );
   }
 }

 TwitterLoginButton.propTypes = {
   ...View.propTypes,
   readPermissions: PropTypes.arrayOf(PropTypes.string),
   publishPermissions: PropTypes.arrayOf(PropTypes.string),
   onLoginFinished: PropTypes.func,
   onLogoutFinished: PropTypes.func,
 };

 const styles = StyleSheet.create({
   defaultButtonStyle: {
     height: 45,
     width: 240,
   },
 });

 TwitterLoginButton.defaultProps = {
   style: styles.defaultButtonStyle,
 };

 const RCTTwitterLoginButton = requireNativeComponent(
   'RCTTwitterLoginButton',
   TwitterLoginButton,
   { nativeOnly: { onChange: true } }
 );

 module.exports = TwitterLoginButton;
