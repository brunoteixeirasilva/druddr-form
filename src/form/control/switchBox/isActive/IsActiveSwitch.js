// import React from 'react'
// import PropTypes from 'prop-types'
// import { SwitchBox } from '..'
// // import { translate } from '@druddr'

// /**
//  * Manages the "active" property of an Object
//  *
//  * @description Created the shared object
//  * @author brunoteixeirasilva
//  * @version 1.0
//  */
// class IsActiveSwitch extends React.Component {
// 	render() {
// 		const { checked, name, onChange, label } = this.props

// 		return (
// 			<SwitchBox
// 				checked={!!checked}
// 				name={undefined !== name ? name : 'active'}
// 				label={
// 					!!label ? label : translate('label/is-superadmin-active')
// 				}
// 				onChange={onChange}
// 			/>
// 		)
// 	}
// }

// IsActiveSwitch.propTypes = {
// 	checked: PropTypes.bool,
// 	label: PropTypes.string,
// 	name: PropTypes.string,
// 	onChange: PropTypes.func.isRequired
// }

// export default withSuperUserAccess(IsActiveSwitch)
