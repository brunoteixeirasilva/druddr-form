import React from 'react'
import PropTypes from 'prop-types'
import {
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio
} from '@material-ui/core'

/**
 * @description Created the component
 * @author davispindola
 * @version 1.0
 */
const Checkbox = (props) => {
	const { options, value, onChange, keyValue, keyProp } = props

	return (
		<FormControl component="fieldset">
			<RadioGroup
				aria-label="position"
				name="position"
				value={value}
				onChange={onChange}
				row
			>
				{options.map((option) => (
					<FormControlLabel
						value={
							option[keyValue] instanceof String
								? option[keyValue].toString()
								: option[keyValue]
						}
						key={option[keyProp]}
						control={<Radio color="primary" />}
						label={option.label}
						labelPlacement={option.labelPlacement}
					/>
				))}
			</RadioGroup>
		</FormControl>
	)
}

Checkbox.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			labelPlacement: PropTypes.string
		})
	),
	value: PropTypes.any,
	onChange: PropTypes.func,
	keyValue: PropTypes.string,
	keyProp: PropTypes.string
}

export default Checkbox
