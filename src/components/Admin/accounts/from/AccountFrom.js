import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {compose, bindActionCreators } from 'redux';
import renderTextField from './FormTextField';
import renderSelectField from './SelectField';
import validate from './validate';
import * as modalActions from '../../../../actions/modal';

function AccountFrom(props) {
  const {invalid, submitting, modalActions} = props;
  const {hideModel} = modalActions;
  return (
    <form>
      <Field
        name="email"
        type="email"
        component={renderTextField}
        label="email"
      />
      <Field
        name="Name"
        type="text"
        component={renderTextField}
        label="Name"
      />
      <Field
        name="StaffID"
        type="text"
        component={renderTextField}
        label="Staff ID"
      />
      <Field
        name="Role"
        component={renderSelectField}
        label="Role"
        >
        <option value="" />
        <option value="admin">Admin</option>
        <option value="saffs">Saffs</option>
      </Field>
      <Field
        name="date"
        type="date"
        component={renderTextField}
        label="date"
      />
      <div className="btn-wrapper">
        <button onClick={hideModel} type="button" className="btn btn-secondary mr-2">close</button>
        <button disabled={invalid || submitting} type="button" className="btn btn-success">Save</button>
      </div>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    props: state.props
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
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