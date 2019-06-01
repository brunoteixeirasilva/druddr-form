import { getDesktopBreakpoint } from '../../../utils/object/theme/mobile'

const styles = (theme) => ({
	root: {
		position: 'fixed',
		bottom: theme.spacing.unit * 8,
		right: theme.spacing.unit * 2,
		...getDesktopBreakpoint(theme, {
			position: 'fixed',
			bottom: theme.spacing.unit * 2,
			right: theme.spacing.unit * 2
		})
	}
})

export default styles
