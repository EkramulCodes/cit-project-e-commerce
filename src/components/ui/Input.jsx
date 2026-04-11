import React from 'react';

const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00aaff] focus:border-transparent ${className}`}
      {...props}
    />
  );
};

export default Input;
