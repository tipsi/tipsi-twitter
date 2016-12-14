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


  public static final String REACT_CLASS = "RCTTwitterLoginButton";
  private static final String TAG = TwitterLoginButtonManager.class.getSimpleName();
  // private final String twitter_key;
  // private final String twitter_secret;
  private RCTTwitterLoginButton twitterLoginButton;

  public TwitterLoginButtonManager(ReactApplicationContext reactApplicationContext) {
//    initTwitter(reactApplicationContext, twitter_key, twitter_secret);

    final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
      @Override
      public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        twitterLoginButton.onActivityResult(requestCode, resultCode, data);
        Log.d(TAG, "onActivityResult");
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
    // initTwitter(reactContext, twitter_key, twitter_secret);
    twitterLoginButton = new RCTTwitterLoginButton(reactContext.getCurrentActivity(), reactContext);
    return twitterLoginButton;
  }

  // private void initTwitter(final ThemedReactContext reactContext, final String twitter_key, final String twitter_secret){
  //   TwitterAuthConfig authConfig = new TwitterAuthConfig(twitter_key, twitter_secret);
  //   Fabric.with(reactContext.getCurrentActivity(), new Twitter(authConfig));
  // }
}
