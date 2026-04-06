class EditNoteScreen {
	get editBtn() {
		return $('id:com.socialnmobile.dictapps.notepad.color.note:id/edit_btn')
	}

	async getNoteByTitle(title) {
		return $(`//*[@text="${title}"]`)
	}

	get moreBtn() {
		return $('~More')
	}

	get deleteBtn() {
		return $('//*[@text="Delete"]')
	}
}

export default new EditNoteScreen()
