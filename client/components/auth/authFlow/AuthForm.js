/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';

const emailForm = ({ email, setEmail, password, setPassword, password2, setPassword2 }) => {
  const [enterPass, setPass] = useState(false);

  function handleEmail() {
    setEmail(email);
    setPass(true);
    console.log(email);
  }

  function handlePassword(e) {
    setPassword(password);
    setPassword2(password2);
    console.log(password);
  }

  function handleClick(e) {
    e.preventDefault();
    if (enterPass === false) {
      handleEmail();
    } else {
      handlePassword();
    }
  }

  return (
    <>
      {enterPass === false ? (
        <div className='input-field'>
          <input
            className='form-control login-input'
            placeholder='Enter Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      ) : (
        <div className='input-field'>
          <input
            className='form-control login-input'
            placeholder='Enter password'
            value={password}
            type='password'
            onChange={e => setPassword(e.target.value)}
          />
          <input
            className='form-control login-input'
            placeholder='Re-enter Password'
            value={password2}
            type='password'
            onChange={e => setPassword2(e.target.value)}
          />
        </div>
      )}
      <button className='btn btn-signup' onClick={handleClick}>
        Next >
      </button>
    </>
  );
};

export default emailForm;
