export class HttpError extends Error {
  status: number
  data: any
  constructor(status: number, message: string, data: any) {
    super(message)
    this.status = status
    this.data = data
  }
}

type Query = Record<string, string | number | boolean | undefined>

function buildQuery(query?: Query): string {
  if (!query) return ''
  const params = new URLSearchParams()
  for (const k of Object.keys(query)) {
    const v = query[k]
    if (v !== undefined && v !== null) params.append(k, String(v))
  }
  const s = params.toString()
  return s ? `?${s}` : ''
}

function getToken(): string | null {
  try {
    return localStorage.getItem('novashop_token')
  } catch {
    return null
  }
}

export async function http<T>(path: string, options: {
  method?: string
  body?: any
  headers?: Record<string, string>
  query?: Query
} = {}): Promise<T> {
  const { apiBaseUrl } = await import('./config')
  const url = `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}${buildQuery(options.query)}`
  const token = getToken()
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  const isJson = res.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await res.json() : await res.text()
  if (!res.ok) {
    const message = typeof data === 'string' ? data : data?.message || 'Request failed'
    throw new HttpError(res.status, message, data)
  }
  // Extract the 'data' field from backend response format: { success: true, data: {...} }
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data as T
  }
  return data as T
}
