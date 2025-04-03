import React from 'react';
import { FiClipboard } from 'react-icons/fi';

const OrdersTab = ({ orders, onUpdateStatus }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Orders Received</h2>
      </div>

      {orders.length > 0 ? (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Product</th>
                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Buyer</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Amount</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <OrderRow 
                  key={order.id} 
                  order={order} 
                  onUpdateStatus={onUpdateStatus} 
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyOrdersState />
      )}
    </div>
  );
};

// Order Row Component
const OrderRow = ({ order, onUpdateStatus }) => {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div>
            <div className="font-medium text-gray-900">{order.listingTitle}</div>
            <div className="text-gray-500">Order #{order.id}</div>
          </div>
        </div>
      </td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
        {order.buyerName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {order.quantity} {order.unit}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className="font-semibold text-green-600">₹{order.totalAmount}</span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <OrderActions order={order} onUpdateStatus={onUpdateStatus} />
      </td>
    </tr>
  );
};

// Order Status Badge
const OrderStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Order Actions
const OrderActions = ({ order, onUpdateStatus }) => {
  return (
    <div className="flex space-x-2">
      {order.status === 'pending' && (
        <>
          <button 
            onClick={() => onUpdateStatus(order.id, 'confirmed')}
            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
          >
            Confirm
          </button>
          <button 
            onClick={() => onUpdateStatus(order.id, 'canceled')}
            className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
          >
            Decline
          </button>
        </>
      )}
      {order.status === 'confirmed' && (
        <button 
          onClick={() => onUpdateStatus(order.id, 'shipped')}
          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
        >
          Mark Shipped
        </button>
      )}
      {order.status === 'shipped' && (
        <button 
          onClick={() => onUpdateStatus(order.id, 'completed')}
          className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
        >
          Mark Completed
        </button>
      )}
      <button className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300">
        Details
      </button>
    </div>
  );
};

// Empty State Component
const EmptyOrdersState = () => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <FiClipboard className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">No orders received yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        When buyers place orders for your products, they'll appear here
      </p>
    </div>
  );
};

export default OrdersTab;