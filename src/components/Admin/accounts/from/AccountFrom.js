import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {compose, bindActionCreators } from 'redux';
import renderTextField from './FormTextField';
import renderSelectField from './SelectField';
import validate from './validate';
import * as modalActions from '../../../../actions/modal';
import * as accountActions from '../../../../actions/account';

function AccountFrom(props) {
  const handleSubmitForm = data => {
		const {accountActions, initialValues} = props;
		const {addNewAccountRequest, updateAccountRequest} = accountActions;
		if(initialValues && initialValues.id){
			updateAccountRequest(initialValues.id, data);
		} else {
			addNewAccountRequest(data);	
		}
	}

  const {invalid,handleSubmit, submitting, modalActions} = props;
  const {hideModel} = modalActions;
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="form-group row">
          <Field
            name="id"
            type="text"
            component={renderTextField}
            label="id"
          />
          <Field
            name="name"
            type="text"
            component={renderTextField}
            label="Name"
          />
        </div>
        <div className="form-group row">
          <Field
            name="contractType"
            type="text"
            component={renderTextField}
            label="contractType"
          />
          <Field
            name="birthDay"
            type="text"
            component={renderTextField}
            label="BirthDay"
          />
        </div>
        <div className="form-group row">
          <Field
            name="cmt"
            type="number"
            component={renderTextField}
            label="cmt"
          />
          <Field
            name="sdt"
            type="text"
            component={renderTextField}
            label="sdt"
          />
        </div>
        <div className="form-group row">
          <Field
            name="address"
            type="text"
            component={renderTextField}
            label="address"
          />
          <Field
            name="email"
            type="email"
            component={renderTextField}
            label="email"
          />
        </div>
        <div className="form-group row">
          <Field
            name="dateJoinCompany"
            type="text"
            component={renderTextField}
            label="dateJoinCompany"
          />
          <Field
            name="dateBeComeOfficial"
            type="text"
            component={renderTextField}
            label="dateBeComeOfficial"
          /> 
        </div>
        <Field
          name="status"
          component={renderSelectField}
          label="staus"
        >
        <option value="" />
        <option value="1">Active</option>
        <option value="0">Deactive</option>
        </Field>
        <Field
          name="sex"
          component={renderSelectField}
          label="sex"
        >
        <option value="" />
        <option value="Nam">Nam</option>
        <option value="Nu">Nu</option>
      </Field>
        <Field
          name="role"
          component={renderSelectField}
          label="Role"
        >
        <option value="" />
        <option value="admin">Admin</option>
        <option value="staff">Saffs</option>
      </Field>
      
      <div className="btn-wrapper">
        <button onClick={hideModel} type="button" className="btn btn-secondary mr-2">close</button>
        <button disabled={invalid || submitting} type="submit" className="btn btn-success">Save</button>
      </div>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    initialValues: state.accountReducer.accountEditTing,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    accountActions: bindActionCreators(accountActions, dispatch),
  };
};

const FORM_NAME = 'TASK_MANAGEMENT';
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate
});

export default compose(
  withConnect,
  withReduxForm
)
(AccountFrom);