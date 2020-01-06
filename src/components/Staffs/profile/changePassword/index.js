import React from 'react';
import './ChangePassWord.css';
import ChangePassWordForm from './redux-form/form';

function ChangePassWord() {
  const letChangePassWord = (value) => {
    console.log(value)
  }
  return (
    <ChangePassWordForm onSubmit={letChangePassWord} />
  );
}

export default ChangePassWord