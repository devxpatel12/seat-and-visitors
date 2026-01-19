'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/types'
import {
  HomeIcon,
  MapPinIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, roles: ['employee', 'manager', 'hr', 'facilities', 'security', 'admin'] },
  { name: 'Book Seat', href: '/seat-booking', icon: MapPinIcon, roles: ['employee', 'manager'] },
  { name: 'My Bookings', href: '/my-bookings', icon: CalendarIcon, roles: ['employee', 'manager'] },
  { name: 'Meeting Rooms', href: '/meeting-rooms', icon: BuildingOfficeIcon, roles: ['employee', 'manager'] },
  { name: 'Approvals', href: '/approvals', icon: CheckCircleIcon, roles: ['manager', 'facilities', 'admin'] },
  { name: 'Seat Configuration', href: '/admin/seats', icon: BuildingOfficeIcon, roles: ['facilities', 'admin'] },
  { name: 'Visitor Management', href: '/visitor-management', icon: UserGroupIcon, roles: ['employee', 'manager', 'facilities', 'security', 'admin'] },
  { name: 'Pre-register Visitor', href: '/visitor-management/pre-register', icon: IdentificationIcon, roles: ['employee', 'manager'] },
  { name: 'Security Desk', href: '/security/check-in', icon: ShieldCheckIcon, roles: ['security', 'admin'] },
  { name: 'Reports & Analytics', href: '/reports', icon: ChartBarIcon, roles: ['hr', 'facilities', 'admin'] },
  { name: 'HRMS Integration', href: '/admin/hrms', icon: Cog6ToothIcon, roles: ['hr', 'admin'] },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon, roles: ['admin'] },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { user, logout, hasAnyRole } = useAuth()

  const filteredNavigation = navigation.filter(item => 
    hasAnyRole(item.roles as UserRole[])
  )

  return (
    <div className="flex h-full w-68 flex-col border-r border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 border-b border-slate-200 bg-slate-900">
        <div className="h-10 w-10 rounded-lg bg-sonata-600 text-white flex items-center justify-center font-bold">
          S
        </div>
        <div>
          <p className="text-xs text-slate-400">Sonata Software</p>
          <h1 className="text-sm font-bold text-white">Workplace Platform</h1>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-sonata-50 text-sonata-700 border border-sonata-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon
                className={`mr-3 h-6 w-6 flex-shrink-0 ${
                  isActive ? 'text-sonata-600' : 'text-slate-400 group-hover:text-slate-500'
                }`}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-slate-200 p-4">
        <div className="mb-2 text-sm text-slate-600">
          <div className="font-medium text-slate-900">{user?.name}</div>
          <div className="text-xs uppercase tracking-wide text-slate-500">{user?.role}</div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6" />
          Logout
        </button>
      </div>
    </div>
  )
}

