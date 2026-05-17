# Axios Skill

This skill provides all the knowledge necessary to work with axios HTTP client.

## When to Use This Skill

Use this skill when the user needs:

- Make HTTP requests (GET, POST, PUT, PATCH, DELETE)
- Configure axios with custom settings
- Handle responses and errors properly
- Implement request/response interceptors
- Cancel ongoing requests
- Create reusable API instances
- Handle file uploads and form data
- Work with AxiosHeaders
- Type axios properly in TypeScript

## How to Use

The agent should load this skill when it detects:

- References to axios or HTTP client
- API request patterns
- Fetch data from endpoints
- Error handling for network requests
- Request cancellation needs
- Custom HTTP client configuration

## Main Topics

- **Request Methods**: get, post, put, patch, delete, head, options
- **Request Config**: url, method, headers, params, data, timeout, etc.
- **Response Handling**: response.data, response.status, response.headers
- **Error Handling**: AxiosError, error.response, error.message
- **Interceptors**: Request and response interceptors
- **Cancellation**: AbortController, isCancel
- **Instances**: axios.create() for reusable clients
- **AxiosHeaders**: Type-safe header management

## Usage Examples

The agent can guide the user through:

1. Setting up axios in a React/TypeScript project
2. Creating API service instances with baseURL
3. Implementing proper error handling with try/catch
4. Adding auth tokens via request interceptors
5. Cancelling requests when components unmount
6. Handling file uploads with progress events
7. Configuring timeouts and retries
8. Using TypeScript properly with axios

## Important Notes

- Recommend using `AbortController` for cancellation (not deprecated CancelToken)
- Always set timeout in production to prevent hanging requests
- Use instances (`axios.create()`) for API clients instead of global axios
- Set `maxContentLength` and `maxBodyLength` for security
- Use `AxiosHeaders` class for type-safe header management
- The adapter can be changed (xhr, http, fetch) based on environment