/**
 * Mock Data Service for Agricultural Products Marketplace
 * Created by: RahulDabhi1722
 * Last Updated: 2025-03-21 07:29:15 UTC
 * 
 * This service provides mock data for development and testing purposes.
 * In production, these functions would call actual API endpoints.
 */

// Helper function to generate dates for data
const getCurrentDate = () => new Date().toISOString().split('T')[0];
const getDateDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

// Current date for context
const currentDate = getCurrentDate();
const lastWeek = getDateDaysAgo(7);
const twoWeeksAgo = getDateDaysAgo(14);

// Mock listings data
const mockListings = [
  {
    id: 1,
    title: 'Premium Organic Rice',
    category: 'grains',
    quantity: '1000',
    unit: 'kg',
    price: '45',
    quality: 'premium',
    description: 'Freshly harvested premium basmati rice. Organically grown without pesticides. Long grain variety with excellent aroma. Ideal for restaurants and quality-conscious buyers.',
    location: 'Amritsar, Punjab',
    harvestDate: getDateDaysAgo(20),
    images: ['SellGoods/rice.jpg'],
    status: 'active',
    dateCreated: getDateDaysAgo(11),
    views: 78,
    inquiries: 5,
    organic: true,
    delivery: true,
    minimumOrder: '100',
    negotiable: true,
    seasonal: true,
    storage: 'Cool, dry place',
    seller: {
      id: 101,
      name: 'Singh Organic Farms',
      rating: 4.8,
      verificationLevel: 'verified'
    }
  },
  {
    id: 2,
    title: 'Fresh Red Tomatoes',
    category: 'vegetables',
    quantity: '500',
    unit: 'kg',
    price: '30',
    quality: 'standard',
    description: 'Fresh, ripe tomatoes ready for immediate delivery. Ideal for restaurants and retailers. Harvested this morning from our greenhouse facilities.',
    location: 'Nashik, Maharashtra',
    harvestDate: getDateDaysAgo(2),
    images: ['SellGoods/tomatoes.jpg'],
    status: 'active',
    dateCreated: getDateDaysAgo(3),
    views: 45,
    inquiries: 3,
    organic: false,
    delivery: true,
    minimumOrder: '50',
    negotiable: true,
    seasonal: true,
    storage: 'Refrigerated',
    seller: {
      id: 101,
      name: 'Singh Organic Farms',
      rating: 4.8,
      verificationLevel: 'verified'
    }
  },
  {
    id: 3,
    title: 'Raw Cotton',
    category: 'other',
    quantity: '2000',
    unit: 'kg',
    price: '65',
    quality: 'premium',
    description: 'High-quality raw cotton freshly harvested from our farms. Long staple cotton suitable for premium textiles and clothing manufacturing.',
    location: 'Ahmedabad, Gujarat',
    harvestDate: getDateDaysAgo(30),
    images: ['SellGoods/cotton.jpg'],
    status: 'inactive',
    dateCreated: getDateDaysAgo(16),
    views: 23,
    inquiries: 1,
    organic: false,
    delivery: false,
    minimumOrder: '500',
    negotiable: true,
    seasonal: true,
    storage: 'Dry place',
    seller: {
      id: 101,
      name: 'Singh Organic Farms',
      rating: 4.8,
      verificationLevel: 'verified'
    }
  },
  {
    id: 4,
    title: 'Green Chillies',
    category: 'vegetables',
    quantity: '200',
    unit: 'kg',
    price: '40',
    quality: 'standard',
    description: 'Fresh green chillies with medium to high spiciness level. Perfect for restaurants, food processors and retailers.',
    location: 'Guntur, Andhra Pradesh',
    harvestDate: getDateDaysAgo(1),
    images: ['SellGoods/greenpeppers.jpg'],
    status: 'active',
    dateCreated: getDateDaysAgo(2),
    views: 17,
    inquiries: 2,
    organic: false,
    delivery: true,
    minimumOrder: '10',
    negotiable: true,
    seasonal: false,
    storage: 'Refrigerated',
    seller: {
      id: 101,
      name: 'Singh Organic Farms',
      rating: 4.8,
      verificationLevel: 'verified'
    }
  },
  {
    id: 5,
    title: 'A2 Cow Milk',
    category: 'dairy',
    quantity: '100',
    unit: 'liter',
    price: '80',
    quality: 'premium',
    description: 'Pure A2 cow milk from indigenous breeds. No hormones or antibiotics used. Fresh morning collection available daily.',
    location: 'Anand, Gujarat',
    harvestDate: currentDate,
    images: ['SellGoods/milk.jpg'],
    status: 'active',
    dateCreated: getDateDaysAgo(30),
    views: 92,
    inquiries: 8,
    organic: true,
    delivery: true,
    minimumOrder: '10',
    negotiable: false,
    seasonal: false,
    storage: 'Refrigerated',
    seller: {
      id: 101,
      name: 'Singh Organic Farms',
      rating: 4.8,
      verificationLevel: 'verified'
    }
  }
];

