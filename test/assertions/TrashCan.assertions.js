import TrashCanScreen from '../screens/TrashCan.screen'

class TrashCanAssertions {
	async expectDeletedItemToBeDisplayed(title) {
		const note = await TrashCanScreen.getNoteByTitle(title)
		await expect(note).toBeDisplayed()
	}
}

export default new TrashCanAssertions()
