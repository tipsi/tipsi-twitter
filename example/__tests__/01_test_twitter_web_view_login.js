import test from 'tape-async'
import helper from 'tipsi-appium-helper'

const { TWITTER_EMAIL, TWITTER_USER, TWITTER_PASS } = process.env

const { driver, platform, select, idFromXPath, idFromAccessId } = helper

test('Test Twitter Web View Login', async (t) => {
  const loginButtonId = idFromAccessId('loginButton')
  const userNameTextId = select({
    ios: idFromXPath('//XCUIElementTypeStaticText[1]'),
    android: idFromAccessId('twitter_response'),
  })

  // Web View
  const usernameFieldId = select({
    ios: idFromXPath('//XCUIElementTypeTextField[1]'),
    android: idFromXPath('//android.view.View[2]/android.widget.EditText[1]'),
  })
  const passwordFieldId = select({
    ios: idFromXPath('//XCUIElementTypeSecureTextField[1]'),
    android: idFromXPath('//android.view.View[4]/android.widget.EditText[1]'),
  })
  const confirmEmailFieldId = select({
    ios: idFromXPath('//XCUIElementTypeTextField[1]'),
    android: idFromXPath('//android.view.View[7]/android.widget.EditText[1]'),
  })
  const authorizeAppButtonId = select({
    ios: idFromXPath('//XCUIElementTypeOther[3]/XCUIElementTypeButton[1]'),
    android: idFromXPath('//android.view.View[3]/android.widget.Button[1]'),
  })

  // iOS only
  const accessToTwitterAccountsAcceptButtonId = idFromAccessId('OK')
  const selectTwitterAccountLogInAsAnotherUserButtonId = idFromAccessId('Log in as another user')
  const doneButtonId = idFromXPath('//XCUIElementTypeButton[4]')
  const nextButtonId = idFromXPath('//XCUIElementTypeButton[2]')

  // Android only
  const signOutButtonId = idFromXPath('//android.view.View[1]/android.widget.Button[1]')
  const submitButtonId = idFromXPath('//android.view.View[4]/android.widget.Button[1]')
  const confirmEmailButtonId = idFromXPath('//android.webkit.WebView[1]/android.widget.Button[1]')

  try {
    await driver.waitForVisible(loginButtonId, 30001)
    await driver.click(loginButtonId)
    t.pass('User should be able to see and tap to login button')

    // Login To Twitter
    if (platform('ios')) {

      // Access To Twitter Accounts if needed
      try {
        await driver.waitForVisible(accessToTwitterAccountsAcceptButtonId, 30002)
        await driver.click(accessToTwitterAccountsAcceptButtonId)
        t.pass('User should see access to twitter accounts alert')
      } catch (e) {
        // Do nothing
      }

      // Select Twitter Account if needed
      try {
        await driver.waitForVisible(selectTwitterAccountLogInAsAnotherUserButtonId, 30003)
        await driver.click(selectTwitterAccountLogInAsAnotherUserButtonId)
        t.pass('User should see select twitter account action sheet')
      } catch (e) {
        // Do nothing
      }

      // Sign in
      await driver.waitForVisible(usernameFieldId, 30004)
      await driver.setValue(usernameFieldId, TWITTER_USER)
      t.pass('User should type twitter username')

      await driver.setValue(passwordFieldId, TWITTER_PASS)
      t.pass('User should type twitter password')

      await driver.click(doneButtonId)
      t.pass('User should click done button')

      // Confirm Email if needed
      try {
        await driver.waitForVisible(confirmEmailFieldId, 30005)
        await driver.setValue(confirmEmailFieldId, TWITTER_EMAIL)
        await driver.click(doneButtonId)
        t.pass('User should see confirm twitter email web page')
      } catch (e) {
        // Do nothing
      }
    } else {

      // Sign out if needed
      try {
        await driver.waitForVisible(signOutButtonId, 30008)
        await driver.click(signOutButtonId)
        t.pass('User should not see sign out web page')
      } catch (e) {
        // Do nothing
      }

      // Sign in
      await driver.waitForVisible(usernameFieldId, 30009)
      await driver.setValue(usernameFieldId, TWITTER_USER)
      await driver.back()

      await driver.setValue(passwordFieldId, TWITTER_PASS)
      await driver.back()

      await driver.click(submitButtonId)
      t.pass('User should to see twitter sign in web page and should be able tap to submit button')

      // Confirm Email if needed
      try {
        await driver.waitForVisible(confirmEmailFieldId, 30010)
        await driver.setValue(confirmEmailFieldId, TWITTER_EMAIL)
        await driver.back()

        await driver.waitForVisible(confirmEmailButtonId, 30011)
        await driver.click(confirmEmailButtonId)
        t.pass('User should see confirm twitter email web page')
      } catch (e) {
        // Do nothing
      }
    }

    // Authorize app if needed
    try {
      await driver.waitForVisible(authorizeAppButtonId, 30012)
      await driver.click(authorizeAppButtonId)
      t.pass('User should see authorize button after confirm twitter email web page')
    } catch (e) {
      // Do nothing
    }

    await driver.waitForVisible(userNameTextId, 30013)
    t.pass('User should see user name')
  } catch (error) {
    await helper.screenshot()
    await helper.source()
    throw error
  }
})
