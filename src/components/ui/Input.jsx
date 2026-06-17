import React from 'react';

const Input = ({ 
  type = 'text', 
  className = '', 
  placeholder, 
  ...props 
}) => {
  const baseStyles = 'w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00aaff] focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400 bg-white';
  
  return (
    <input 
      type={type}
      className={`${baseStyles} ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;

