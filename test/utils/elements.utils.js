export async function safeClick(element) {
	await element.waitForDisplayed({ timeout: 10000 })
	await element.click()
}

export async function longPress(element, duration) {
	await driver.execute('mobile: longClickGesture', {
		elementId: element.elementId,
		duration
	})
}
