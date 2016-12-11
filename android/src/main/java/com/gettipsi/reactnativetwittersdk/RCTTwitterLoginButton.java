package com.gettipsi.reactnativetwittersdk;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.twitter.sdk.android.core.Callback;
import com.twitter.sdk.android.core.Result;
import com.twitter.sdk.android.core.TwitterAuthToken;
import com.twitter.sdk.android.core.TwitterException;
import com.twitter.sdk.android.core.TwitterSession;
import com.twitter.sdk.android.core.identity.TwitterLoginButton;

/**
 * Created by dmitriy on 12/9/16
 */

public class RCTTwitterLoginButton extends TwitterLoginButton {

  private static final String TAG = RCTTwitterLoginButton.class.getSimpleName();
  private ReactContext reactContext;

  public RCTTwitterLoginButton(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
  }

  public RCTTwitterLoginButton(Context context, AttributeSet attrs) {
    super(context, attrs);
  }

  public RCTTwitterLoginButton(Context context, ReactContext reactContext) {
    super(context);
    this.reactContext = reactContext;
    init();
  }


  private void init() {
    this.setCallback(new Callback<TwitterSession>() {
      @Override
      public void success(Result<TwitterSession> loginResult) {
        Log.d(TAG, "success: ");
        final TwitterSession session = loginResult.data;
        final TwitterAuthToken authToken = session.getAuthToken();

        final WritableMap event = Arguments.createMap();
        event.putString("type", "loginFinished");
        event.putString("error", null);
        final WritableMap result = Arguments.createMap();
        result.putBoolean("isCancelled", false);
        result.putString("userId", String.valueOf(session.getUserId()));
        result.putString("userName", session.getUserName());
        final WritableMap token = Arguments.createMap();
        token.putInt("describeContents", authToken.describeContents());
        token.putBoolean("isExpired", authToken.isExpired());
        token.putString("token", authToken.token);
        token.putString("secret", authToken.secret);
        result.putMap("authToken", token);
        event.putMap("result", result);
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
          getId(),
          "topChange",
          event);
      }

      @Override
      public void failure(TwitterException exception) {
        Log.d(TAG, "failure: " + exception.getMessage());
        final WritableMap event = Arguments.createMap();
        event.putString("type", "loginFinished");
        event.putString("error", exception.getMessage());
        final WritableMap result = Arguments.createMap();
        result.putBoolean("isCancelled", false);
        event.putMap("result", result);
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
          getId(),
          "topChange",
          event);
      }
    });
  }
}
