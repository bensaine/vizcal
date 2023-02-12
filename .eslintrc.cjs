module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		sourceType: 'module',
		ecmaVersion: 2021
	},
	rules: {
		'react/prop-types': 'off',
		'prettier/prettier': 'off',
		'no-unused-vars': 'warn'
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:prettier/recommended'
	]
}
