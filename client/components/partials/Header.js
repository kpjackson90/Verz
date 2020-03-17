/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import MainHeader from './MainHeader';
import AuthHeader from './AuthHeader';

const Header = () => {
  const [authFlow, setAuthFlow] = useState(false);

  return (
    <div>
      {authFlow === false ? (
        <MainHeader setAuthFlow={setAuthFlow} />
      ) : (
        <AuthHeader setAuthFlow={setAuthFlow} />
      )}
    </div>
  );
};

export default Header;
