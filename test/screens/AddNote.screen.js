class AddNoteScreen {
	get skipBtn() {
		return $(
			'id=com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip'
		)
	}

	get addNoteText() {
		return $('//*[@text="Add note"]')
	}

	get textOption() {
		return $('//*[@text="Text"]')
	}

	get titleEl() {
		return $(
			'id=com.socialnmobile.dictapps.notepad.color.note:id/edit_title'
		)
	}

	get textEl() {
		return $(
			'id=com.socialnmobile.dictapps.notepad.color.note:id/edit_note'
		)
	}

	get textView() {
		return $(
			'id=com.socialnmobile.dictapps.notepad.color.note:id/view_note'
		)
	}

	get backBtn() {
		return $('id=com.socialnmobile.dictapps.notepad.color.note:id/back_btn')
	}

	get editBtn() {
		return $('id=com.socialnmobile.dictapps.notepad.color.note:id/edit_btn')
	}

	get deleteBtn() {
		return $('~Delete')
	}

	get menuBtn() {
		return $('id=com.socialnmobile.dictapps.notepad.color.note:id/icon_nav')
	}

	get menuTrashCanBtn() {
		return $('//*[@text="Trash Can"]')
	}
}

export default new AddNoteScreen()
