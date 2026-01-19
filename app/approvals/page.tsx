'use client'

import { useState } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function Approvals() {
  const [pendingApprovals] = useState([
    {
      id: '1',
      type: 'seat-booking',
      subject: 'Seat A-101',
      requester: 'John Doe',
      requesterEmail: 'john.doe@company.com',
      date: '2024-01-16',
      purpose: 'Project work',
      details: 'Hot desk booking for team collaboration',
      createdAt: '2024-01-15T10:30:00',
    },
    {
      id: '2',
      type: 'visit',
      subject: 'Visitor: Rajesh Kumar',
      requester: 'John Doe',
      requesterEmail: 'john.doe@company.com',
      date: '2024-01-15',
      purpose: 'Business meeting',
      details: 'Client visit for product demo',
      createdAt: '2024-01-14T14:20:00',
    },
    {
      id: '3',
      type: 'room-booking',
      subject: 'Conference Room A',
      requester: 'Jane Smith',
      requesterEmail: 'jane.smith@company.com',
      date: '2024-01-17',
      purpose: 'Team meeting',
      details: 'Quarterly review meeting',
      createdAt: '2024-01-15T09:15:00',
    },
  ])

  const handleApprove = (id: string) => {
    if (confirm('Approve this request?')) {
      alert(`Request ${id} approved`)
    }
  }

  const handleReject = (id: string) => {
    const reason = prompt('Enter rejection reason:')
    if (reason) {
      alert(`Request ${id} rejected: ${reason}`)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'seat-booking':
        return 'bg-blue-100 text-blue-800'
      case 'visit':
        return 'bg-purple-100 text-purple-800'
      case 'room-booking':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and approve booking and visitor requests
        </p>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Requester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {pendingApprovals.map((approval) => (
                <tr key={approval.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeColor(approval.type)}`}>
                      {approval.type.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{approval.subject}</div>
                    <div className="text-sm text-gray-500">{approval.details}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{approval.requester}</div>
                    <div className="text-sm text-gray-500">{approval.requesterEmail}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(approval.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{approval.purpose}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="inline-flex items-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500"
                      >
                        <CheckCircleIcon className="mr-1 h-4 w-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(approval.id)}
                        className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500"
                      >
                        <XCircleIcon className="mr-1 h-4 w-4" />
                        Reject
                      </button>
                    </div>
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

