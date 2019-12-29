import React from 'react';

const renderSelectField = ({
  input,
  label,
  children,
  meta: { touched, error, warning },
}) => (
  <div className="form-group row">
    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlSelect2">{label}(*)</label>
    <div className="col-sm-9 pl-0">
      <select {...input} className="form-control" id="exampleFormControlSelect2">
        {children}
      </select>
        {touched &&
        ((error && <span className="error">{error}</span>) ||
          (warning && <span className="warning">{warning}</span>))}
      </div>
  </div>
)
export default renderSelectField;