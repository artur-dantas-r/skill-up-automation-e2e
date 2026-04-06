import { config } from './wdio.conf.js'

config.user = process.env.BROWSERSTACK_USER
config.key = process.env.BROWSERSTACK_KEY
config.port = ''
config.services = [
	[
		'browserstack',
		{
			app: process.env.BROWSERSTACK_APP_PATH,
			browserstackLocal: true,
			accessibility: false,
			testObservabilityOptions: {
				buildName: 'note app test',
				projectName: 'BrowserStack Sample',
				buildTag: '["Test", "integration"]'
			}
		}
	]
]
config.capabilities = [
	{
		platformName: 'android',
		'appium:platformVersion': '15.0',
		'appium:deviceName': 'Google Pixel 9 Pro XL',
		'appium:autoGrantPermissions': true
	}
]
config.commonCapabilities = {
	'bstack:options': {
		debug: true,
		networkLogs: true,
		percy: false,
		percyCaptureMode: 'auto'
	}
}

export { config }
