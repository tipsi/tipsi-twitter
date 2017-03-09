import test from 'tape-async'
import helper from 'tipsi-appium-helper'

const {
  TWITTER_EMAIL,
  TWITTER_USER,
  TWITTER_PASS,
} = process.env

const { driver, platform, select, idFromXPath, idFromAccessId } = helper

test('Test Twitter Web View Login', async (t) => {
  const loginButtonId = idFromAccessId('loginButton')
  const userNameTextId = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeStaticText[1]
    `),
    android: idFromAccessId('twitter_response'),
  })

  // Web View
  const usernameFieldId = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeOther[1]/
      XCUIElementTypeTextField[1]
    `),
    android: idFromXPath(`
      //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
      android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/
      android.view.View[2]/android.view.View[3]/android.view.View[2]/android.widget.EditText[1]
    `),
  })
  const passwordFieldId = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeOther[2]/
      XCUIElementTypeSecureTextField[1]
    `),
    android: idFromXPath(`
      //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
      android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/
      android.view.View[2]/android.view.View[3]/android.view.View[4]/android.widget.EditText[1]
    `),
  })
  const confirmEmailFieldId = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[9]/XCUIElementTypeTextField[1]
    `),
    android: idFromXPath(`
      //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
      android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/
      android.view.View[7]/android.widget.EditText[1]
    `),
  })
  const authorizeAppButtonId = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeButton[1]
    `),
    android: idFromXPath(`
      //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
      android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/
      android.view.View[2]/android.view.View[3]/android.widget.Button[1]
    `),
  })
  // iOS only
  const accessToTwitterAccountsAcceptButtonId = idFromAccessId('OK')
  const selectTwitterAccountLogInAsAnotherUserButtonId = idFromAccessId('Log in as another user')
  const doneButtonId = idFromXPath(`
    //XCUIElementTypeApplication[1]/XCUIElementTypeWindow[4]/XCUIElementTypeOther[1]/
    XCUIElementTypeOther[1]/XCUIElementTypeOther[3]/XCUIElementTypeKeyboard[1]/XCUIElementTypeOther[1]/
    XCUIElementTypeOther[1]/XCUIElementTypeButton[4]
  `)
  const nextButtonId = idFromXPath(`
    //XCUIElementTypeApplication[1]/XCUIElementTypeWindow[2]/XCUIElementTypeOther[1]/
    XCUIElementTypeOther[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeToolbar[1]/
    XCUIElementTypeButton[2]`
  )
  // Android only
  const signOutButtonId = idFromXPath(`
    //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
    android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/
    android.view.View[1]/android.view.View[2]/android.widget.ListView[1]/android.view.View[1]/
    android.widget.Button[1]
  `)
  const submitButtonId = idFromXPath(`
    //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
    android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/
    android.view.View[2]/android.view.View[4]/android.widget.Button[1]
  `)
  const confirmEmailSubmitButtonId = idFromXPath(`
    //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
    android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/
    android.widget.Button[1]
  `)

  try {
    await driver
      .waitForVisible(loginButtonId, 30001)
      .click(loginButtonId)
    t.pass('User should be able to see and tap to login button')

    // Login To Twitter
    if (platform('ios')) {
      // Access To Twitter Accounts if needed
      await driver
        .waitForVisible(accessToTwitterAccountsAcceptButtonId, 30002)
        .click(accessToTwitterAccountsAcceptButtonId)
        .then(() => (
          t.pass('User should see access to twitter accounts alert')
        ))
        .catch(() => (
          t.pass('User should not see access to twitter accounts alert')
        ))

      // Select Twitter Account if needed
      await driver
        .waitForVisible(selectTwitterAccountLogInAsAnotherUserButtonId, 30003)
        .click(selectTwitterAccountLogInAsAnotherUserButtonId)
        .then(() => (
          t.pass('User should see select twitter account action sheet')
        ))
        .catch(() => (
          t.pass('User should not see select twitter account action sheet')
        ))

      // Sign in
      await driver
        .waitForVisible(usernameFieldId, 30004)
        .setValue(usernameFieldId, TWITTER_USER)
        .click(nextButtonId)
        .setValue(passwordFieldId, TWITTER_PASS)
        .click(doneButtonId)

      t.pass('User should be able sign to Twitter')

      // Confirm Email if needed
      await driver
        .waitForVisible(confirmEmailFieldId, 30005)
        .setValue(confirmEmailFieldId, TWITTER_EMAIL)
        .click(doneButtonId)
        .then(() => (
          t.pass('User should see confirm twitter email web page')
        ))
        .catch(() => (
          t.pass('User should not see confirm twitter email web page')
        ))
    } else {
      // Sign out if needed
      await driver
        .waitForVisible(signOutButtonId, 30008)
        .click(signOutButtonId)
        .then(() => (
          t.pass('User should not see sign out web page')
        ))
        .catch(() => (
          t.pass('User should not see sign out web page')
        ))

      // Sign in
      await driver
        .waitForVisible(usernameFieldId, 30009)
        .setValue(usernameFieldId, TWITTER_USER)
        .back()
        .setValue(passwordFieldId, TWITTER_PASS)
        .back()
        .click(submitButtonId)

      t.pass('User should to see twitter sign in web page and should be able tap to submit button')

      // Confirm Email if needed
      await driver
        .waitForVisible(confirmEmailFieldId, 30010)
        .setValue(confirmEmailFieldId, TWITTER_EMAIL)
        .back()
        .waitForVisible(confirmEmailSubmitButtonId, 30011)
        .click(confirmEmailSubmitButtonId)
        .then(() => (
          t.pass('User should see confirm twitter email web page')
        ))
        .catch(() => (
          t.pass('User should not see confirm twitter email web page')
        ))
    }

    // Authorize app if needed
    await driver
      .waitForVisible(authorizeAppButtonId, 30012)
      .click(authorizeAppButtonId)
      .then(() => (
        t.pass('User should see authorize button after confirm twitter email web page')
      ))
      .catch(() => (
        t.pass('User should not see authorize button after confirm twitter email web page')
      ))

    await driver.waitForVisible(userNameTextId, 30013)
    t.pass('User should see user name')
  } catch (error) {
    await helper.screenshot()
    await helper.source()
    throw error
  }
})
