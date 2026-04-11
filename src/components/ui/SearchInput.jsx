import React from 'react';
import { Search } from 'lucide-react';
import Input from './Input';

const SearchInput = ({ 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  onSubmit, 
  placeholder = "I'm looking for...",
  className = ""
}) => {
  return (
    <form onSubmit={onSubmit} className={`relative flex h-10 ${className}`}>
      <Input 
        placeholder={placeholder}
        className="flex-1 bg-white border border-gray-200 focus:ring-1 focus:ring-[#00aaff] transition-all rounded-l-md rounded-r-none text-sm px-4 h-full"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button 
        type="submit" 
        className="w-12 bg-[#00aaff] text-white rounded-r-md hover:bg-[#0088cc] transition-colors flex items-center justify-center shrink-0 h-full"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchInput;