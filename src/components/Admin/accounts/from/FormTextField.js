import React from 'react';

const renderTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="form-group row">
    <label className="col-sm-3 col-form-label">{label}(*)</label>
    <div className="col-sm-9 pl-0">
      <input {...input} type={type} className="form-control" placeholder={label} />
      {touched &&
        ((error && <span className="error">{error}</span>) ||
          (warning && <span className="warning">{warning}</span>))}
    </div>
  </div>
)
export default renderTextField;