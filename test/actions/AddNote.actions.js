import AddNoteScreen from '../screens/AddNote.screen'
import { safeClick } from '../utils/elements.utils'

class AddNoteActions {
	async clickSkipBtn() {
		await safeClick(AddNoteScreen.skipBtn)
	}

	async clickAddNoteBtn() {
		await safeClick(AddNoteScreen.addNoteText)
	}

	async selectTextOption() {
		await safeClick(AddNoteScreen.textOption)
	}

	async fillNoteTitle(value) {
		await AddNoteScreen.titleEl.addValue(value)
	}

	async fillNoteContent(value) {
		await AddNoteScreen.textEl.addValue(value)
	}

	async createNote(title, content) {
		await this.fillNoteTitle(title)
		await this.fillNoteContent(content)
	}

	async saveNote() {
		await safeClick(AddNoteScreen.backBtn)
	}

	async clickDeleteBtn() {
		await safeClick(AddNoteScreen.deleteBtn)
	}

	async clickMenuBtn() {
		await safeClick(AddNoteScreen.menuBtn)
	}

	async clickTrashCanBtn() {
		await safeClick(AddNoteScreen.menuTrashCanBtn)
	}
}

export default new AddNoteActions()
