// Configuration for API endpoints
// For Vercel deployment: Use relative URLs when VITE_API_URL is not set
// In development: Use localhost:5000
// For separate backend: Set VITE_API_URL environment variable
export const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.DEV ? 'http://localhost:5000' : ''
);

export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // If API_BASE_URL is empty, use relative URL (same domain - works for Vercel monorepo)
  if (!API_BASE_URL) {
    return `/api/${cleanEndpoint}`;
  }
  
  return `${API_BASE_URL}/api/${cleanEndpoint}`;
};

