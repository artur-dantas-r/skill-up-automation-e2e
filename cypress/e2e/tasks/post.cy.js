describe('POST /tasks', () => {

	let tasks, user

	before(() => {
		cy.fixture("tasks").then(data => {
			tasks = data.post
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

	context('should create a new task', () => {
		

		before(() => {
			cy.purgeQueue()
		})

		after(() => {
			const { newTask } = tasks

			cy.wait(2000)
			cy.getMessageQueue()
				.then(({body, status}) => {
					const {payload} = body[0]
					expect(status).to.be.eq(200)

					cy.wrap(payload)
						.should('contain', user.email)
						.and('contain', user.name.split(" ")[0])
						.and('contain', newTask.name)
				})
		})
		it('steps', () => {
			const { newTask } = tasks
	
			cy.get('@token')
				.then(token => {
					cy.createTask(newTask, token).then(({ body, status }) => {
	
						expect(status).to.be.eq(201)
						expect(body.name).to.be.eq(newTask.name)
						expect(body.is_done).to.not.be.null
						expect(body.tags).to.be.eql(newTask.tags)
						expect(body._id).to.not.be.null
	
						cy.log('Cleaning task created')
	
						cy.deleteTask(body._id, token)
							.its('status')
							.should('eq', 204)
					})
				})
		})
	})

	it.skip('should not create a duplicated task', () => {
		const { duplicatedTask } = tasks

		cy.get('@token').then(token => {

			cy.createTask(duplicatedTask, token).its('body._id').as('firstTaskId')

			cy.createTask(duplicatedTask, token)
				.then(({ body, status }) => {
					expect(status).to.be.eq(409)
					expect(body.message).to.be.eq("Duplicated task!")
				})

			cy.get('@firstTaskId').then((firstTaskId) => {

				cy.log('Cleaning task created')
				cy.deleteTask(firstTaskId, token)
					.its('status')
					.should('eq', 204)
			})
		})
	})

	it.skip('should not create a task with more than tree tags', () => {
		const { moreThanTreeTags } = tasks

		cy.get('@token')
			.then(token => {
				cy.createTask(moreThanTreeTags, token)
					.its('status')
					.should('eq', 400)
			})
	})
})
