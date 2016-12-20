import test from 'tape-async'
import helper from './utils/helper'

const {
  TWITTER_USER,
  TWITTER_PASS,
} = process.env

const { driver, idFromAccessId, idFromXPath } = helper

test('Test sample auth with Twitter', async(t) => {
  const loginButton = idFromAccessId('loginButton')
  const loginInput = idFromXPath('//*/android.view.View[2]/android.widget.EditText[1]')
  const passwordInput = idFromXPath('//*/android.view.View[4]/android.widget.EditText[1]')
  const okButton = idFromXPath('//*/android.widget.Button[1]')
  const userId = idFromAccessId('twitter_response')

  try {
    await driver.waitForVisible(loginButton, 70000)
    t.pass('`Login with Twitter` button should be visible')

    await driver.click(loginButton)
    t.pass('User can click `Login with Twitter` button')

    await driver.waitForVisible(loginInput, 60000)
    t.pass('loginInput should be visible')
    await driver.click(loginInput)
    await driver.keys(TWITTER_USER)
    t.pass('User should be able to write login')

    await driver.back()

    await driver.waitForVisible(passwordInput, 5000)
    t.pass('passwordInput should be visible')
    await driver.click(passwordInput)
    await driver.keys(TWITTER_PASS)
    t.pass('User should be able to write password')

    await driver.back()

    await driver.waitForVisible(okButton, 5000)
    t.pass('okButton should be visible')
    await driver.click(okButton)
    t.pass('User can click okButton')

    await driver.waitForVisible(userId, 10000)
    t.pass('User authenticated successfully')
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
