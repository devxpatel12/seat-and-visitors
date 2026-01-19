'use client'

import { useAuth } from '@/contexts/AuthContext'
import {
  MapPinIcon, 
  UserGroupIcon, 
  ClockIcon,
  QrCodeIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Dashboard() {
  const { user, hasRole } = useAuth()

  const stats = [
    { name: 'Available Seats', value: '127', icon: MapPinIcon, accent: 'bg-indigo-50 text-indigo-700' },
    { name: 'Visitors Today', value: '12', icon: UserGroupIcon, accent: 'bg-emerald-50 text-emerald-700' },
    { name: 'Pending Approvals', value: hasRole('manager') || hasRole('facilities') ? '5' : '0', icon: ClockIcon, accent: 'bg-amber-50 text-amber-700' },
    { name: 'Rooms Free Now', value: '7', icon: BuildingOfficeIcon, accent: 'bg-sky-50 text-sky-700' },
  ]

  const recentBookings = [
    { id: '1', seat: 'A-101', date: '2024-01-15', status: 'approved', type: 'Hot Desk' },
    { id: '2', seat: 'B-205', date: '2024-01-16', status: 'pending', type: 'Permanent' },
    { id: '3', seat: 'C-301', date: '2024-01-17', status: 'approved', type: 'Team Zone' },
  ]

  const recentVisits = [
    { id: '1', visitor: 'Rajesh Kumar', host: user?.name || 'You', status: 'checked-in', time: '09:30 AM' },
    { id: '2', visitor: 'Priya Sharma', host: user?.name || 'You', status: 'pending', time: '02:00 PM' },
  ]

  const quickActions = [
    { label: 'Book a Seat', href: '/seat-booking', icon: MapPinIcon },
    { label: 'Book Meeting Room', href: '/meeting-rooms', icon: BuildingOfficeIcon },
    { label: 'Pre-register Visitor', href: '/visitor-management/pre-register', icon: QrCodeIcon },
    { label: 'Security Check-in', href: '/security/check-in', icon: ShieldCheckIcon },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Quick view of seats, visitors, and approvals
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map(action => (
            <Link
              key={action.label}
              href={action.href}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-indigo-200 hover:bg-indigo-50"
            >
              <action.icon className="h-5 w-5 text-indigo-600" />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card px-5 py-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.accent}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm text-slate-500">{stat.name}</p>
            <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Bookings + Visits */}
        <div className="card xl:col-span-2">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-slate-900">Today at a glance</h3>
            <p className="text-sm text-slate-500">Bookings and visitors requiring your attention</p>
          </div>
          <div className="card-body grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-800">Recent Bookings</h4>
                <Link href="/my-bookings" className="text-xs font-semibold text-indigo-600">View all</Link>
              </div>
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="rounded-lg border border-slate-200 px-3 py-3 hover:border-indigo-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{booking.seat}</p>
                        <p className="text-xs text-slate-500">{booking.type}</p>
                      </div>
                      <span className={`pill ${
                        booking.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : booking.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Date: {booking.date}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-800">Visitors</h4>
                <Link href="/visitor-management" className="text-xs font-semibold text-indigo-600">Manage</Link>
              </div>
              <div className="space-y-3">
                {recentVisits.map((visit) => (
                  <div key={visit.id} className="rounded-lg border border-slate-200 px-3 py-3 hover:border-indigo-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{visit.visitor}</p>
                        <p className="text-xs text-slate-500">Host: {visit.host}</p>
                      </div>
                      <span className={`pill ${
                        visit.status === 'checked-in'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {visit.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Time: {visit.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Approvals */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-slate-900">Approvals</h3>
            <p className="text-sm text-slate-500">Requests waiting for your action</p>
          </div>
          <div className="card-body space-y-4">
            {[
              { label: 'Seat bookings', count: hasRole('manager') || hasRole('facilities') ? 3 : 0 },
              { label: 'Visitors', count: hasRole('manager') ? 2 : 0 },
              { label: 'Meeting rooms', count: 1 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500">Pending approvals</p>
                </div>
                <span className="pill bg-indigo-50 text-indigo-700">{item.count}</span>
              </div>
            ))}
            <Link
              href="/approvals"
              className="block text-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Review approvals
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
