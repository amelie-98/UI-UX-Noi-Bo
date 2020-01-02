import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {compose } from 'redux';
import Logo from '../../assets/img/Logo_Bunbu 1.png';

const required = value => value ? undefined : 'Please enter email'

const email = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
	'Invalid email address' : undefined

const aol = value =>
	value && /.+@aol\.com/.test(value) ?
	'Really? You still use AOL for your email?' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
<div>
	<label>{label}</label>
	<div>
		<input {...input} className="form-control mb-2" placeholder={label} type={type}/>
		{touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
	</div>
</div>
)

function ResetPassword(props) {
	const {invalid,handleSubmit, submitting} = props;
  return (
    <div className="container-fluid">
      <div className="account-wraper">
        <div className="account-body">
          <img src={Logo} id="logo-item" alt="Logo_Bunbu" />
          <div id="title-bunbu">BUNBU</div>
          <div id="password-setting">Forgot Your Password</div>
          <div className="account-wraper-from">
            <form className="from-body" onSubmit={handleSubmit}>
								<Field name="email" type="email"
									component={renderField} label="Email"
									validate={[ required, email ]}
									warn={aol}
								/>
              <button disabled={invalid || submitting} type="submit" className="btn btn-success" id="btn-login">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const FORM_NAME = 'TASK_MANAGEMENT';
const withReduxForm = reduxForm({
  form: FORM_NAME
});

export default compose(
  withReduxForm
)
(ResetPassword);