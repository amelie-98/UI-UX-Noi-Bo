import React from 'react';

const renderSelectField = ({
  input,
  label,
  children,
  meta: { touched, error, warning },
}) => (
  <div className="form-group row">
    <label className="col-sm-1 col-form-label">{label}(*)</label>
    <div className="col-sm-11">
      <select {...input} className="form-control" >
        {children}
      </select>
        {touched &&
        ((error && <span className="error">{error}</span>) ||
          (warning && <span className="warning">{warning}</span>))}
      </div>
  </div>
)
export default renderSelectField;