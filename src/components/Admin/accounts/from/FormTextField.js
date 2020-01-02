import React from 'react';

const renderTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="col-sm-6">
    <label className="col-form-label">{label}(*)</label>
    <input {...input} type={type} className="form-control" placeholder={label} />
    {touched &&
      ((error && <span className="error">{error}</span>) ||
        (warning && <span className="warning">{warning}</span>))}
  </div>
)
export default renderTextField;