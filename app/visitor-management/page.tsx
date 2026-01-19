'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  UserPlusIcon, 
  QrCodeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

export default function VisitorManagement() {
  const [visits] = useState([
    {
      id: '1',
      visitorName: 'Rajesh Kumar',
      visitorEmail: 'rajesh@company.com',
      visitorPhone: '+91 9876543210',
      category: 'client',
      company: 'ABC Corp',
      hostName: 'John Doe',
      purpose: 'Business meeting',
      startTime: '2024-01-15T10:00:00',
      endTime: '2024-01-15T12:00:00',
      status: 'checked-in',
      checkInTime: '2024-01-15T10:05:00',
      qrCode: 'QR123456',
    },
    {
      id: '2',
      visitorName: 'Priya Sharma',
      visitorEmail: 'priya@vendor.com',
      visitorPhone: '+91 9876543211',
      category: 'vendor',
      company: 'XYZ Solutions',
      hostName: 'John Doe',
      purpose: 'Product demo',
      startTime: '2024-01-15T14:00:00',
      endTime: '2024-01-15T16:00:00',
      status: 'approved',
      qrCode: 'QR123457',
    },
    {
      id: '3',
      visitorName: 'Amit Patel',
      visitorEmail: 'amit@interview.com',
      visitorPhone: '+91 9876543212',
      category: 'interview',
      company: 'N/A',
      hostName: 'HR Manager',
      purpose: 'Technical interview',
      startTime: '2024-01-16T11:00:00',
      endTime: '2024-01-16T12:00:00',
      status: 'pending',
    },
  ])
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'checked-in':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" />
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in':
        return 'bg-green-100 text-green-800'
      case 'approved':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'client':
        return 'bg-purple-100 text-purple-800'
      case 'vendor':
        return 'bg-blue-100 text-blue-800'
      case 'interview':
        return 'bg-green-100 text-green-800'
      case 'contractor':
        return 'bg-orange-100 text-orange-800'
      case 'delivery':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visitor Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage visitor registrations, approvals, and check-ins
          </p>
        </div>
        <Link
          href="/visitor-management/pre-register"
          className="inline-flex items-center rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500"
        >
          <UserPlusIcon className="mr-2 h-5 w-5" />
          Pre-register Visitor
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total today', value: 12, tone: 'text-sonata-700 bg-sonata-50' },
          { label: 'Checked in', value: 8, tone: 'text-emerald-700 bg-emerald-50' },
          { label: 'Pending approval', value: 3, tone: 'text-amber-700 bg-amber-50' },
          { label: 'Checked out', value: 4, tone: 'text-slate-700 bg-slate-100' },
        ].map((stat, idx) => (
          <div key={idx} className="card px-4 py-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</p>
            <p className={`mt-2 text-2xl font-semibold ${stat.tone}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs and filters */}
      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-3">
          {[
            { id: 'today', label: 'Today' },
            { id: 'upcoming', label: 'Upcoming' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'today' | 'upcoming')}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeTab === tab.id ? 'bg-sonata-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 text-xs text-slate-500">
          <span className="pill bg-slate-100 text-slate-700">Client</span>
          <span className="pill bg-slate-100 text-slate-700">Vendor</span>
          <span className="pill bg-slate-100 text-slate-700">Contractor</span>
        </div>
      </div>

      {/* Visits Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visits.map((visit) => (
          <div key={visit.id} className="card">
            <div className="card-body space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-semibold text-slate-900">{visit.visitorName}</p>
                  <p className="text-sm text-slate-500">{visit.visitorEmail}</p>
                  <p className="text-xs text-slate-400">{visit.visitorPhone}</p>
                </div>
                <span className={`pill ${getStatusColor(visit.status)}`}>
                  {getStatusIcon(visit.status)}
                  <span className="ml-1">{visit.status}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                <span className={`pill ${getCategoryColor(visit.category)}`}>{visit.category}</span>
                <span className="pill bg-slate-100 text-slate-700">Host: {visit.hostName}</span>
                <span className="pill bg-slate-100 text-slate-700">Purpose: {visit.purpose}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>
                  {new Date(visit.startTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} -{' '}
                  {new Date(visit.endTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
                {visit.qrCode && (
                  <Link
                    href={`/visitor-management/${visit.id}/qr`}
                    className="inline-flex items-center gap-1 text-sonata-600 hover:text-sonata-700 text-sm font-semibold"
                  >
                    <QrCodeIcon className="h-4 w-4" />
                    View QR
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
