'use client'
import { api } from '@/lib/api'
import { useAuth } from '@/store/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const setToken = useAuth(s => s.setToken)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setToken(data.access_token)
      router.push('/')
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="text-xl font-semibold mb-3">Đăng nhập</h1>
      <form onSubmit={submit} className="flex flex-col gap-3 max-w-md">
        <input className="border rounded px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Mật khẩu" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="border rounded px-3 py-2">Đăng nhập</button>
      </form>
    </div>
  )
}
