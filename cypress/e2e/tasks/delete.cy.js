describe('DELETE /tasks', () => {

	let tasks, user

	before(() => {
		cy.fixture("tasks").then(data => {
			tasks = data.delete
		})
		cy.fixture("users").then(data => {
			user = data
		})
	})

	beforeEach(() => {
		cy.task('deleteUser', user.email)

		cy.postUser(user)

		cy.postSession(user)
			.its('body.token')
			.as('token')
	})

	it('should delete a task', () => {
		const { singleTask } = tasks

		cy.get("@token").then(token => {
			cy.createTask(singleTask, token)
				.then(({ body }) => {
					return body._id
				})
				.then(taskId => cy.deleteTask(taskId, token))
				.its('status')
				.should('eq', 204)
		})
	})

	it('should return message when task do not exist', () => {
		const { singleTask } = tasks

		cy.get("@token").then(token => {
			cy.createTask(singleTask, token)
				.then(({ body }) => {
					return body._id
				})
				.then(taskId => cy.deleteTask(taskId, token).then(_ => taskId))
				.then(taskId => cy.deleteTask(taskId, token))
				.its('status')
				.should('eq', 404)
		})
	})
})