import React from 'react'
import PropTypes from 'prop-types'
import { GridSwitch, CommonSwitch } from './type'

/**
 * (Controller) Controls a boolean state of some object in a form.
 *
 * Props usable:
 * * grid: {bool} (default is false)
 * * gridSize: {number} (default is 12, but falsey)
 * * onChange: {function} Invoked at the moment things are changed
 * * checked: {bool} If it is currently checked
 * * name: {string} The component name
 * * label: {string} The component label
 *
 * @author brunoteixeirasilva
 * @version 1.0
 */
class SwitchBox extends React.Component {
	render() {
		const { grid, gridSize, onChange, checked, name, label } = this.props

		return !!grid ? (
			<GridSwitch
				gridSize={gridSize}
				onChange={onChange}
				checked={!!checked}
				name={name}
				label={label}
			/>
		) : (
			<CommonSwitch
				onChange={onChange}
				checked={!!checked}
				name={name}
				label={label}
			/>
		)
	}
}

SwitchBox.propTypes = {
	gridSize: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
}

export default SwitchBox
