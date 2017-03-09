import helper from 'tipsi-appium-helper'

helper.extend('loginToTwitter', async (email, username, password) => {
  const { driver, platform, idFromAccessId, idFromXPath, select } = helper

  const dontThrow = () => {}

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
  const submitButtonId = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[2]/XCUIElementTypeOther[4]/XCUIElementTypeButton[1]
    `),
    android: idFromXPath(`
      //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
      android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/
      android.view.View[2]/android.view.View[4]/android.widget.Button[1]
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
  const confirmEmailSubmitButtonId = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeButton[1]
    `),
    android: idFromXPath(`
      //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
      android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/
      android.widget.Button[1]
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
  const accessToTwitterAccountsTitleId = idFromAccessId('“example” Would Like Access to Twitter Accounts')
  const accessToTwitterAccountsDeclineButtonId = idFromAccessId('Don’t Allow')
  const accessToTwitterAccountsAcceptButtonId = idFromAccessId('OK')
  const selectTwitterAccountLogInAsAnotherUserButtonId = idFromAccessId('Log in as another user')
  const selectTwitterAccountCancelButtonId = idFromAccessId('Cancel')
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

  if (platform('ios')) {
    // Alert
    //
    // Title: “example” Would Like Access to Twitter Accounts
    //
    // Button: Don’t Allow
    // Button: OK
    await driver
      .waitForVisible(accessToTwitterAccountsTitleId, 30001)
      .waitForVisible(accessToTwitterAccountsDeclineButtonId, 30002)
      .waitForVisible(accessToTwitterAccountsAcceptButtonId, 30003)
      .click(accessToTwitterAccountsAcceptButtonId)
      .catch(dontThrow)

    // Action Sheet
    //
    // Buttons: @<Twitter_Username> - optional
    // Button: Log in as another user
    // Button: Cancel
    await driver
      .waitForVisible(selectTwitterAccountLogInAsAnotherUserButtonId, 30004)
      .waitForVisible(selectTwitterAccountCancelButtonId, 30005)
      .click(selectTwitterAccountLogInAsAnotherUserButtonId)
      .catch(dontThrow)

    // Sign in
    await driver
      .waitForVisible(usernameFieldId, 30006)
      .setValue(usernameFieldId, username)
      .click(nextButtonId)
      .setValue(passwordFieldId, password)
      .click(doneButtonId)

    // Confirm Email if needed
    await driver
      .waitForVisible(confirmEmailFieldId, 30009)
      .setValue(confirmEmailFieldId, email)
      .click(doneButtonId)
      .catch(dontThrow)

    // Authorize app if needed
    await driver
      .waitForVisible(authorizeAppButtonId, 30011)
      .click(authorizeAppButtonId)
      .catch(dontThrow)
  }

  if (platform('android')) {
    // Sign out Button
    await driver
      .waitForVisible(signOutButtonId, 30007)
      .click(signOutButtonId)
      .catch(dontThrow)

    // Sign in
    await driver
      .waitForVisible(usernameFieldId, 30008)
      .setValue(usernameFieldId, username)
      .back()
      .setValue(passwordFieldId, password)
      .back()
      .click(submitButtonId)

    // Confirm Email if needed
    await driver
      .waitForVisible(confirmEmailFieldId, 30009)
      .setValue(confirmEmailFieldId, email)
      .back()
      .waitForVisible(confirmEmailSubmitButtonId, 30010)
      .click(confirmEmailSubmitButtonId)
      .catch(dontThrow)

    // Authorize app if needed
    await driver
      .waitForVisible(authorizeAppButtonId, 30011)
      .click(authorizeAppButtonId)
      .catch(dontThrow)
  }
})