// Mock orders data
const mockOrders = [
  {
    id: 1,
    listingId: 1,
    listingTitle: 'Premium Organic Rice',
    buyerId: 1,
    buyerName: 'Agro Processors Ltd.',
    quantity: '500',
    unit: 'kg',
    price: '45',
    totalAmount: '22500',
    status: 'pending',
    dateCreated: currentDate,
    deliveryAddress: 'Industrial Area Phase 2, New Delhi',
    contactPhone: '+91 98765 43210',
    message: 'We are interested in your organic rice for our premium product line. Please confirm if you can deliver by next week.',
    paymentMethod: 'bank_transfer',
    expectedDelivery: getDateDaysAgo(-7), // 7 days in future
    buyerDetails: {
      company: 'Agro Processors Ltd.',
      type: 'processor',
      registrationNumber: 'AGPL1234567',
      gstNumber: '22AAAAA0000A1Z5',
      previousOrders: 5
    }
  },
  {
    id: 2,
    listingId: 2,
    listingTitle: 'Fresh Red Tomatoes',
    buyerId: 2,
    buyerName: 'Fresh Market Chain',
    quantity: '200',
    unit: 'kg',
    price: '30',
    totalAmount: '6000',
    status: 'confirmed',
    dateCreated: lastWeek,
    deliveryAddress: 'Market Complex, Mumbai',
    contactPhone: '+91 87654 32109',
    message: 'Need fresh tomatoes for our stores. Please arrange delivery to our Mumbai warehouse.',
    paymentMethod: 'cod',
    expectedDelivery: getDateDaysAgo(-2), // 2 days in future
    buyerDetails: {
      company: 'Fresh Market Chain',
      type: 'retailer',
      registrationNumber: 'FMC7654321',
      gstNumber: '27BBBBB1111B1Z5',
      previousOrders: 12
    }
  },
  {
    id: 3,
    listingId: 1,
    listingTitle: 'Premium Organic Rice',
    buyerId: 3,
    buyerName: 'Organic Food Co-op',
    quantity: '300',
    unit: 'kg',
    price: '47',
    totalAmount: '14100',
    status: 'shipped',
    dateCreated: lastWeek,
    deliveryAddress: 'Co-op Society, Bangalore',
    contactPhone: '+91 76543 21098',
    message: 'Our members are excited to receive your organic rice. Please provide tracking details.',
    paymentMethod: 'bank_transfer',
    expectedDelivery: currentDate,
    shippingDetails: {
      trackingNumber: 'SHIP123456789',
      carrier: 'Express Logistics',
      dispatchDate: getDateDaysAgo(2)
    },
    buyerDetails: {
      company: 'Organic Food Co-op',
      type: 'cooperative',
      registrationNumber: 'OFC9876543',
      gstNumber: '29CCCCC2222C1Z5',
      previousOrders: 3
    }
  },
  {
    id: 4,
    listingId: 4,
    listingTitle: 'Green Chillies',
    buyerId: 4,
    buyerName: 'Spice Exporters Ltd.',
    quantity: '150',
    unit: 'kg',
    price: '42',
    totalAmount: '6300',
    status: 'completed',
    dateCreated: twoWeeksAgo,
    deliveryAddress: 'Export Processing Zone, Chennai',
    contactPhone: '+91 65432 10987',
    message: 'We need these chillies for our export order. Need them delivered by Friday.',
    paymentMethod: 'bank_transfer',
    expectedDelivery: getDateDaysAgo(10),
    shippingDetails: {
      trackingNumber: 'SHIP987654321',
      carrier: 'Rapid Delivery',
      dispatchDate: getDateDaysAgo(12),
      deliveryDate: getDateDaysAgo(10)
    },
    buyerDetails: {
      company: 'Spice Exporters Ltd.',
      type: 'exporter',
      registrationNumber: 'SEL5647382',
      gstNumber: '33DDDDD3333D1Z5',
      previousOrders: 7
    },
    paymentDetails: {
      transactionId: 'TXN987654321',
      paymentDate: getDateDaysAgo(15),
      status: 'completed'
    },
    review: {
      rating: 5,
      comment: 'Excellent quality chillies. Will order again.',
      date: getDateDaysAgo(8)
    }
  },
  {
    id: 5,
    listingId: 1,
    listingTitle: 'Premium Organic Rice',
    buyerId: 5,
    buyerName: 'Delhi Restaurant Supplies',
    quantity: '100',
    unit: 'kg',
    price: '46',
    totalAmount: '4600',
    status: 'canceled',
    dateCreated: twoWeeksAgo,
    deliveryAddress: 'Restaurant Supply Hub, Delhi NCR',
    contactPhone: '+91 54321 09876',
    message: 'Need urgent delivery for our restaurant clients.',
    paymentMethod: 'cod',
    cancellationReason: 'Found another supplier with immediate availability',
    cancellationDate: getDateDaysAgo(13),
    buyerDetails: {
      company: 'Delhi Restaurant Supplies',
      type: 'distributor',
      registrationNumber: 'DRS2345678',
      gstNumber: '07EEEEE4444E1Z5',
      previousOrders: 2
    }
  }
];

