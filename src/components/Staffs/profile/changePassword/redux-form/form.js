import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderTextField from '../../../../Admin/accounts/from/FormTextField'
import validate from './validate'

let ChangePassWordForm = (props) => {
  //handleSubmit : khi click vào nút submit
  //invalid      : khi không thỏa mãn validation (validation không hợp lệ)
  //submitting   : khi form đang submit (để tránh việc submit nhiều lần 1 lúc)
  const { handleSubmit, invalid, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="change-pass-word">
        <div className="title-change-pass-word">Change PassWord</div>
        <div className="content-change-pass-word">
          <div className="content-change-pass-word-right">
            <Field
              id='current-password'
              label='Current Password'
              className="current-password"
              placeholder="Current Password"
              name="currentPassword"
              component={renderTextField}
            />
            <Field
              id='new-password'
              label='New Password'
              className="new-password"
              placeholder="New Password"
              name="newPassword"
              component={renderTextField}
            />
            <Field
              id='password-confirmation'
              label='New Password Confirmation'
              className="password-confirmation"
              placeholder="New Password Confirmation"
              name="passwordConfirmation"
              component={renderTextField}
            />
          </div>
        </div>
        <button
          //nếu như validation không hợp lệ hoặc khi form đang submit thì ngăn không cho submit
          disabled={invalid || submitting}
          className="btn btn-change-pass-word"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  )
}

ChangePassWordForm = reduxForm({
  // a unique name for the form
  form: 'contact',
  validate: validate //tất cả code validate để trong validate.js mà import vào
})(ChangePassWordForm)

export default ChangePassWordForm