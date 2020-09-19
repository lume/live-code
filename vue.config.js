module.exports = {
	// This is needed in order to fix an issue with eslint causing problems when
	// compiling and having a (linked) dependency that has eslintrc. See
	// https://github.com/vuejs/vue-cli/issues/2948
	chainWebpack: config => config.resolve.symlinks(false),
}
