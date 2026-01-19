'use client'

import { useAuth } from '@/contexts/AuthContext'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const { user } = useAuth()
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <header className="bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{today}</p>
          <h2 className="text-lg font-semibold text-slate-900">
            Welcome back, {user?.name}
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500 shadow-sm">
            <MagnifyingGlassIcon className="mr-2 h-5 w-5 text-slate-400" />
            Quick find (⌘/Ctrl + K)
          </div>
          <div className="text-sm text-slate-600">
            {user?.department} • {user?.location}
          </div>
          <button className="relative rounded-full bg-white p-1 text-slate-400 hover:text-slate-600 border border-slate-200 shadow-sm">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  )
}

