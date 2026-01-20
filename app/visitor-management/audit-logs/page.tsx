'use client'

import { useState } from 'react'
import { ClockIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'

export default function VisitorAuditLogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'check-in' | 'check-out' | 'pre-register' | 'approval'>('all')

  const [auditLogs] = useState([
    {
      id: '1',
      timestamp: '2024-01-15T10:05:00',
      action: 'check-in',
      actorName: 'Security Guard',
      visitorName: 'Rajesh Kumar',
      visitorEmail: 'rajesh@company.com',
      visitId: 'V-001',
      details: 'QR code scanned and validated. Badge generated.',
      ipAddress: '192.168.1.100',
      location: 'Main Gate',
    },
    {
      id: '2',
      timestamp: '2024-01-15T10:00:00',
      action: 'pre-register',
      actorName: 'John Doe',
      visitorName: 'Rajesh Kumar',
      visitorEmail: 'rajesh@company.com',
      visitId: 'V-001',
      details: 'Visitor pre-registered for business meeting',
      ipAddress: '192.168.1.50',
      location: 'Office Network',
    },
    {
      id: '3',
      timestamp: '2024-01-15T09:55:00',
      action: 'approval',
      actorName: 'Manager Name',
      visitorName: 'Rajesh Kumar',
      visitorEmail: 'rajesh@company.com',
      visitId: 'V-001',
      details: 'Visit approved by host manager',
      ipAddress: '192.168.1.75',
      location: 'Office Network',
    },
    {
      id: '4',
      timestamp: '2024-01-15T12:10:00',
      action: 'check-out',
      actorName: 'Security Guard',
      visitorName: 'Rajesh Kumar',
      visitorEmail: 'rajesh@company.com',
      visitId: 'V-001',
      details: 'Visitor checked out. Gate pass collected.',
      ipAddress: '192.168.1.100',
      location: 'Main Gate',
    },
    {
      id: '5',
      timestamp: '2024-01-15T14:05:00',
      action: 'check-in',
      actorName: 'Security Guard',
      visitorName: 'Priya Sharma',
      visitorEmail: 'priya@vendor.com',
      visitId: 'V-002',
      details: 'OTP validated. Badge generated.',
      ipAddress: '192.168.1.100',
      location: 'Main Gate',
    },
    {
      id: '6',
      timestamp: '2024-01-14T16:20:00',
      action: 'blacklist-check',
      actorName: 'Security Guard',
      visitorName: 'Amit Patel',
      visitorEmail: 'amit@company.com',
      visitId: 'V-003',
      details: 'Blacklist check performed - Clear',
      ipAddress: '192.168.1.100',
      location: 'Main Gate',
    },
  ])

  const getActionColor = (action: string) => {
    switch (action) {
      case 'check-in':
        return 'bg-emerald-100 text-emerald-800'
      case 'check-out':
        return 'bg-blue-100 text-blue-800'
      case 'pre-register':
        return 'bg-amber-100 text-amber-800'
      case 'approval':
        return 'bg-purple-100 text-purple-800'
      case 'blacklist-check':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.visitorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.visitId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || log.action === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visitor Audit Logs & History</h1>
        <p className="mt-1 text-sm text-gray-500">
          Complete audit trail of all visitor-related activities
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="card px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total Logs</p>
          <p className="mt-2 text-2xl font-semibold text-sonata-700">{auditLogs.length}</p>
        </div>
        <div className="card px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Check-ins Today</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-700">8</p>
        </div>
        <div className="card px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Check-outs Today</p>
          <p className="mt-2 text-2xl font-semibold text-blue-700">4</p>
        </div>
        <div className="card px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">This Week</p>
          <p className="mt-2 text-2xl font-semibold text-slate-700">45</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by visitor name, email, or visit ID..."
                className="w-full rounded-lg border border-slate-300 px-10 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-2 focus:ring-sonata-200 sm:text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-2 focus:ring-sonata-200"
              >
                <option value="all">All Actions</option>
                <option value="pre-register">Pre-registration</option>
                <option value="approval">Approval</option>
                <option value="check-in">Check-in</option>
                <option value="check-out">Check-out</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">Audit Trail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Visitor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Performed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location / IP
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <ClockIcon className="mr-2 h-4 w-4 text-slate-400" />
                      <div>
                        <div>{new Date(log.timestamp).toLocaleDateString('en-IN')}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`pill ${getActionColor(log.action)}`}>
                      {log.action.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{log.visitorName}</div>
                    <div className="text-sm text-gray-500">{log.visitorEmail}</div>
                    <div className="text-xs text-gray-400">Visit: {log.visitId}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {log.actorName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{log.location}</div>
                    <div className="text-xs text-gray-500">{log.ipAddress}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

