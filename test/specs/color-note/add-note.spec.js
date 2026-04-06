import addNoteActions from '../../actions/AddNote.actions'
import AddNoteActions from '../../actions/AddNote.actions'
import AddNoteAssertions from '../../assertions/AddNote.assertions'

describe('Add note', () => {
	before(async () => {
		await AddNoteActions.clickSkipBtn()
		await AddNoteAssertions.expectAddNoteTextToBeDisplayed()
	})

	// descomentar quando tiver mais de um caso de teste
	// afterEach(async () => {
	// 	await driver.reloadSession()
	// })

	it('creates a note', async () => {
		await AddNoteActions.clickAddNoteBtn()
		await AddNoteActions.selectTextOption()

		const title = 'Favorite Heroes'
		const content = 'Spider man\nFlash\nSuper Choque'

		await addNoteActions.createNote(title, content)

		// saves note
		await addNoteActions.saveNote()

		//assertions
		await AddNoteAssertions.expectNoteTitleToHaveText(title)
		await AddNoteAssertions.expectNoteContentToHaveText(content)
		await AddNoteAssertions.expectEditBtnToBeDisplayed()
	})
})

// older version
// describe('Add note', () => {

//     before(async () => {
//         await driver.resetApp()
//     })

//     it('skip tutorial', async () => {
//         await $('id=com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip').click()

//         await expect($('//*[@text="Add note"]')).toBeDisplayed()
//     })

//     it('creates a note', async () => {
//         await $('//*[@text="Add note"]').click()
//         await $('//*[@text="Text"]').click()

//         const title = 'Favorite Heroes'
//         const textValue = 'Spider man\nFlash\nSuper Choque'

//         // add title
//         const titleEl = await $('id=com.socialnmobile.dictapps.notepad.color.note:id/edit_title')
//         await titleEl.addValue(title)

//         // add note
//         const textEl = await $('id=com.socialnmobile.dictapps.notepad.color.note:id/edit_note')
//         await textEl.addValue(textValue)

//         // saves note
//         await driver.back()

//         //assertions
//         await expect(titleEl).toHaveText(title)
//         await expect(textEl).toHaveText(textValue)
//         await expect($('id:com.socialnmobile.dictapps.notepad.color.note:id/edit_btn')).toBeDisplayed()
//     })
// })
