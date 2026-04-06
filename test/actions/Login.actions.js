import LoginScreen from '../screens/Login.screen'
import { safeClick } from '../utils/elements.utils'

class LoginActions {
	async login(username, password) {
		await LoginScreen.UsernameInput.addValue(username)
		await LoginScreen.PasswordInput.addValue(password)

		await safeClick(LoginScreen.SubmitLoginBtn)
	}
}

export default new LoginActions()
