import AddNoteFlow from '../../flows/AddNote.flow'
import EditNoteActions from '../../actions/EditNote.actions'
import TrashCanAssertions from '../../assertions/TrashCan.assertions'
import AddNoteActions from '../../actions/AddNote.actions'

describe('Delete note', () => {
	const title = 'Favorite Heroes'
	const content = 'Spider man\nFlash\nSuper Choque'

	beforeEach(async () => {
		await AddNoteFlow.createNote(title, content)
		await driver.startActivity(
			'com.socialnmobile.dictapps.notepad.color.note',
			'com.socialnmobile.colornote.activity.Main'
		)
	})

	afterEach(async () => {
		await driver.reloadSession()
	})

	it('should delete a note from edit screen', async () => {
		await EditNoteActions.clickInListItemByTitle(title)
		await EditNoteActions.clickInMoreBtn()
		await EditNoteActions.clickInDeleteBtn()

		await driver.acceptAlert()

		await AddNoteActions.clickMenuBtn()
		await AddNoteActions.clickTrashCanBtn()
		await TrashCanAssertions.expectDeletedItemToBeDisplayed(title)
	})

	it('should delete a note from home screen', async () => {
		await EditNoteActions.clickInListItemByTitle(title, 1500)
		await AddNoteActions.clickDeleteBtn()

		await driver.acceptAlert()

		await AddNoteActions.clickMenuBtn()
		await AddNoteActions.clickTrashCanBtn()
		await TrashCanAssertions.expectDeletedItemToBeDisplayed(title)
	})
})
