export default async function hideKeyboard() {
  if (this.platform('ios')) {
    const defaultId = this.idFromXPath(`
      //XCUIElementTypeApplication/XCUIElementTypeWindow[5]/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeKeyboard/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeButton[4]
    `)
    const nextId = this.idFromXPath(`
      //XCUIElementTypeApplication/XCUIElementTypeWindow[4]/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeKeyboard/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeButton[4]
    `)

    let isFound = false

    try {
      await this.driver.click(defaultId)
      isFound = true
    } catch (e) {
      await this.driver.click(nextId)
      isFound = true
    }

    if (!isFound) {
      throw new Error('Done button not found')
    }
  } else {
    await this.driver.back()
  }
}
