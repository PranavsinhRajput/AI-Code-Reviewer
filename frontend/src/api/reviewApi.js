import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000',
})

export async function reviewCode(code, language) {
  const { data } = await client.post('/api/review', { code, language })
  return data
}