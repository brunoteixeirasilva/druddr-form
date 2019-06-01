import React from 'react'
import classNames from 'classnames'
import Downshift from 'downshift'
import keycode from 'keycode'
import PropTypes from 'prop-types'
import { withStyles, Paper, Chip } from '@material-ui/core'
import styles from './styles'
import { renderInput } from './input'
import { renderSuggestion, getSuggestions } from './suggestion'

/**
 * Builds a group search-box
 *
 * @description Created this component
 * @author brunoteixeirasilva
 * @version 1.0
 */
class SuggestionSearchBox extends React.Component {
	state = {
		inputValue: '',
		selectedItem: []
	}

	handleKeyDown = (event) => {
		const { inputValue, selectedItem } = this.state

		if (
			selectedItem.length &&
			!inputValue.length &&
			keycode(event) === 'backspace'
		) {
			this.setState({
				selectedItem: selectedItem.slice(0, selectedItem.length - 1)
			})
		}
	}

	handleInputChange = (event) => {
		this.setState({ inputValue: event.target.value })
	}

	handleChange = (item) => {
		let { selectedItem } = this.state

		//Current item isn't selected yet
		if (selectedItem.indexOf(item) === -1) {
			selectedItem = [...selectedItem, item]
		}

		/**
		 * Sets input empty again,
		 * Adds the item to the state
		 */
		this.setState({
			inputValue: '',
			selectedItem
		})

		//Required prop usage!
		this.props.onSelect(item, selectedItem)
	}

	handleDelete = (item) => () => {
		let selectedItem = [...this.state.selectedItem]
		selectedItem.splice(selectedItem.indexOf(item), 1)

		//An specific onDelete prop was passed
		if (!!this.props.onDelete) {
			this.props.onDelete(item, selectedItem)
		} else {
			//Otherwise, user the same function
			this.props.onSelect(item, selectedItem)
		}
		this.setState({
			selectedItem
		})
	}

	render() {
		const {
			margin,
			classes,
			dropUp,
			name,
			label,
			placeholder,
			listItems
		} = this.props
		const { inputValue, selectedItem } = this.state

		return (
			<div
				className={classes.root}
				style={margin !== 'normal' ? undefined : { marginTop: '16px' }}
			>
				<Downshift
					id={`downshift-multiple-${name}`}
					inputValue={inputValue}
					onChange={this.handleChange}
					selectedItem={selectedItem}
					itemToString={(item) => (Boolean(item) ? item : '')}
				>
					{({
						getInputProps,
						getItemProps,
						isOpen,
						inputValue: inputValue2,
						selectedItem: selectedItem2,
						highlightedIndex
					}) => (
						<div className={classes.container}>
							{renderInput({
								fullWidth: true,
								classes,
								InputProps: getInputProps({
									startAdornment: selectedItem.map((item) => (
										<Chip
											key={item.key}
											tabIndex={-1}
											label={item.label}
											className={classes.chip}
											onDelete={this.handleDelete(item)}
										/>
									)),
									onChange: this.handleInputChange,
									onKeyDown: this.handleKeyDown,
									placeholder: !!placeholder
										? placeholder
										: label
								}),
								label: label
							})}
							{isOpen ? (
								<Paper
									className={classNames({
										[classes.paper]: true,
										[classes.dropUp]: !!dropUp
									})}
								>
									{getSuggestions(listItems, inputValue2).map(
										(suggestion, index) =>
											renderSuggestion({
												suggestion,
												index,
												itemProps: getItemProps({
													item: suggestion,
													key: suggestion.key
												}),
												highlightedIndex,
												selectedItem: selectedItem2
											})
									)}
								</Paper>
							) : null}
						</div>
					)}
				</Downshift>
			</div>
		)
	}
}

SuggestionSearchBox.defaultProps = {
	dropUp: false
}

SuggestionSearchBox.propTypes = {
	margin: PropTypes.oneOf(['normal', 'none']),
	dropUp: PropTypes.bool,
	listItems: PropTypes.arrayOf(
		PropTypes.shape({ key: PropTypes.string, label: PropTypes.string })
	),
	onSelect: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	name: PropTypes.string.isRequired
}

export default withStyles(styles)(SuggestionSearchBox)
