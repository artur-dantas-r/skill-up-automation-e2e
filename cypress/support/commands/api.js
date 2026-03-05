Cypress.Commands.add('postUser', (user) => {
  return cy.api({
    url: "/users",
    method: "POST",
    failOnStatusCode: false,
    body: user
  }).then(response => { return response })
})

Cypress.Commands.add('postSession', (user) => {
  return cy.api({
    url: "/sessions",
    method: "POST",
    failOnStatusCode: false,
    body: {
      email: user.email, 
      password: user.password
    }
  }).then(response => { return response })
})

Cypress.Commands.add('getTaskById', (id, token) => {
	return cy.api({
		url: `/tasks/${id}`,
		method: 'GET',
		headers: {
			authorization: token
		},
		failOnStatusCode: false
	})
})

Cypress.Commands.add('listTasks', (token) => {
	return cy.api({
		url: '/tasks',
		method: 'GET',
		headers: {
			authorization: token
		},
		failOnStatusCode: false
	})
})

Cypress.Commands.add('createTask', (task, token) => {
	return cy.api({
		url: '/tasks',
		method: 'POST',
		body: task,
		headers: {
			authorization: token
		},
		failOnStatusCode: false
	})
})

Cypress.Commands.add('deleteTask', (taskId, token) => {
	return cy.api({
		url: `/tasks/${taskId}`,
		method: 'DELETE',
		headers: {
			authorization: token
		}, 
		failOnStatusCode: false
	})
})

Cypress.Commands.add('markTaskAsDone', (taskId, token) => {
	return cy.api({
		url: `/tasks/${taskId}/done`,
		method: 'PUT',
		headers: {
			authorization: token
		}, 
		failOnStatusCode: false
	})
})

Cypress.Commands.add('markTaskAsTodo', (taskId, token) => {
	return cy.api({
		url: `/tasks/${taskId}/todo`,
		method: 'PUT',
		headers: {
			authorization: token
		}, 
		failOnStatusCode: false
	})
})