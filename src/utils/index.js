/**
 * Generates a random string using a predefined chart-array
 *
 * @description Created the component
 * @author brunoteixeirasilva
 * @version 1.0
 *
 * @param {Number} length Length of the random string being generated
 */
export const generateRandom = (length) => {
	var charset =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%¨&*()_+{[}]?/;:',
		returnVal = ''

	for (var i = 0, n = charset.length; i < length; ++i) {
		returnVal += charset.charAt(Math.floor(Math.random() * n))
	}

	return returnVal
}

/**
 * Prepares a breakpoint object for JSS objects. **You should spread the resultant object**
 *
 * @description Created the function
 * @author lopes
 * @version 1.0
 *
 * @param {import("@material-ui/core/styles/MuiThemeProvider").MuiThemeProviderProps} theme The theme object
 * @param {Object} props The final props at the breakpoint object
 */
export const getDesktopBreakpoint = (theme, props) => ({
	[theme.breakpoints.up('sm')]: {
		...props
	}
})
