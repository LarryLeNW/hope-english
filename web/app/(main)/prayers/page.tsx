'use client'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'

type Prayer = { id: string; title: string; content: string; createdAt: string }

export default function Prayers() {
  // const [items, setItems] = useState<Prayer[]>([])
  // const [title, setTitle] = useState(''); const [content, setContent] = useState('')

  // useEffect(() => { api.get('/prayers').then(r => setItems(r.data)) }, [])

  // const submit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setTitle(''); setContent('')
  //   const { data } = await api.get('/prayers'); setItems(data)
  // }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* <div>
        <h2 className="text-lg font-semibold mb-2">Gửi ý cầu nguyện</h2>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input className="border rounded px-3 py-2" placeholder="Tiêu đề" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea className="border rounded px-3 py-2" placeholder="Nội dung" rows={5} value={content} onChange={e => setContent(e.target.value)} />
          <button className="border rounded px-3 py-2">Gửi</button>
        </form>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Ý cầu nguyện đã duyệt</h2>
        <ul className="space-y-2">
          {items.map(p => <li key={p.id} className="border rounded p-3">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm whitespace-pre-wrap">{p.content}</div>
            <div className="text-xs text-slate-500">{new Date(p.createdAt).toLocaleString()}</div>
          </li>)}
        </ul>
      </div> */}
    </div>
  )
}
