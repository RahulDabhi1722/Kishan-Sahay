/**
 * Helper functions for general use throughout the application
 */

// Generate random token
exports.generateToken = length => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return token;
  };
  
  // Calculate distance between two coordinates (for nearby farmers feature)
  exports.calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) {
      return null;
    }
    
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };
  
  // Helper function for distance calculation
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  
  // Format currency
  exports.formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency
    }).format(amount);
  };
  
  // Paginate results
  exports.paginate = (items, page = 1, limit = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = items.length;
    
    const results = {
      data: items.slice(startIndex, endIndex),
      pagination: {}
    };
    
    if (endIndex < total) {
      results.pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      results.pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    results.pagination.total = total;
    results.pagination.totalPages = Math.ceil(total / limit);
    
    return results;
  };