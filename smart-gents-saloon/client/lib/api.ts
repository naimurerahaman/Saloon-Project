import axios from 'axios'
import type { AxiosError } from 'axios'

// ─── Axios instance ────────────────────────────────────────────────────────

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

// ─── Response interceptor ─────────────────────────────────────────────────

// The NestJS backend wraps every response with TransformInterceptor:
//   { data: T, statusCode: number, timestamp: string }
// This interceptor unwraps that envelope so callers receive T directly.

api.interceptors.response.use(
  (response) => {
    const body = response.data as Record<string, unknown>
    if (
      body !== null &&
      typeof body === 'object' &&
      'data' in body &&
      'statusCode' in body
    ) {
      return { ...response, data: body['data'] }
    }
    return response
  },
  (error: AxiosError) => {
    const body = error.response?.data as Record<string, unknown> | undefined
    const raw  = body?.['message'] ?? body?.['error'] ?? error.message ?? 'Something went wrong'
    const message = Array.isArray(raw) ? (raw as string[])[0] : String(raw)
    return Promise.reject(new Error(message))
  },
)
