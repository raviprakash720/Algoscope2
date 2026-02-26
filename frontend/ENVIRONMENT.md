# Frontend Environment Configuration

## Environment Variables

The frontend application uses environment variables for API configuration. All environment variables must be prefixed with `VITE_` to be accessible in the client-side code.

### Required Variables

- `VITE_API_URL` - The base URL for the backend API

### Local Development Setup

1. Create a `.env` file in the `frontend` directory:
```bash
cp .env.example .env
```

2. The default configuration for local development:
```env
VITE_API_URL=http://localhost:5000
```

### Production Deployment

For production deployment, set the `VITE_API_URL` to your production backend URL:

```env
VITE_API_URL=https://your-production-api.com
```

### Usage in Code

The application uses a centralized API configuration in `src/config/api.ts`:

```typescript
import { API_BASE } from '../config/api';
fetch(`${API_BASE}/api/endpoint`);
```

This ensures:
- Uses environment variable when available
- Falls back to localhost:5000 when not set
- Maintains backward compatibility

### Files Updated

The following files were updated to use environment variables:
- `src/store/useStore.ts` - Multiple API calls
- `src/pages/MistakeDashboard.tsx` - Mistake API calls
- `src/config/api.ts` - Centralized API configuration

### Validation

Run the validation script to check environment configuration:
```bash
npm run validate-env
```

### Security Notes

- Environment variables are embedded in the client-side bundle
- Do not include sensitive information in VITE_ prefixed variables
- For sensitive data, use server-side environment variables instead