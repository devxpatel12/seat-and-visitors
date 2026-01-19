'use client'

import { useState } from 'react'
import { CalendarIcon, MapPinIcon, XMarkIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function MyBookings() {
  const [bookings] = useState([
    {
      id: '1',
      seatCode: 'A-101',
      seatType: 'Hot Desk',
      location: 'Mumbai - Tech Park',
      floor: 'Floor 3',
      date: '2024-01-15',
      status: 'approved',
      purpose: 'Team collaboration',
      approver: 'Manager Name',
    },
    {
      id: '2',
      seatCode: 'B-205',
      seatType: 'Permanent',
      location: 'Mumbai - Tech Park',
      floor: 'Floor 4',
      date: '2024-01-16',
      status: 'pending',
      purpose: 'Project work',
      approver: 'Manager Name',
    },
    {
      id: '3',
      seatCode: 'C-301',
      seatType: 'Team Zone',
      location: 'Mumbai - Tech Park',
      floor: 'Floor 5',
      date: '2024-01-17',
      status: 'approved',
      purpose: 'Team meeting',
      approver: 'Team Lead',
    },
  ])

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      alert(`Booking ${id} cancelled`)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
      case 'rejected':
        return <XMarkIcon className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your seat bookings
        </p>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Seat Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Approver
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <MapPinIcon className="mr-2 h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.seatCode}</div>
                        <div className="text-sm text-gray-500">{booking.seatType} • {booking.floor}</div>
                        <div className="text-xs text-gray-400">{booking.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                      {new Date(booking.date).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{booking.purpose}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1">{booking.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{booking.approver}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    )}
                    {booking.status === 'approved' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    )}
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

