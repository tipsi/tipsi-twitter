import helper from 'tipsi-appium-helper'

helper.extend('getLabel', async (id) => {
  const { driver, platform } = helper
  const attributeName = platform('ios') ? 'label' : 'text'
  const label = await driver.getAttribute(id, attributeName)
  return label.trim()
})
