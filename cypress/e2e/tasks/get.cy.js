describe('GET', () => {

	let tasks, user
	let createdTasks = []

	before(() => {
		cy.fixture("tasks").then(data => {
			tasks = data.get
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
		cy.get("@token")
			.then(token => {
				cy.wrap(createdTasks).each(task => {
					cy.log('Cleaning task created')

					cy.deleteTask(task._id, token)
						.its('status')
						.should('eq', 204)
				})

				createdTasks = []
			})
	})

	context('/tasks', () => {
		it('should return a list of tasks', () => {
			const { manyTasks } = tasks

			cy.get("@token")
				.then(token => {
					cy.wrap(manyTasks).each(task => {
						cy.createTask(task, token)
							.its('body')
							.then(body => createdTasks.push(body))
					})

					cy.listTasks(token)
						.then(({ body, status }) => {

							expect(status).to.be.eq(200)
							expect(body.length).to.be.eq(manyTasks.length)

							cy.wrap(body).each((task, index) => {
								cy.log(`Verificando dados da task ${index + 1}`)
								expect(task.name).to.be.eq(manyTasks[index].name)
								expect(task.is_done).to.not.be.null
								expect(task.tags).to.be.eql(manyTasks[index].tags)
								expect(task._id).to.not.be.null
							})
						})
				})
		})
	})


	context('/tasks/:id', () => {
		it('should return a unique task', () => {
			const { singleTask } = tasks

			cy.get("@token").then(token => {
				cy.createTask(singleTask, token)
					.then(({ body }) => {
						createdTasks.push(body)
						return body._id
					})
					.then(taskId => cy.getTaskById(taskId, token))
					.then(({ body, status }) => {
						expect(status).to.be.eq(200)
						expect(body.name).to.be.eq(singleTask.name)
						expect(body.is_done).to.not.be.null
						expect(body.tags).to.be.eql(singleTask.tags)
						expect(body._id).to.be.eql(body._id)
					})
			})
		})
		it('should show a message when the task is no more available', () => {
			const { singleTask } = tasks

			cy.get("@token").then(token => {
				cy.createTask(singleTask, token)
					.then(({ body }) => {
						return body._id
					})
					.then(taskId => {
						return cy.deleteTask(taskId, token).then(_ => taskId)
					})
					.then(taskId => cy.getTaskById(taskId, token))
					.its('status')
					.should('eq', 404)
			})
		})
	})
})