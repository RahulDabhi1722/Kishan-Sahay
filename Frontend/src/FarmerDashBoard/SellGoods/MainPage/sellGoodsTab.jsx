import React from 'react';
import { FiBox, FiClipboard, FiUser } from 'react-icons/fi';

const SellGoodsTabs = ({ 
  // Dynamic props
  activeTab, 
  setActiveTab,
  // Make tabs configurable
  tabs = [
    { id: 'myListings', label: 'My Listings', icon: FiBox, count: 0 },
    { id: 'orders', label: 'Orders Received', icon: FiClipboard, count: 0 },
    { id: 'buyers', label: 'Potential Buyers', icon: FiUser, count: 0 }
  ],
  // Additional customization options
  activeColor = 'green',
  showIcons = true,
  showCounts = true,
  className = ''
}) => {
  // Get color classes
  const getColorClasses = (isActive) => {
    if (isActive) {
      return {
        bg: `bg-${activeColor}-50`,
        border: `border-${activeColor}-500`,
        text: `text-${activeColor}-700`
      };
    }
    return {
      bg: 'bg-white',
      border: 'border-transparent',
      text: 'text-gray-600 hover:text-gray-800'
    };
  };

  // Render desktop tabs (horizontal)
  const renderDesktopTabs = () => {
    return (
      <div className="hidden sm:block border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const colorClasses = getColorClasses(activeTab === tab.id);
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  ${colorClasses.border} ${colorClasses.text}
                  whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm
                  transition-colors duration-200 flex items-center
                `}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {showIcons && <tab.icon className="mr-2 flex-shrink-0" />}
                <span>{tab.label}</span>
                {showCounts && tab.count > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    );
  };

  // Render mobile tabs (card style)
  const renderMobileTabs = () => {
    return (
      <div className="sm:hidden">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map((tab) => {
            const colorClasses = getColorClasses(activeTab === tab.id);
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  ${colorClasses.bg} ${colorClasses.text}
                  py-2 px-1 rounded-lg border flex flex-col items-center justify-center
                  ${activeTab === tab.id ? `border-${activeColor}-300 shadow-sm` : 'border-gray-200'}
                  transition-all duration-200
                `}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {showIcons && <tab.icon className="mb-1" />}
                <span className="text-xs font-medium truncate max-w-full">
                  {tab.label.split(' ')[0]}
                </span>
                {showCounts && tab.count > 0 && (
                  <span className="mt-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`mb-6 ${className}`}>
      {renderDesktopTabs()}
      {renderMobileTabs()}
    </div>
  );
};

export default SellGoodsTabs;