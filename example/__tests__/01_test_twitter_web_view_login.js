import test from 'tape-async'
import helper from 'tipsi-appium-helper'

const {
  TWITTER_USER,
  TWITTER_PASS,
} = process.env

const { driver, select, platform, idFromXPath, idFromAccessId } = helper

test('Test Twitter Web View Login', async (t) => {
  const loginButtonID = idFromAccessId('loginButton')

  const permissionAlertID = idFromXPath(`
    //XCUIElementTypeApplication/XCUIElementTypeWindow[6]/
    XCUIElementTypeOther[2]/XCUIElementTypeAlert
  `)

  const permissionAlertAgreeButtonID = idFromXPath(`
    //XCUIElementTypeApplication/XCUIElementTypeWindow[6]/XCUIElementTypeOther[2]/
    XCUIElementTypeAlert/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
    XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/
    XCUIElementTypeButton
  `)

  const loginAsAnotherUserButtonID = idFromXPath(`
    //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/
    XCUIElementTypeSheet/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/
    XCUIElementTypeButton
  `)

  const webViewEmailFieldID = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
      XCUIElementTypeOther[3]/XCUIElementTypeOther
    `),
    android: idFromXPath('//*/android.view.View[2]/android.widget.EditText[1]'),
  })

  const webViewPasswordFieldID = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
      XCUIElementTypeOther[3]/XCUIElementTypeOther[2]
    `),
    android: idFromXPath('//*/android.view.View[4]/android.widget.EditText[1]'),
  })

  const webViewAuthorizeAppButtonID = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
      XCUIElementTypeOther[4]/XCUIElementTypeButton
    `),
    android: idFromXPath('//*/android.widget.Button[1]'),
  })

  const userNameTextID = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeStaticText
    `),
    android: idFromAccessId('twitter_response'),
  })

  try {
    await driver.waitForVisible(loginButtonID, 60000)
    t.pass('The user should be able to see "Login Button" button')

    await driver.click(loginButtonID)
    t.pass('The user should be able to click on "Login Button" button')

    if (platform('ios')) {
      try {
        await driver.waitForVisible(permissionAlertID, 10000)
        t.pass('The user should be able to see social account permission alert view')
        await driver.click(permissionAlertAgreeButtonID)
        t.pass('The user should be able to click on "Agree" button on social account permission alert view')
      } catch (error) {
        // Do nothing...
      }

      try {
        await driver.waitForVisible(loginAsAnotherUserButtonID, 10000)
        t.pass('The user should be able to see "Log in as another user" button')
        await driver.click(loginAsAnotherUserButtonID)
        t.pass('The user should be able to click on "Log in as another user" button')
      } catch (error) {
        // Do nothing...
      }
    }

    // web login
    await driver.waitForVisible(webViewEmailFieldID, 60000)
    t.pass('The user should be able to see "Username or email" field on web view')
    await driver.click(webViewEmailFieldID)
    await driver.keys(TWITTER_USER)
    t.pass('The user should be able fill username to "Username or email" field on web view')

    if (platform('android')) {
      await driver.back()
    }

    await driver.waitForVisible(webViewPasswordFieldID, 60000)
    t.pass('The user should be able to see "Password" field on web view')
    await driver.click(webViewPasswordFieldID)
    await driver.keys(TWITTER_PASS)
    t.pass('The user should be able fill password to "Password" field on web view')

    if (platform('android')) {
      await driver.back()
    }

    await driver.waitForVisible(webViewAuthorizeAppButtonID, 60000)
    t.pass('The user should be able to see "Authorize app" button on web view')
    await driver.click(webViewAuthorizeAppButtonID)
    t.pass('The user should be able to click on "Authorize app" button on web view')

    await driver.waitForVisible(userNameTextID, 60000)
    t.pass('The user should be able to see user name label')
    const userNameText = `twitterUserName: ${TWITTER_USER}`

    const sut_userNameText = await driver.getText(userNameTextID);
    t.equal(sut_userNameText, userNameText, `The user should be able to see user name label with text: "${userNameText}"`);
  } catch (error) {
    await helper.screenshot()
    await helper.source()
    throw error
  }
})
