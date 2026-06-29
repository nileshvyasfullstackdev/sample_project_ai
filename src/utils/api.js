// API utility functions for frontend
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function normalizeApiUrl(url) {
     const trimmed = (url || '').trim().replace(/\/+$/, '');
     if (!trimmed) return '';

     const knownApiPaths = [
          '/api/checkout/create-session',
          '/api/products',
          '/api/cart/add',
          '/api/cart/remove',
          '/api/orders',
          '/api/contact/submit',
          '/api/checkout/config',
     ];

     const lowerTrimmed = trimmed.toLowerCase();
     for (const path of knownApiPaths) {
          if (lowerTrimmed.endsWith(path.toLowerCase())) {
               return trimmed.slice(0, trimmed.length - path.length).replace(/\/+$/, '');
          }
     }

     return trimmed;
}

const apiBase = normalizeApiUrl(API_URL);
export const apiUrl = (path) => `${apiBase}${path.startsWith('/') ? path : `/${path}`}`;

export const fetchProducts = async () => {
     try {
          const response = await fetch(apiUrl('/api/products'));
          if (!response.ok) throw new Error('Failed to fetch products');
          return await response.json();
     } catch (error) {
          console.error('Error fetching products:', error);
          return [];
     }
};

export const fetchProductById = async (id) => {
     try {
          const response = await fetch(apiUrl(`/api/products/${id}`));
          if (!response.ok) throw new Error('Product not found');
          return await response.json();
     } catch (error) {
          console.error('Error fetching product:', error);
          return null;
     }
};

export const addToCart = async (cartId, item) => {
     try {
          const response = await fetch(apiUrl('/api/cart/add'), {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ cartId, item }),
          });
          if (!response.ok) throw new Error('Failed to add to cart');
          return await response.json();
     } catch (error) {
          console.error('Error adding to cart:', error);
          return null;
     }
};

export const removeFromCart = async (cartId, itemId) => {
     try {
          const response = await fetch(apiUrl(`/api/cart/remove/${itemId}?cartId=${cartId}`), {
               method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to remove from cart');
          return await response.json();
     } catch (error) {
          console.error('Error removing from cart:', error);
          return null;
     }
};

export const createOrder = async (orderData) => {
     try {
          const response = await fetch(apiUrl('/api/orders'), {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(orderData),
          });
          if (!response.ok) throw new Error('Failed to create order');
          return await response.json();
     } catch (error) {
          console.error('Error creating order:', error);
          return null;
     }
};
