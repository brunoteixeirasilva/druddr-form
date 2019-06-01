import React from 'react'
import PropTypes from 'prop-types'
import {
	Switch,
	ListItemSecondaryAction,
	ListItemText,
	ListItem,
	List,
	Grid
} from '@material-ui/core'

/**
 * Prints a grid styled switch
 * See more at: https://v1-5-0.material-ui.com/demos/selection-controls/#switches
 */
class GridSwitch extends React.Component {
	render() {
		const { gridSize, onChange, checked, name, label } = this.props

		return (
			<Grid item xs={!!gridSize ? gridSize : 12}>
				<List>
					<ListItem>
						<ListItemText>{label}</ListItemText>
						<ListItemSecondaryAction>
							<div>
								<Switch
									checked={checked}
									onChange={onChange(name)}
									value={name}
								/>
							</div>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</Grid>
		)
	}
}

GridSwitch.propTypes = {
	gridSize: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
}

export default GridSwitch
