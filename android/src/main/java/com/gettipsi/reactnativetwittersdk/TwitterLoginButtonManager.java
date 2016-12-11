package com.gettipsi.reactnativetwittersdk;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.twitter.sdk.android.Twitter;
import com.twitter.sdk.android.core.TwitterAuthConfig;

import io.fabric.sdk.android.Fabric;


public class TwitterLoginButtonManager extends SimpleViewManager<RCTTwitterLoginButton> {

  // Note: Your consumer key and secret should be obfuscated in your source code before shipping.
  private static final String TWITTER_KEY = "TWITTER_KEY";
  private static final String TWITTER_SECRET = "TWITTER_SECRET";

  public static final String REACT_CLASS = "RCTTwitterLoginButton";
  private static final String TAG = TwitterLoginButtonManager.class.getSimpleName();
  private RCTTwitterLoginButton twitterLoginButton;

  public TwitterLoginButtonManager(ReactApplicationContext reactApplicationContext) {
    ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
      @Override
      public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        twitterLoginButton.onActivityResult(requestCode, resultCode, data);
        Log.d(TAG, "onActivityResult: QQQ");
        super.onActivityResult(activity, requestCode, resultCode, data);
      }
    };
    reactApplicationContext.addActivityEventListener(mActivityEventListener);
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected RCTTwitterLoginButton createViewInstance(ThemedReactContext reactContext) {
    TwitterAuthConfig authConfig = new TwitterAuthConfig(TWITTER_KEY, TWITTER_SECRET);
    Fabric.with(reactContext.getCurrentActivity(), new Twitter(authConfig));
    twitterLoginButton = new RCTTwitterLoginButton(reactContext.getCurrentActivity(), reactContext);
    return twitterLoginButton;
  }
}
