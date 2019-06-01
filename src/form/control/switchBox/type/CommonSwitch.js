import React from 'react'
import PropTypes from 'prop-types'
import { Switch, FormControlLabel } from '@material-ui/core'

/**
 * Prints a common switch component
 * See more at: https://v1-5-0.material-ui.com/demos/selection-controls/#switches-with-formcontrollabel
 */
class CommonSwitch extends React.Component {
	render() {
		const { name, onChange, checked, label } = this.props

		return (
			<FormControlLabel
				onChange={onChange(name)}
				checked={checked}
				name={name}
				value={name}
				control={<Switch />}
				label={label}
			/>
		)
	}
}

CommonSwitch.propTypes = {
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
}

export default CommonSwitch
