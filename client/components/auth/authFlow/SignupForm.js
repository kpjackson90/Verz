/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import signupimg from '../../../assets/SignUpImage.svg';
import AuthForm from './AuthForm';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <div>
      <img className='signup-img' src={signupimg} alt='img' />
      <div className='signup-block'>
        <h3>Let's get you signed up!</h3>
        <p>Enter your email to sign up</p>
        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          password2={password2}
          setPassword2={setPassword2}
        />
      </div>
    </div>
  );
};

export default SignupForm;

//have a boolean for is verified. Save the email in the state. Create some fake logic as to why someone would be verified. once verified is true, move on to the next step.
//Update state with the new password on the following page. (Make sure the 2 passwords are the same). Save Genres in state, save artists in state, save picture, username and description in state.
