import test from 'tape-async'
import helper from './utils/helper'

const { driver, idFromXPath } = helper

test('Twitter native login test', async (t) => {
  const twitterButton = idFromXPath(`
    /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther`
  )
  const usersActionSheet = idFromXPath(`
    /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/XCUIElementTypeSheet`
  )
  const firstUserButton = idFromXPath(`
    /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/
    XCUIElementTypeSheet/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther`
  )
  const loggedAlert = idFromXPath(`
    /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/
    XCUIElementTypeAlert/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeStaticText`
  )

  try {
    await driver.waitForVisible(twitterButton, 30000)
    t.pass('User should see twitter login button')
    await driver.click(twitterButton)
    t.pass('User can click twitter button')

    await driver.waitForVisible(usersActionSheet, 30000)
    t.pass('User should see list of users')
    await driver.click(firstUserButton)
    t.pass('User can choose saved account')

    await driver.waitForVisible(loggedAlert, 30000)
    t.pass('User see login confirmation alert')
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
