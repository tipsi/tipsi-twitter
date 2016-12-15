import test from 'tape-async'
import helper from './utils/helper'

const { driver, idFromXPath } = helper

test('Twitter web login test', async (t) => {
	const twitterButton = idFromXPath(
		`/XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther`
  )

	const accessAlert = idFromXPath(
		`/XCUIElementTypeApplication/XCUIElementTypeWindow[6]/XCUIElementTypeOther[2]/XCUIElementTypeAlert`
	)

	const agreeButton = idFromXPath(
		`/XCUIElementTypeApplication/XCUIElementTypeWindow[6]/XCUIElementTypeOther[2]/XCUIElementTypeAlert/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/XCUIElementTypeButton`
	)

	const webEmailField = idFromXPath(
		`	/XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeOther`
	)

	const webPasswordField = idFromXPath(
		`/XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeOther[2]`
	)
	const webAuthButton = idFromXPath(
		`/XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[4]/XCUIElementTypeButton`
	)

	const loggedAlert = idFromXPath(
		`/XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/XCUIElementTypeAlert/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeStaticText`
	)

	const loggedAlertOkButton = idFromXPath(
		`/XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther[2]/XCUIElementTypeAlert/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeButton`
	)

	try {
		await driver.waitForVisible(twitterButton, 30000)
    t.pass('User should see twitter login button')
		await driver.click(twitterButton)
		t.pass('User can click twitter button')
		//await driver.pause(1005000)
	} catch (error) {
		await helper.screenshot()
		await helper.source()

		throw error
	}

	try {
		await driver.waitForVisible(accessAlert, 10000)
		t.pass('User should see permission alert')
		await driver.click(agreeButton)
    t.pass('User can click OK button')
	} catch (error) {
	}

// web login
	try {
		await driver.waitForVisible(webEmailField, 30000)
		t.pass('User should see Twitter login web page')
		await driver.click(webEmailField)
		await driver.keys($TWITTER_USER)
		t.pass('User should be able to type Email')

		await driver.click(webPasswordField)
		await driver.keys($TWITTER_PASS)
		t.pass('User should be able to type password')

		await driver.click(webAuthButton)
		t.pass('User can click authorize button')

		await driver.waitForVisible(loggedAlert, 30000)
		t.pass('User see login confirmation alert')
		await driver.click(loggedAlertOkButton)

	} catch (error) {
		await helper.screenshot()
		await helper.source()

		throw error
	}
})
