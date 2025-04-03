/**
 * Constants for Agricultural Products Marketplace
 * Created by: RahulDabhi1722
 * Last Updated: 2025-03-21 07:26:37 UTC
 */

// Category options for listings
export const categoriesList = [
    { value: 'grains', label: 'Grains & Cereals' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'pulses', label: 'Pulses' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'spices', label: 'Spices' },
    { value: 'nuts', label: 'Nuts & Seeds' },
    { value: 'other', label: 'Other' }
  ];
  
  // Quality options for products
  export const qualityOptions = [
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' },
    { value: 'organic', label: 'Certified Organic' }
  ];
  
  // Unit options for quantity
  export const unitOptions = [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'quintal', label: 'Quintal (100 kg)' },
    { value: 'ton', label: 'Ton (1000 kg)' },
    { value: 'dozen', label: 'Dozen' },
    { value: 'piece', label: 'Piece' },
    { value: 'liter', label: 'Liter' }
  ];
  
  // Order status options
  export const orderStatusOptions = [
    { value: 'pending', label: 'Pending Confirmation' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'completed', label: 'Completed' },
    { value: 'canceled', label: 'Canceled' }
  ];
  
  // Payment method options
  export const paymentMethodOptions = [
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'upi', label: 'UPI Payment' },
    { value: 'cod', label: 'Cash on Delivery' },
    { value: 'wallet', label: 'Digital Wallet' },
    { value: 'credit_card', label: 'Credit/Debit Card' }
  ];
  
  // Indian states for location filtering
  export const indianStates = [
    { value: 'AP', label: 'Andhra Pradesh' },
    { value: 'AR', label: 'Arunachal Pradesh' },
    { value: 'AS', label: 'Assam' },
    { value: 'BR', label: 'Bihar' },
    { value: 'CG', label: 'Chhattisgarh' },
    { value: 'GA', label: 'Goa' },
    { value: 'GJ', label: 'Gujarat' },
    { value: 'HR', label: 'Haryana' },
    { value: 'HP', label: 'Himachal Pradesh' },
    { value: 'JH', label: 'Jharkhand' },
    { value: 'KA', label: 'Karnataka' },
    { value: 'KL', label: 'Kerala' },
    { value: 'MP', label: 'Madhya Pradesh' },
    { value: 'MH', label: 'Maharashtra' },
    { value: 'MN', label: 'Manipur' },
    { value: 'ML', label: 'Meghalaya' },
    { value: 'MZ', label: 'Mizoram' },
    { value: 'NL', label: 'Nagaland' },
    { value: 'OD', label: 'Odisha' },
    { value: 'PB', label: 'Punjab' },
    { value: 'RJ', label: 'Rajasthan' },
    { value: 'SK', label: 'Sikkim' },
    { value: 'TN', label: 'Tamil Nadu' },
    { value: 'TS', label: 'Telangana' },
    { value: 'TR', label: 'Tripura' },
    { value: 'UK', label: 'Uttarakhand' },
    { value: 'UP', label: 'Uttar Pradesh' },
    { value: 'WB', label: 'West Bengal' },
    { value: 'AN', label: 'Andaman and Nicobar Islands' },
    { value: 'CH', label: 'Chandigarh' },
    { value: 'DN', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'DL', label: 'Delhi' },
    { value: 'JK', label: 'Jammu and Kashmir' },
    { value: 'LA', label: 'Ladakh' },
    { value: 'LD', label: 'Lakshadweep' },
    { value: 'PY', label: 'Puducherry' }
  ];
  
  // Buyer types for filtering potential buyers
  export const buyerTypes = [
    { value: 'processor', label: 'Processor' },
    { value: 'retailer', label: 'Retailer' },
    { value: 'wholesaler', label: 'Wholesaler' },
    { value: 'exporter', label: 'Exporter' },
    { value: 'cooperative', label: 'Cooperative' },
    { value: 'distributor', label: 'Distributor' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'hotel', label: 'Hotel/Resort' }
  ];
  
  // Storage condition options
  export const storageConditions = [
    { value: 'room_temp', label: 'Room Temperature' },
    { value: 'refrigerated', label: 'Refrigerated' },
    { value: 'frozen', label: 'Frozen' },
    { value: 'cold_storage', label: 'Cold Storage' },
    { value: 'dry', label: 'Dry Place' }
  ];
  
  // Seasonal availability periods
  export const seasonalPeriods = [
    { value: 'year_round', label: 'Year Round' },
    { value: 'kharif', label: 'Kharif Season (Monsoon)' },
    { value: 'rabi', label: 'Rabi Season (Winter)' },
    { value: 'summer', label: 'Summer Season' },
    { value: 'specific', label: 'Specific Months Only' }
  ];
  
  // Configuration for listing status badges
  export const statusBadgeConfig = {
    active: {
      bgColor: 'bg-green-500',
      textColor: 'text-white'
    },
    inactive: {
      bgColor: 'bg-gray-500',
      textColor: 'text-white'
    },
    sold: {
      bgColor: 'bg-blue-500',
      textColor: 'text-white'
    },
    expired: {
      bgColor: 'bg-red-500',
      textColor: 'text-white'
    }
  };
  
  // Configuration for order status badges
  export const orderBadgeConfig = {
    pending: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800'
    },
    confirmed: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    },
    shipped: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    completed: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    },
    canceled: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800'
    }
  };
  
  // Default pagination settings
  export const paginationDefaults = {
    itemsPerPage: 10,
    itemsPerPageOptions: [5, 10, 20, 50]
  };
  
  // Validation rules for listing inputs
  export const validationRules = {
    title: {
      minLength: 3,
      maxLength: 100
    },
    description: {
      minLength: 10,
      maxLength: 1000
    },
    quantity: {
      min: 0
    },
    price: {
      min: 0
    },
    minimumOrder: {
      min: 0
    }
  };
  
  // Export current timestamp for reference
  export const lastUpdated = '2025-03-21 07:26:37';
  export const creator = 'RahulDabhi1722';