'use client'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
type Devotion = { id: string; date: string; title: string; contentMd?: string }
export default function Devotions(){
  const [items, setItems] = useState<Devotion[]>([])
  useEffect(()=>{ api.get('/devotions').then(r=>setItems(r.data)) },[])
  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Suy niệm</h1>
      <ul className="space-y-4">
        {items.map(d => <li key={d.id}>
          <h3 className="font-semibold">{d.title} — <span className="text-sm">{new Date(d.date).toLocaleDateString()}</span></h3>
          <pre className="whitespace-pre-wrap">{d.contentMd}</pre>
        </li>)}
      </ul>
    </div>
  )
}
