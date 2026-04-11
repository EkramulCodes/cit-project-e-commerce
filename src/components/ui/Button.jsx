import React from 'react';

const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none';
  const variants = {
    primary: 'bg-[#00aaff] text-white hover:bg-[#0088cc]',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-[#00aaff] text-[#00aaff] hover:bg-[#00aaff] hover:text-white',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
