import test from 'tape-async'
import helper from 'tipsi-appium-helper'

const {
  TWITTER_USER,
} = process.env

const { driver, select, idFromXPath, idFromAccessId } = helper

test('Test Twitter Native Login', async (t) => {
  const loginButtonId = idFromAccessId('loginButton')
  const userNameTextId = select({
    ios: idFromXPath('//XCUIElementTypeStaticText[1]'),
    android: idFromAccessId('twitter_response'),
  })

  const accessToTwitterAccountsAcceptButtonId = idFromAccessId('OK')
  const selectTwitterAccountId = idFromAccessId(`@${TWITTER_USER}`)

  try {
    await driver
      .waitForVisible(loginButtonId, 30001)
      .click(loginButtonId)

    t.pass('User should be able to see and tap to login button')

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

    // Select Twitter Account (Sign in)
    await driver
      .waitForVisible(selectTwitterAccountId, 30003)
      .click(selectTwitterAccountId)

    t.pass('User should be able sign to Twitter')

    await driver.waitForVisible(userNameTextId, 30004)

    t.pass('User should see user name')
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