// Mock buyer profiles data
const mockBuyerProfiles = [
  { 
    id: 1, 
    name: 'Agro Processors Ltd.', 
    type: 'processor', 
    purchases: 125, 
    rating: 4.8, 
    verified: true,
    location: 'Delhi',
    interestedCategories: ['grains', 'pulses', 'spices'],
    averagePurchaseValue: '25000',
    joinedDate: getDateDaysAgo(180),
    description: 'Large-scale processor looking for quality grains and pulses for our processing units.'
  },
  { 
    id: 2, 
    name: 'Fresh Market Chain', 
    type: 'retailer', 
    purchases: 87, 
    rating: 4.6, 
    verified: true,
    location: 'Mumbai, Pune',
    interestedCategories: ['fruits', 'vegetables', 'dairy'],
    averagePurchaseValue: '12000',
    joinedDate: getDateDaysAgo(120),
    description: 'Multi-city retail chain sourcing fresh produce directly from farmers.'
  },
  { 
    id: 3, 
    name: 'Organic Food Co-op', 
    type: 'cooperative', 
    purchases: 56, 
    rating: 4.9, 
    verified: true,
    location: 'Bangalore',
    interestedCategories: ['fruits', 'vegetables', 'grains', 'dairy'],
    averagePurchaseValue: '8000',
    joinedDate: getDateDaysAgo(90),
    description: 'Community-supported cooperative focused on organic and sustainable produce.'
  },
  { 
    id: 4, 
    name: 'Mumbai Food Exporters', 
    type: 'exporter', 
    purchases: 210, 
    rating: 4.7, 
    verified: true,
    location: 'Mumbai',
    interestedCategories: ['fruits', 'spices', 'nuts'],
    averagePurchaseValue: '45000',
    joinedDate: getDateDaysAgo(365),
    description: 'International exporter of Indian agricultural products to Middle East and Europe.'
  },
  { 
    id: 5, 
    name: 'Delhi Restaurant Supplies', 
    type: 'distributor', 
    purchases: 143, 
    rating: 4.5, 
    verified: true,
    location: 'Delhi NCR',
    interestedCategories: ['vegetables', 'dairy', 'fruits', 'spices'],
    averagePurchaseValue: '15000',
    joinedDate: getDateDaysAgo(275),
    description: 'Supplier to restaurants, hotels and catering services in Delhi NCR region.'
  },
  { 
    id: 6, 
    name: 'Southern Spice Traders', 
    type: 'wholesaler', 
    purchases: 98, 
    rating: 4.4, 
    verified: true,
    location: 'Chennai',
    interestedCategories: ['spices'],
    averagePurchaseValue: '30000',
    joinedDate: getDateDaysAgo(200),
    description: 'Specialized wholesaler dealing in premium quality spices from across India.'
  }
];

// Function to simulate API call to load listings
export const loadMockListings = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredListings = [...mockListings];
      
      // Apply filters if provided
      if (filters.category && filters.category !== 'all') {
        filteredListings = filteredListings.filter(item => item.category === filters.category);
      }
      
      if (filters.status && filters.status !== 'all') {
        filteredListings = filteredListings.filter(item => item.status === filters.status);
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredListings = filteredListings.filter(item => 
          item.title.toLowerCase().includes(searchTerm) || 
          item.description.toLowerCase().includes(searchTerm) ||
          item.location.toLowerCase().includes(searchTerm)
        );
      }
      
      resolve(filteredListings);
    }, 800);
  });
};

