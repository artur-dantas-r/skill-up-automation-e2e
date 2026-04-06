import AddNoteScreen from '../screens/AddNote.screen'

class AddNoteAssertions {
	async expectAddNoteTextToBeDisplayed() {
		await expect(AddNoteScreen.addNoteText).toBeDisplayed()
	}

	async expectNoteTitleToHaveText(text) {
		await expect(AddNoteScreen.titleEl).toHaveText(text)
	}

	async expectNoteContentToHaveText(text) {
		await expect(AddNoteScreen.textView).toHaveText(text)
	}

	async expectEditBtnToBeDisplayed() {
		await expect(AddNoteScreen.editBtn).toBeDisplayed()
	}
}

export default new AddNoteAssertions()
