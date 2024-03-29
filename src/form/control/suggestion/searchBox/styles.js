const styles = (theme) => ({
	root: {
		flexGrow: 1
		//height: 250,
	},
	container: {
		flexGrow: 1,
		position: 'relative'
	},
	paper: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit / 2,
		left: 0,
		right: 0
	},
	dropUp: {
		top: 'auto',
		bottom: '100%',
		marginBottom: theme.spacing.unit / 2
	},
	chip: {
		margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
	},
	inputRoot: {
		flexWrap: 'wrap'
	}
})

export default styles
