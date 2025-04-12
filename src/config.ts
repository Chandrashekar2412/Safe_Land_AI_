// API URL configuration
// In development, the frontend runs on port 8081 and backend on port 8000
// In production, both frontend and backend run on the same port
export const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:8000' : window.location.origin); 