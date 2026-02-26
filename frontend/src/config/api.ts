// API Configuration
// This file centralizes all API base URL configuration
export const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

// Export individual API endpoints
export const API_ENDPOINTS = {
  problems: `${API_BASE}/api/problems`,
  progress: `${API_BASE}/api/progress`,
  mistakes: `${API_BASE}/api/mistakes`,
  health: `${API_BASE}/api/health`,
};

export default API_BASE;