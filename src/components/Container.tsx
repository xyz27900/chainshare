import React from 'react';

export const Container: React.FC = ({ children }) =>
  <div className="max-w-screen-md w-full flex-grow px-4 md:mx-auto">
    { children }
  </div>;
