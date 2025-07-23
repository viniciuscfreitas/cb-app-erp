import React, { useState } from 'react';

export const Tabs = ({ tabs, defaultTab = 0, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      {/* Navegação das abas */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-3 flex-shrink-0">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`
                whitespace-nowrap py-2 px-2 border-b-2 font-medium text-sm transition-colors duration-200
                ${activeTab === index
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-2">
                {tab.icon && <span className="material-icons text-lg">{tab.icon}</span>}
                {tab.label}
                {tab.badge && (
                  <span className={`
                    ml-1 py-0.5 px-2 rounded-full text-xs font-medium
                    ${activeTab === index
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }
                  `}>
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo das abas */}
      <div className="flex-1 overflow-hidden">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}; 