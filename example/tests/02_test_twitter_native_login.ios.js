import test from 'tape-async'
import helper from './utils/helper'

const {
  TWITTER_USER,
  TWITTER_PASS,
} = process.env

const { driver, idFromXPath, idFromAccessId } = helper

test('Test Twitter Native Login', async (t) => {
  const loginButtonID = idFromAccessId('loginButton')

  const usersActionSheetID = idFromXPath(`
    //XCUIElementTypeApplication/XCUIElementTypeWindow/
    XCUIElementTypeOther[2]/XCUIElementTypeSheet
  `)

  const firstUserButtonID = idFromXPath(`
    /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/
    XCUIElementTypeSheet/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther
  `)

  const userNameTextID = idFromXPath(`
    //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeStaticText
  `)

  try {
    await driver.waitForVisible(loginButtonID, 60000)
    t.pass('The user should be able to see "Login Button" button')

    await driver.click(loginButtonID)
    t.pass('The user should be able to click on "Login Button" button')

    await driver.waitForVisible(usersActionSheetID, 60000)
    t.pass('The user should be able to see list of twitter accounts')

    await driver.click(firstUserButtonID)
    t.pass('The user should be able to choose first twitter account')

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
