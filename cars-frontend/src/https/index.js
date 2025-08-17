import axios from 'axios'


export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});


// api end points

// auth
export const login = (data) => api.post('/api/user/login', data);
export const register = (data) => api.post('/api/user/register', data);
export const getUserData = () => api.get('/api/user');
export const logout = () => api.post('/api/user/logout');

// Transaction Endpoint
export const addTransaction = (data) => api.post('/api/transactions/add-transaction', data);

// Order Endpoint
export const addOrder = (data) => api.post('/api/order/', data);
export const getOrders = () => api.get('/api/order');
export const updateOrder = ({orderId, orderStatus}) => api.put(`/api/order/${orderId}`, {orderStatus});

export const extraOrder = ({orderId, ...extraData}) => api.post(`/api/order/${orderId}`, extraData);


// Categories
export const getCategories = () => api.get('/api/category');
export const addCategory = (data) => api.post('/api/category', data);


// Items  frontend API CALL
export const getItems = () => 
  api.post('/api/item/fetch', {
    search: '',       // Empty search to get all
    sort: '-createdAt', // Default sort (can be any value)
    page: 1,         // Always first page
    limit: 10000      // Large limit to get all records
  });

export const addItems = (data) => api.post('/api/item', data);
export const updateItem = ({itemId, ...itemData}) => api.put(`/api/item/${itemId}`, itemData);  // serviceData explain in Bill.jsx


// Customers
export const getCustomers = () => api.get('/api/customer');
export const addCustomer = (data) => api.post('/api/customer', data);
export const updateCustomer = ({customerId, ...balanceData}) => api.put(`/api/customer/${customerId}`, balanceData);  // serviceData explain in Bill.jsx



