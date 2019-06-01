import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Icon, Fab } from '@material-ui/core'
import styles from './styles'
import { translate } from '../../../../utils/lang'
import ButtonContainer from '../ButtonContainer'

/**
 * Standard system save button. Nb.: this is a newer version.
 * Available props are:
 * * action: {function} will be invoked within the click handler
 * * disabled: {bool} [Optional] will disable the component, given a Bool value
 * * ariaLabel: {string} [Optional] The accessibility reader label
 *
 * @description Created the version 1.0 of this component.
 * @author brunoteixeirasilva
 * @version 1.0
 *
 * @description Created a newer version, changed location of the files.
 * @author brunoteixeirasilva
 * @version 1.1
 *
 * @description Removed "event.preventDefault" from click handler,
 * 				wrote better docs, added another PropType spec.
 * @author brunoteixeirasilva
 * @version 1.2
 *
 * @description Changed component to use Fab.
 * @author brunoteixeirasilva
 * @version 1.3
 */
class SaveButton extends React.PureComponent {
	state = {
		variant: 'round',
		color: 'primary',
		ariaLabelDefault: translate('label/save'),
		icon: 'check'
	}

	handleClick = (event) => {
		const { action } = this.props

		return !!action && typeof action === 'function' && action(event)
	}

	render() {
		const { variant, color, icon } = this.state
		const { classes, disabled, ariaLabel, type } = this.props

		return (
			<ButtonContainer>
				<Fab
					type={type}
					disabled={
						typeof disabled === 'function' ? disabled() : disabled
					}
					variant={variant}
					color={color}
					aria-label={ariaLabel}
					className={classes.saveButton}
					onClick={this.handleClick}
				>
					<Icon className={classes.saveButtonIcon}>{icon}</Icon>
				</Fab>
			</ButtonContainer>
		)
	}
}

SaveButton.defaultProps = {
	disabled: false,
	type: 'button',
	ariaLabel: translate('label/save')
}

SaveButton.propTypes = {
	action: PropTypes.func,
	ariaLabel: PropTypes.string,
	disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
	type: PropTypes.oneOf(['submit', 'button', 'reset'])
}

export default withStyles(styles)(SaveButton)
