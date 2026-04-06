import LoginScreen from '../screens/Login.screen'

class LoginAssertions {
	async expectUsernameErrorMessageToBe(message) {
		await expect(LoginScreen.UsernameErrorMessage).toHaveText(message)
	}

	async expectPasswordErrorMessageToBe(message) {
		await expect(LoginScreen.PasswordErrorMessage).toHaveText(message)
	}
}

export default new LoginAssertions()
