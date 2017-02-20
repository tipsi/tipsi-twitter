import test from 'tape-async'
import helper from 'tipsi-appium-helper'

const {
  TWITTER_EMAIL,
  TWITTER_USER,
  TWITTER_PASS,
} = process.env

const { driver, select, idFromXPath, idFromAccessId } = helper

test('Test Twitter Web View Login', async (t) => {
  const loginButtonId = idFromAccessId('loginButton')
  const userNameTextId = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/
      XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeStaticText[1]
    `),
    android: idFromAccessId('twitter_response'),
  })

  try {
    await driver
      .waitForVisible(loginButtonId, 30001)
      .click(loginButtonId)

    await helper.loginToTwitter(TWITTER_EMAIL, TWITTER_USER, TWITTER_PASS)

    await driver.waitForVisible(userNameTextId, 30002)

    const userNameLabel = await helper.getLabel(userNameTextId)
    t.equal(
      userNameLabel,
      `twitterUserName: ${TWITTER_USER}`,
      'User should be able to sign in to Twitter using web view'
    )
  } catch (error) {
    await helper.screenshot()
    await helper.source()
    throw error
  }
})
