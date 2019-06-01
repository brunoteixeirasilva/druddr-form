import React from 'react'
import { withStyles } from '@material-ui/core'
import styles from './styles'

/**
 * Container for standardizing the position of button elements,
 * must be used as a wrapper for system buttons
 *
 * @description Creation of the component version 1.0.
 * @author brunoteixeirasilva
 * @version 1.0
 */
class ButtonContainer extends React.Component {
	render() {
		const { classes } = this.props

		return <div className={classes.root}>{this.props.children}</div>
	}
}

export default withStyles(styles)(ButtonContainer)
