describe('Sample', () => {
	it('should find element by accessibility id', async () => {
		const appOption = $('~App')

		// action
		await appOption.click()

		// assertion
		const actionBar = $('~Action Bar')
		await expect(actionBar).toBeExisting()
	})

	it('should type country name and input should keep text', async () => {
		const country = 'Brazil'

		await $('~Views').click()
		await $('~Auto Complete').click()
		await $('~1. Screen Top').click()
		const input = $('id=io.appium.android.apis:id/edit')

		await input.addValue(country)

		expect(await input.getText()).toBe(country)
	})

	it('should navigate directly do screen that i want to test', async () => {
		const country = 'Brazil'

		await driver.startActivity()

		await $('~Views').click()
		await $('~Auto Complete').click()
		await $('~1. Screen Top').click()
		const input = $('id=io.appium.android.apis:id/edit')

		await input.addValue(country)

		expect(await input.getText()).toBe(country)
	})

	it.only('working with date picker', async () => {
		await driver.startActivity(
			'io.appium.android.apis',
			'io.appium.android.apis.view.DateWidgets1'
		)

		const dateEl = $('id=io.appium.android.apis:id/dateDisplay')
		const currentDate = await dateEl.getText()

		await $('~change the date').click()

		await $(
			'android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()'
		)

		await $('//*[@text="10"]').click()

		await $('id=android:id/button1').click()

		expect(await dateEl.getText()).toContain('10')

		expect(await dateEl.getText()).not.toHaveText(currentDate)
	})
})
