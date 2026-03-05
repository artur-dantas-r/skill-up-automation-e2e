const apiUrl = Cypress.env('cloudAmqpApi')
const authAmqp = Cypress.env('cloudAmqpAuth')

Cypress.Commands.add('getMessageQueue', () => {
	return cy.api({
		url: `${apiUrl}/tasks/get`,
		method: "POST",
		failOnStatusCode: false,
		body: {
			count: 1,
			ack_mode: "reject_requeue_true",
			encoding: "auto",
			truncate: 50000
		}, 
		headers: {
			authorization: authAmqp
		}
	}).then(response => { return response })
})

Cypress.Commands.add('purgeQueue', () => {
	return cy.api({
		url: `${apiUrl}/tasks/contents`,
		method: "DELETE",
		failOnStatusCode: false, 
		headers: {
			authorization: authAmqp
		}
	}).then(response => { return response })
})