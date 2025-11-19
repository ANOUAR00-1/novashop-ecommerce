export const apiBaseUrl: string = (import.meta as any).env?.VITE_API_BASE_URL || ''
export const useBackend: boolean = !!apiBaseUrl
