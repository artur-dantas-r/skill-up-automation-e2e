class TrashCanScreen {
	async getNoteByTitle(title) {
		return $(`//*[@text="${title}"]`)
	}
}

export default new TrashCanScreen()
