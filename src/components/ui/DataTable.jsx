import React, { useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

export function DataTable({ 
  children, 
  className = "",
  maxHeight,
  minHeight = "300px"
}) {
  const isMobile = useIsMobile();
  
  // Calcular altura dinamicamente se não for fornecida
  const calculatedMaxHeight = maxHeight || (isMobile ? 'auto' : '100%');
  
  return (
    <div className={`w-full ${isMobile ? '' : 'h-full'}`}>
      <div 
        className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden ${className}`}
        style={{
          maxHeight: calculatedMaxHeight,
          minHeight
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function DataTableHeader({ children, className = "" }) {
  return (
    <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border-b border-blue-200 dark:border-gray-600">
      <table className="min-w-full">
        <thead className={className}>
          {children}
        </thead>
      </table>
    </div>
  );
}

export function DataTableBody({ children, className = "" }) {
  const isMobile = useIsMobile();
  
  return (
    <div className={`overflow-y-auto overflow-x-auto ${isMobile ? '' : 'flex-1'}`}>
      <table className="min-w-full">
        <tbody className={className}>
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function DataTableFooter({ 
  children, 
  className = "",
  totalItems = 0,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  showSummary = true
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  return (
    <div className={`bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600 ${className}`}>
      {showSummary && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="material-icons text-base text-blue-600 dark:text-blue-400">info</span>
              <span className="font-medium">
                Mostrando <span className="text-blue-600 dark:text-blue-400 font-bold">{startItem}</span> a <span className="text-blue-600 dark:text-blue-400 font-bold">{endItem}</span> de <span className="text-blue-600 dark:text-blue-400 font-bold">{totalItems}</span> registros
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons text-base text-blue-600 dark:text-blue-400">pages</span>
              <span className="font-medium">
                Página <span className="text-blue-600 dark:text-blue-400 font-bold">{currentPage}</span> de <span className="text-blue-600 dark:text-blue-400 font-bold">{totalPages}</span>
              </span>
            </div>
          </div>
        </div>
      )}
      {children && (
        <div className="px-4 py-3">
          {children}
        </div>
      )}
    </div>
  );
} 