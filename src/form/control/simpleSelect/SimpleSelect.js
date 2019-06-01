import React from 'react'
import {
	FormControl,
	InputLabel,
	Select,
	withStyles,
	MenuItem,
	Input
} from '@material-ui/core'
import styles from './styles'
import PropTypes from 'prop-types'

/**
 * Will render a default (controlled) form control for select lists.
 * * Note that it can work with **Objects of objects** or **Arrays** or Objects.
 *
 * You can specify the following props:
 * * label: string (required)
 * * name: string (required)
 * * onChange: function (required)
 * * listItems: ObjectOf(Object) or ArrayOf(Object) (required)
 * * currentValue: key (required)
 *
 * @author brunoteixeirasilva
 * @version 1.0
 */
class SimpleSelect extends React.Component {
	handleChange = (event, child) => {
		const { onChange } = this.props

		return onChange(event, event.target.value)
	}

	render() {
		const {
			classes,
			disabled,
			label,
			name,
			listItems,
			currentValue,
			margin
		} = this.props

		let selectValue = !!Boolean(currentValue)
			? !!currentValue.key
				? currentValue.key
				: currentValue
			: ''

		return (
			<FormControl
				margin={margin}
				className={classes.formControl}
				disabled={disabled}
			>
				<InputLabel htmlFor={name}>{label}</InputLabel>
				<Select
					value={selectValue}
					onChange={this.handleChange}
					inputProps={{
						name: `${name}`,
						id: `${name}`
					}}
				>
					{(!listItems || listItems.length === 0) && (
						<MenuItem disabled />
					)}
					{!!listItems &&
						Object.keys(listItems).map((key, index) => {
							return (
								<MenuItem key={key} value={listItems[key].key}>
									{listItems[key].label}
								</MenuItem>
							)
						})}
					{/* {!!listItems &&
						listItems instanceof Array &&
						listItems.length > 0 &&
						listItems.map((item, index) => {
							return (
								<MenuItem key={item.key} value={item.key}>
									{item.label}
								</MenuItem>
							)
						})} */}
				</Select>
			</FormControl>
		)
	}
}

SimpleSelect.defaultProps = {
	margin: 'normal'
}

SimpleSelect.propTypes = {
	margin: PropTypes.string,
	disable: PropTypes.bool,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	currentValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		})
	]),
	listItems: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.arrayOf(
			PropTypes.shape({
				key: PropTypes.string.isRequired,
				label: PropTypes.string.isRequired
			})
		)
	]).isRequired,
	onChange: PropTypes.func
}

export default withStyles(styles)(SimpleSelect)
