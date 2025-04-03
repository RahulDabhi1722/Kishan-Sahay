import React from 'react';
import { FiUsers, FiShoppingBag, FiClock, FiAlertCircle } from 'react-icons/fi';

const DashBoard = () => {
  // Mock data for dashboard stats
  const stats = [
    { name: 'Total Farmers', value: '245', icon: <FiUsers className="h-6 w-6 text-blue-500" /> },
    { name: 'Total Customers', value: '752', icon: <FiUsers className="h-6 w-6 text-green-500" /> },
    { name: 'Total Products', value: '1,423', icon: <FiShoppingBag className="h-6 w-6 text-purple-500" /> },
    { name: 'Pending Approvals', value: '12', icon: <FiClock className="h-6 w-6 text-yellow-500" /> },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: 'Rajesh Kumar', action: 'added new product', product: 'Organic Rice', time: '10 minutes ago' },
    { id: 2, user: 'Meena Patel', action: 'registered as a new customer', time: '2 hours ago' },
    { id: 3, user: 'Arjun Singh', action: 'placed an order for', product: 'Fresh Tomatoes', time: '5 hours ago' },
    { id: 4, user: 'Admin', action: 'approved farmer verification for', user2: 'Vikram Reddy', time: 'Yesterday' },
    { id: 5, user: 'System', action: 'flagged low inventory for', product: 'Basmati Rice', time: 'Yesterday' },
  ];

  // Mock alerts
  const alerts = [
    { id: 1, message: '12 products require quality verification', type: 'warning' },
    { id: 2, message: '5 farmers awaiting account approval', type: 'info' },
    { id: 3, message: 'Weekly sales report is ready to review', type: 'success' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {stat.icon}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Alerts Section */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Alerts & Notifications</h3>
        <div className="space-y-3">
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-md flex items-start ${
                alert.type === 'warning' ? 'bg-yellow-50' :
                alert.type === 'info' ? 'bg-blue-50' : 'bg-green-50'
              }`}
            >
              <FiAlertCircle className={`mr-2 h-5 w-5 ${
                alert.type === 'warning' ? 'text-yellow-500' :
                alert.type === 'info' ? 'text-blue-500' : 'text-green-500'
              }`} />
              <span className="text-sm text-gray-700">{alert.message}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activities</h3>
        <div className="flow-root">
          <ul className="-mb-8">
            {recentActivities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== recentActivities.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-100">
                        <span className="text-xs font-medium text-gray-500">{activity.user.charAt(0)}</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{activity.user}</span> {activity.action}
                          {activity.product && <span className="font-medium text-gray-900"> {activity.product}</span>}
                          {activity.user2 && <span className="font-medium text-gray-900"> {activity.user2}</span>}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time>{activity.time}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;