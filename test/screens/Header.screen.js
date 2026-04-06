class HeaderScreen {
	get menuBtn() {
		return $('~View menu')
	}

	get logInMenuItem() {
		return $('~Login Menu Item')
	}

	get resetMenuItem() {
		return $('//*[@text="Reset App State"]')
	}
}

export default new HeaderScreen()
