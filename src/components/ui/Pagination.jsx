import React from 'react';
import Button from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift('...');
    if (currentPage + delta < totalPages - 1) range.push('...');
    return [1, ...range, totalPages].filter(p => p);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50/90 to-blue-50/90 rounded-3xl shadow-2xl border border-slate-200/60 backdrop-blur-xl hover:shadow-3xl hover:shadow-blue-200/20 transition-all duration-500">
      <Button 
        size="sm" 
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-2xl hover:shadow-blue-300/40 rounded-2xl border hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-[0.97] min-h-[44px]"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1 sm:gap-1.5">
        {visiblePages.map((page, index) => (
          <Button
            key={index}
            size="sm"
            variant={currentPage === page ? 'primary' : 'ghost'}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`w-11 h-11 rounded-2xl font-bold text-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-400/50 hover:scale-[1.05] active:scale-95 focus:ring-4 focus:ring-blue-500/50 border-2 flex-shrink-0 ${currentPage === page ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl border-transparent hover:from-blue-700 hover:to-purple-700 hover:shadow-purple-500/50' : 'bg-white/80 border-slate-200 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-slate-700 hover:text-blue-700 shadow-lg hover:shadow-slate-200'}${page === '...' ? ' opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button 
        size="sm" 
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-2xl hover:shadow-blue-300/40 rounded-2xl border hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-[0.97] min-h-[44px]"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>

      <span className="ml-6 px-5 py-3 bg-white/90 rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl hover:bg-white font-semibold text-slate-800 text-sm tracking-wide transition-all duration-300 min-h-[44px] flex items-center">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;