// Function to simulate API call to load orders
export const loadMockOrders = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredOrders = [...mockOrders];
      
      // Apply filters if provided
      if (filters.status && filters.status !== 'all') {
        filteredOrders = filteredOrders.filter(item => item.status === filters.status);
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredOrders = filteredOrders.filter(item => 
          item.listingTitle.toLowerCase().includes(searchTerm) || 
          item.buyerName.toLowerCase().includes(searchTerm)
        );
      }
      
      // Sort if requested
      if (filters.sortBy) {
        filteredOrders.sort((a, b) => {
          if (filters.sortBy === 'date') {
            return new Date(b.dateCreated) - new Date(a.dateCreated);
          }
          if (filters.sortBy === 'amount') {
            return parseFloat(b.totalAmount) - parseFloat(a.totalAmount);
          }
          return 0;
        });
      }
      
      resolve(filteredOrders);
    }, 800);
  });
};

// Function to load buyer profiles
export const loadMockBuyerProfiles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBuyerProfiles);
    }, 800);
  });
};

// Function to add a new listing (mock)
export const addMockListing = (listing) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newListing = {
        ...listing,
        id: mockListings.length + 1,
        dateCreated: getCurrentDate(),
        status: 'active',
        views: 0,
        inquiries: 0,
        seller: {
          id: 101,
          name: 'Singh Organic Farms',
          rating: 4.8,
          verificationLevel: 'verified'
        }
      };
      mockListings.push(newListing);
      resolve(newListing);
    }, 800);
  });
};

// Function to update a listing (mock)
export const updateMockListing = (listing) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockListings.findIndex(item => item.id === listing.id);
      if (index !== -1) {
        // Preserve some fields that shouldn't be modified by updates
        const originalListing = mockListings[index];
        const updatedListing = {
          ...listing,
          dateCreated: originalListing.dateCreated,
          views: originalListing.views,
          inquiries: originalListing.inquiries,
          seller: originalListing.seller
        };
        
        mockListings[index] = updatedListing;
        resolve(updatedListing);
      } else {
        resolve({ error: 'Listing not found' });
      }
    }, 800);
  });
};

// Function to delete a listing (mock)
export const deleteMockListing = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockListings.findIndex(item => item.id === id);
      if (index !== -1) {
        mockListings.splice(index, 1);
        resolve({ success: true, message: 'Listing deleted successfully' });
      } else {
        resolve({ success: false, message: 'Listing not found' });
      }
    }, 800);
  });
};

// Function to get a single listing by ID
export const getMockListingById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const listing = mockListings.find(item => item.id === Number(id));
      if (listing) {
        // Increment view count when fetched
        listing.views += 1;
        resolve(listing);
      } else {
        resolve({ error: 'Listing not found' });
      }
    }, 400);
  });
};

// Function to update order status
export const updateMockOrderStatus = (orderId, newStatus) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockOrders.findIndex(item => item.id === orderId);
      if (index !== -1) {
        mockOrders[index] = {
          ...mockOrders[index],
          status: newStatus,
          // Add status-specific timestamps
          ...(newStatus === 'shipped' && { 
            shippingDetails: {
              trackingNumber: `SHIP${Math.floor(Math.random() * 900000000) + 100000000}`,
              carrier: 'Express Logistics',
              dispatchDate: getCurrentDate()
            }
          }),
          ...(newStatus === 'completed' && { 
            paymentDetails: {
              transactionId: `TXN${Math.floor(Math.random() * 900000000) + 100000000}`,
              paymentDate: getCurrentDate(),
              status: 'completed'
            }
          }),
          ...(newStatus === 'canceled' && { 
            cancellationDate: getCurrentDate()
          })
        };
        resolve({ success: true, order: mockOrders[index] });
      } else {
        resolve({ success: false, error: 'Order not found' });
      }
    }, 800);
  });
};

// Function to add an inquiry to a listing
export const addMockInquiry = (listingId, inquiryData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const listing = mockListings.find(item => item.id === Number(listingId));
      if (listing) {
        listing.inquiries += 1;
        
        // In a real system, we would store this inquiry
        const inquiry = {
          id: Math.floor(Math.random() * 1000) + 1,
          listingId,
          ...inquiryData,
          dateCreated: getCurrentDate()
        };
        
        resolve({ success: true, inquiry });
      } else {
        resolve({ success: false, error: 'Listing not found' });
      }
    }, 600);
  });
};

// Export metadata for the service
export const serviceMetadata = {
  version: '1.0.0',
  lastUpdated: '2025-03-21 07:29:15',
  creator: 'RahulDabhi1722',
  description: 'Mock data service for the agricultural marketplace',
  endpoints: [
    'loadMockListings', 
    'loadMockOrders',
    'loadMockBuyerProfiles',
    'addMockListing', 
    'updateMockListing', 
    'deleteMockListing',
    'getMockListingById',
    'updateMockOrderStatus',
    'addMockInquiry'
  ]
};