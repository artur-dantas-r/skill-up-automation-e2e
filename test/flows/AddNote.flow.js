import AddNoteActions from '../actions/AddNote.actions'

class AddNoteFlow {
	async createNote(title, content) {
		await AddNoteActions.clickSkipBtn()
		await AddNoteActions.clickAddNoteBtn()
		await AddNoteActions.selectTextOption()
		await AddNoteActions.createNote(title, content)
		await AddNoteActions.saveNote()
	}
}

export default new AddNoteFlow()
