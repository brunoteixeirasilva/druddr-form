import React from 'react'
import FormBaseCore, { FormBaseCorePropTypes } from './FormBaseCore'
import { withStyles } from '@material-ui/core'
import styles from './styles'

/**
 * Injects default styles at the form-base class
 *
 * @description Created the container
 * @author brunoteixeirasilva
 * @version 1.0
 *
 * @param {FormBasePropTypes} props
 */
const DruddrForm = (props) => {
	return <FormBaseCore {...props} />
}

DruddrForm.propTypes = { ...FormBaseCorePropTypes }

export default withStyles(styles, { withTheme: true })(DruddrForm)
