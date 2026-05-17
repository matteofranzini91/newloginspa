---
name: axios
description: Expert guidance for axios HTTP client - requests, interceptors, error handling, and best practices
license: MIT
compatibility: opencode
metadata:
  audience: developers
  framework: react
---

## When to use me

Use this skill when working with HTTP requests in JavaScript/TypeScript projects. Ask me about:
- Making HTTP requests (GET, POST, PUT, PATCH, DELETE)
- Request configuration and options
- Response handling
- Error handling
- Interceptors (request/response)
- Request cancellation
- Custom instances
- AxiosHeaders
- File uploads
- Form data handling

## Documentation Index

### Getting Started
- Installation: https://axios.rest/pages/getting-started/installation
- First Steps: https://axios.rest/pages/getting-started/first-steps.html

### Core Topics
- Request Config: https://axios.rest/pages/axios/first-steps
- Response Schema: https://axios.rest/pages/axios/first-steps#response-schema
- Interceptors: https://axios.rest/pages/axios/interceptors
- Error Handling: https://axios.rest/pages/axios/error-handling
- Cancellation: https://axios.rest/pages/axios/cancellation
- Instances: https://axios.rest/pages/axios/creating-instances

### Advanced Features
- AxiosHeaders: https://axios.rest/pages/axios/axiosheaders
- Form Data: https://axios.rest/pages/axios/form-data
- Progress Events: https://axios.rest/pages/axios/progress
- Rate Limiting: https://axios.rest/pages/axios/rate-limiting
- Fetch Adapter: https://axios.rest/pages/axios/fetch-adapter
- HTTP/2: https://axios.rest/pages/axios/http2

### Security
- Security Guide: https://axios.rest/pages/misc/security

## How I work

1. When you ask about axios, I'll provide the correct approach based on best practices
2. I'll fetch the relevant documentation using the URLs above
3. I'll provide working code examples with proper TypeScript types
4. I'll show proper error handling patterns
5. I'll recommend using instances for API clients

## Quick Reference

### Installation
```bash
npm install axios
# or
pnpm add axios
# or
yarn add axios
```

### Basic Usage
```typescript
import axios from 'axios';

// GET request
const response = await axios.get('/user/12345');

// GET with params
const response = await axios.get('/user', {
  params: { ID: 12345 },
  timeout: 5000
});

// POST request
const response = await axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
});
```

### Creating an Instance
```typescript
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Error Handling
```typescript
import { AxiosError } from 'axios';

try {
  const response = await axios.get('/user/12345');
} catch (error) {
  if (error instanceof AxiosError) {
    console.log(error.response?.status);
    console.log(error.response?.data);
    console.log(error.message);
  }
}
```

### Interceptors
```typescript
// Request interceptor
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);
```

### Cancellation
```typescript
// Using AbortController (recommended)
const controller = new AbortController();

axios.get('/user/12345', { signal: controller.signal })
  .then(response => console.log(response.data));

// Cancel request
controller.abort();

// Using isCancel
import { isCancel } from 'axios';

try {
  await axios.get('/user/12345');
} catch (error) {
  if (isCancel(error)) {
    console.log('Request canceled');
  }
}
```

### AxiosHeaders
```typescript
import axios, { AxiosHeaders } from 'axios';

const headers = new AxiosHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer token'
});

axios.get('/user', { headers });
```

## TypeScript Types

```typescript
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Request config
const config: AxiosRequestConfig = {
  url: '/user',
  method: 'get',
  params: { id: 123 },
  timeout: 5000,
  headers: { 'X-Custom-Header': 'value' }
};

// Response type
const response: AxiosResponse<User> = await axios.get('/user/123');

// Error handling
interface ApiError {
  code: string;
  message: string;
}

try {
  await axios.get<User>('/user/123');
} catch (error) {
  if (error instanceof AxiosError<ApiError>) {
    console.log(error.response?.data.message);
  }
}
```

## Best Practices

1. **Use instances for API clients**: Create reusable axios instances with baseURL and default config
2. **Set timeouts**: Always set a timeout to avoid hanging requests
3. **Handle errors properly**: Use AxiosError type for proper type checking
4. **Use AbortController**: For request cancellation (recommended over CancelToken)
5. **Security**: Set `maxContentLength` and `maxBodyLength` limits to prevent decompression bombs
6. **Use params for query strings**: Don't manually build query strings
7. **Leverage interceptors**: For auth tokens, logging, error handling