'use client'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'

type Event = { id: string; title: string; startsAt: string; endsAt: string; location?: string }

export default function Events() {
  // const [items, setItems] = useState<Event[]>([])

  // useEffect(() => { api.get('/events').then(r => setItems(r.data)) }, [])

  // const add = async () => {
  //   const now = new Date()
  //   const dto = { title: 'Thánh lễ', startsAt: now.toISOString(), endsAt: new Date(now.getTime() + 3600e3).toISOString(), location: 'Nhà thờ' }
  //   const { data } = await api.get('/events')
  //   setItems(data)
  // }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Lịch lễ</h1>
      {/* <button className="border rounded px-3 py-2 mb-4" onClick={add}>Tạo mẫu 1 sự kiện</button> */}
      {/* <ul className="space-y-2">
        {items.map(e => <li key={e.id} className="border rounded p-3">
          <p className="font-medium">{e.title}</p>
          <p className="text-sm">{new Date(e.startsAt).toLocaleString()} — {new Date(e.endsAt).toLocaleString()}</p>
          <p className="text-sm text-slate-600">{e.location}</p>
        </li>)}
      </ul> */}
    </div>
  )
}
