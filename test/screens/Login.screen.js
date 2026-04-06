class LoginScreen {
	get UsernameInput() {
		return $('id=com.saucelabs.mydemoapp.android:id/nameET')
	}

	get UsernameErrorMessage() {
		return $('id=com.saucelabs.mydemoapp.android:id/nameErrorTV')
	}

	get PasswordInput() {
		return $('id=com.saucelabs.mydemoapp.android:id/passwordET')
	}

	get PasswordErrorMessage() {
		return $('id=com.saucelabs.mydemoapp.android:id/passwordErrorTV')
	}

	get SubmitLoginBtn() {
		return $('~Tap to login with given credentials')
	}
}

export default new LoginScreen()
