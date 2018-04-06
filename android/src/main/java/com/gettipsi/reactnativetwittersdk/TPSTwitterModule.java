package com.gettipsi.reactnativetwittersdk;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.twitter.sdk.android.core.Callback;
import com.twitter.sdk.android.core.DefaultLogger;
import com.twitter.sdk.android.core.Result;
import com.twitter.sdk.android.core.Twitter;
import com.twitter.sdk.android.core.TwitterAuthConfig;
import com.twitter.sdk.android.core.TwitterAuthToken;
import com.twitter.sdk.android.core.TwitterConfig;
import com.twitter.sdk.android.core.TwitterException;
import com.twitter.sdk.android.core.TwitterSession;
import com.twitter.sdk.android.core.identity.TwitterAuthClient;

/**
 * This is a {@link NativeModule} that allows JS to use login feature of twitter-kit sdk.
 */
public class TPSTwitterModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

  private static final String TAG = TPSTwitterModule.class.getSimpleName();
  private ReadableMap currentData;
  private TwitterAuthClient twitterAuthClient;

  public TPSTwitterModule(ReactApplicationContext reactContext) {
    super(reactContext);
    final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
      @Override
      public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        Log.d(TAG, "onActivityResult");
        if (requestCode == getTwitterAuthClient().getRequestCode())
          getTwitterAuthClient().onActivityResult(requestCode, resultCode, data);
        super.onActivityResult(activity, requestCode, resultCode, data);
      }
    };
    reactContext.addLifecycleEventListener(this);
    reactContext.addActivityEventListener(mActivityEventListener);
  }

  @Override
  public String getName() {
    return "TPSTwitterModule";
  }

  @ReactMethod
  public void init(final ReadableMap map) {
    if (getCurrentActivity() == null) {
      currentData = map;
    } else {
      initTwitter(map);
    }
  }

  @ReactMethod
  public void login(final Promise promise) {
    Log.d(TAG, "logIn: ");
    if (getCurrentActivity() != null)
      getTwitterAuthClient().authorize(getCurrentActivity(), new Callback<TwitterSession>() {
        @Override
        public void success(Result<TwitterSession> loginResult) {
          Log.d(TAG, "success: ");
          final TwitterSession session = loginResult.data;
          final TwitterAuthToken authToken = session.getAuthToken();

          final WritableMap result = Arguments.createMap();
          result.putString("authToken", authToken.token);
          result.putString("authTokenSecret", authToken.secret);
          result.putString("userID", String.valueOf(session.getUserId()));
          result.putString("userName", session.getUserName());

          promise.resolve(result);
        }

        @Override
        public void failure(TwitterException exception) {
          Log.d(TAG, "failure: ");
          promise.reject(TAG, exception.getMessage());
        }
      });

  }

  @Override
  public void onHostResume() {
    if (currentData != null) {
      initTwitter(currentData);
    }
  }

  @Override
  public void onHostPause() {
  }

  @Override
  public void onHostDestroy() {
  }

  private void initTwitter(final ReadableMap map) {
    TwitterAuthConfig authConfig = new TwitterAuthConfig(map.getString("twitter_key"), map.getString("twitter_secret"));
    TwitterConfig config = new TwitterConfig.Builder(getReactApplicationContext())
      .logger(new DefaultLogger(Log.DEBUG))
      .twitterAuthConfig(authConfig)
      .build();
    Twitter.initialize(config);
  }

  private TwitterAuthClient getTwitterAuthClient() {
    if (twitterAuthClient == null) {
      twitterAuthClient = new TwitterAuthClient();
    }
    return twitterAuthClient;
  }
}
