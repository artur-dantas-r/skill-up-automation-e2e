import EditNoteScreen from '../screens/EditNote.screen'
import { longPress, safeClick } from '../utils/elements.utils'

class EditNoteActions {
	async clickInListItemByTitle(title, duration) {
		const note = await EditNoteScreen.getNoteByTitle(title)
		await note.waitForDisplayed({ timeout: 10000 })

		if (duration) {
			await longPress(note, duration)
			return
		}

		await note.click()
	}

	async clickInMoreBtn() {
		await safeClick(EditNoteScreen.moreBtn)
	}

	async clickInDeleteBtn() {
		await safeClick(EditNoteScreen.deleteBtn)
	}

	async deleteItem() {
		await this.clickInMoreBtn()
		await this.clickInDeleteBtn()
		await driver.acceptAlert()
	}
}

export default new EditNoteActions()
