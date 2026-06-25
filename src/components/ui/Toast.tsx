'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'info' | 'error'
}

let addToastFn: ((message: string, type?: 'success' | 'info' | 'error') => void) | null = null

export function toast(message: string, type: 'success' | 'info' | 'error' = 'success') {
  addToastFn?.(message, type)
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    addToastFn = (message, type = 'success') => {
      const id = Math.random().toString(36).slice(2)
      setToasts(prev => [...prev, { id, message, type }])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 3500)
    }
    return () => { addToastFn = null }
  }, [])

  const icons = {
    success: <CheckCircle size={16} className="text-green-400" />,
    info: <Info size={16} className="text-blue-400" />,
    error: <AlertTriangle size={16} className="text-red-400" />,
  }

  const borderColors = {
    success: 'border-l-green-500',
    info: 'border-l-blue-500',
    error: 'border-l-red-500',
  }

  return (
    <div className="fixed top-20 right-4 z-[200] flex flex-col gap-2 max-w-sm" role="log" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast-enter glass-card border-l-4 ${borderColors[t.type]} rounded-lg p-4 flex items-center gap-3 shadow-2xl`} role="alert">
          {icons[t.type]}
          <span className="text-xs font-bold text-white tracking-wide flex-1">{t.message}</span>
          <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="text-gray-500 hover:text-white" aria-label="Dismiss">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
