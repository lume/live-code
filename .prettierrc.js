module.exports = {
	useTabs: true,
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: false,
	printWidth: 120,
	arrowParens: 'avoid',
	vueIndentScriptAndStyle: true,
	overrides: [
		{
			files: '*.md',
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
		{
			files: ['*.yaml', '*.yml'],
			options: {
				useTabs: false,
				tabWidth: 4,
			},
		},
	],
}
