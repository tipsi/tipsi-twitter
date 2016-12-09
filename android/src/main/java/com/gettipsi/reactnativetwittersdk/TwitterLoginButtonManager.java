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

//
//import com.facebook.login.DefaultAudience;
//import com.facebook.login.LoginBehavior;

public class TwitterLoginButtonManager extends SimpleViewManager<RCTTwitterLoginButton> {

    // Note: Your consumer key and secret should be obfuscated in your source code before shipping.
    private static final String TWITTER_KEY = "T2VS8tuBEOMBO604qSkg";
    private static final String TWITTER_SECRET = "yB8RTQUoUvgcQb0DpSXRIcW2GX8aymjFDnQVYMGCo";

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

//    private ReactApplicationContext mReactApplicationContext;
//    private CallbackManager mCallbackManager;
//
//    public TwitterLoginButtonManager(ReactApplicationContext reactApplicationContext, CallbackManager callbackManager) {
//        mReactApplicationContext = reactApplicationContext;
//        mCallbackManager = callbackManager;
//    }
//
//    @Override
//    public String getName() {
//        return REACT_CLASS;
//    }
//
//    @Override
//    public RCTLoginButton createViewInstance(ThemedReactContext context) {
//        RCTLoginButton button = new RCTLoginButton(context, mCallbackManager);
//        return button;
//
//    }
//
//    @ReactProp(name = "loginBehaviorAndroid")
//    public void setLoginBehavior(RCTLoginButton loginButton, @Nullable String loginBehavior) {
//        loginButton.setLoginBehavior(LoginBehavior.valueOf(loginBehavior.toUpperCase()));
//    }
//
//    @ReactProp(name = "defaultAudience")
//    public void setDefaultAudience(RCTLoginButton loginButton, @Nullable String defaultAudience) {
//        loginButton.setDefaultAudience(DefaultAudience.valueOf(defaultAudience.toUpperCase()));
//    }
//
//    @ReactProp(name = "publishPermissions")
//    public void setPublishPermissions(
//            RCTLoginButton loginButton,
//            @Nullable ReadableArray publishPermissions) {
//        loginButton.setPublishPermissions(reactArrayToJavaStringCollection(publishPermissions));
//    }
//
//    @ReactProp(name = "readPermissions")
//    public void setReadPermissions(
//            RCTLoginButton loginButton,
//            @Nullable ReadableArray readPermissions){
//        loginButton.setReadPermissions(reactArrayToJavaStringCollection(readPermissions));
//    }
//
//    private static List<String> reactArrayToJavaStringCollection(ReadableArray array) {
//        List<String> list = new ArrayList<>();
//        for (int i = 0; i < array.size(); i++) {
//            list.add(array.getString(i));
//        }
//        return list;
//    }
}
