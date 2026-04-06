import HeaderScreen from '../screens/Header.screen'
import { safeClick } from '../utils/elements.utils'

class HeaderFlow {
	async goToLoginScreen() {
		await safeClick(HeaderScreen.menuBtn)
		await safeClick(HeaderScreen.logInMenuItem)
	}

	async resetAppState() {
		// await safeClick(HeaderScreen.menuBtn)
		// await safeClick(HeaderScreen.resetMenuItem)

		// await driver.acceptAlert()
		// await $('id=android:id/button1').click()
		await driver.reloadSession()
	}
}

export default new HeaderFlow()
