describe('PUT', () => {

	let tasks, user
	let createdTasks = []

	before(() => {
		cy.fixture("tasks").then(data => {
			tasks = data.put
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

	afterEach(() => {

		createdTasks.length > 0 && cy.get("@token")
			.then(token => {
				cy.log('Cleaning task created')
				cy.wrap(createdTasks).each(task => {
					cy.deleteTask(task._id, token)
						.its('status')
						.should('eq', 204)
				})

				createdTasks = []
			})
	})

	context('/tasks/:id/done', () => {
		it('should mark task as done', () => {
			const { singleTask } = tasks

			cy.get("@token").then(token => {
				cy.createTask(singleTask, token)
					.then(({ body }) => {
						createdTasks.push(body)

						return body._id
					})
					.then(taskId => {
						return cy.markTaskAsDone(taskId, token)
							.its('status')
							.should('eq', 204)
							.then(_ => taskId)
					})
					.then(taskId => cy.getTaskById(taskId, token))
					.its('body.is_done')
					.should('eq', true)
			})
		})
		it('should return 404 when task doesnt exist', () => {
			const { singleTask } = tasks

			cy.get("@token").then(token => {
				cy.createTask(singleTask, token)
					.then(({ body }) => {

						return body._id
					})
					.then(taskId => cy.deleteTask(taskId, token).then(_ => taskId))
					.then(taskId => cy.markTaskAsDone(taskId, token))
					.its('status')
					.should('eq', 404)
			})
		})
	})

	context('/tasks/:id/todo', () => {
		it('should apply status todo', () => {
			const { singleTask } = tasks
	
			cy.get("@token").then(token => {
				cy.createTask(singleTask, token)
					.then(({ body }) => {
						createdTasks.push(body)
	
						return body._id
					})
					.then(taskId => cy.markTaskAsDone(taskId, token).then(_ => taskId))
					.then(taskId => {
						return cy.markTaskAsTodo(taskId, token)
							.its('status')
							.should('eq', 204)
							.then(_ => taskId)
					})
					.then(taskId => cy.getTaskById(taskId, token))
					.its('body.is_done')
					.should('eq', false)
			})
		})
	})
})