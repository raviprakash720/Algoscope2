// Environment Variables Validation Script
console.log('=== Environment Variables Validation ===');

// Test VITE_API_URL
const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';
console.log('VITE_API_URL:', apiUrl);

// Validate it's a proper URL format
try {
    new URL(apiUrl);
    console.log('✅ VITE_API_URL is valid');
} catch (e: any) {
    console.log('❌ VITE_API_URL is invalid:', e.message);
}

console.log('=== Validation Complete ===');