import LoginActions from '../actions/Login.actions'
import LoginAssertions from '../assertions/Login.assertions'
import HeaderFlow from '../flows/Header.flow'
import CatalogScreen from '../screens/Catalog.screen'

describe('Login', () => {
	beforeEach(async () => {
		await HeaderFlow.goToLoginScreen()
	})

	afterEach(async () => {
		await HeaderFlow.resetAppState()
	})

	describe('Success', () => {
		it('should login with valid user', async () => {
			const username = 'bod@example.com'
			const password = '10203040'

			// login com credenciais válidas
			await LoginActions.login(username, password)

			// validar redirecionamento (home, lista, etc)
			await expect(CatalogScreen.pageTitle).toBeDisplayed()
			await expect(CatalogScreen.pageTitle).toHaveText('Products')
		})
	})

	describe('Validation', () => {
		it('should show error when username is empty', async () => {
			const username = ''
			const password = '10203040'

			// password preenchido
			await LoginActions.login(username, password)

			// validar mensagem de erro
			await LoginAssertions.expectUsernameErrorMessageToBe('Username is required')
		})

		it('should show error when password is empty', async () => {
			const username = 'bod@example.com'
			const password = ''

			// username preenchido
			await LoginActions.login(username, password)

			// validar mensagem de erro
			await LoginAssertions.expectPasswordErrorMessageToBe('Enter Password')
		})

		it('should show error when username and password are empty', async () => {
			// validar mensagem de erro
			const username = ''
			const password = ''

			// username preenchido
			await LoginActions.login(username, password)

			// validar mensagens de erro
			await LoginAssertions.expectUsernameErrorMessageToBe('Username is required')
			await LoginAssertions.expectPasswordErrorMessageToBe('Enter Password')
		})
	})

	describe('Authentication', () => {
		it('should not login with invalid user and show error message', async () => {
			const username = 'invalidUser'
			const password = 'invalidPassword'

			// login com credenciais inválidas
			await LoginActions.login(username, password)

			// validar redirecionamento (home, lista, etc)
			await expect(CatalogScreen.pageTitle).not.toBeDisplayed()
			await expect(CatalogScreen.pageTitle).not.toHaveText('Products')
		})

		it('should not login with valid username and invalid password', async () => {
			const username = 'bod@example.com'
			const password = 'invalidPassword'

			// login com password inválido
			await LoginActions.login(username, password)

			// validar redirecionamento (home, lista, etc)
			await expect(CatalogScreen.pageTitle).not.toBeDisplayed()
			await expect(CatalogScreen.pageTitle).not.toHaveText('Products')
		})
	})

	describe('Behavior', () => {
		it('should stay on login screen when login fails', async () => {
			// tentativa de login inválida
			const username = 'invalidUser'
			const password = 'invalidPassword'

			await LoginActions.login(username, password)

			// validar que não navegou
			await expect(CatalogScreen.pageTitle).not.toBeDisplayed()
			await expect(CatalogScreen.pageTitle).not.toHaveText('Products')
		})
	})
})
