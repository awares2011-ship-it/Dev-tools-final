'use client'
import { useEffect, useState } from 'react'

let toastFn: (msg: string) => void = () => {}
export const toast = (msg: string) => toastFn(msg)

export default function Toast() {
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    toastFn = (m: string) => {
      setMsg(m)
      setVisible(true)
      setTimeout(() => setVisible(false), 2500)
    }
  }, [])

  return (
    <div
      className={`toast transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
    >
      {msg}
    </div>
  )
}
