import wdioEslint from '@wdio/eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig(
	wdioEslint.config([
		{
			files: ['**/*.js'],
			languageOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module'
			},
			rules: {
				'no-undef': 'off',
				'@stylistic/indent': ['error', 'tab'],
				'@stylistic/no-tabs': 'off',
				'@stylistic/end-of-line': 'CRLF'
			}
		}
	])
)
