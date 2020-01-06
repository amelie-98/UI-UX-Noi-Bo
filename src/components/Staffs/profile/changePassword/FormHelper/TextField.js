import React from 'react'
import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

//TextField là 1 React Component và được viết theo arrow function

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom} // id,className v.v sẽ đi vào custom này
    />
  )

renderTextField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
}