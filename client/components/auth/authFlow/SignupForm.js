import React, { useState } from 'react';
import signupimg from '../../../assets/SignUpImage.svg';

const SignupForm = () => {
  const [email, setEmail] = useState('');

  return (
    <div>
      <img className='signup-img' src={signupimg} />
      <div className='signup-block'>
        <h3>Let's get you signed up!</h3>
        <p>Enter your email to sign up</p>
        <form>
          <div className='input-field'>
            <input
              className='form-control login-input'
              placeholder='Enter Email'
              value={email}
              onChange={e => setEmail({ email: e.target.value })}
            />
          </div>
          <button className='btn btn-signup'>Next ></button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

//have a boolean for is verified. Save the email in the state. Create some fake logic as to why someone would be verified. once verified is true, move on to the next step.
//Update state with the new password on the following page. (Make sure the 2 passwords are the same). Save Genres in state, save artists in state, save picture, username and description in state.
