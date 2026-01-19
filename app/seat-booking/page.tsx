'use client'

import { useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function SeatBooking() {
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string>('hot-desk')

  const locations = [
    { id: '1', name: 'Mumbai - Tech Park', buildings: 3, floors: 12 },
    { id: '2', name: 'Bangalore - IT Hub', buildings: 2, floors: 8 },
    { id: '3', name: 'Delhi - Corporate Office', buildings: 1, floors: 6 },
  ]

  const seatTypes = [
    { id: 'permanent', name: 'Permanent', description: 'Assigned permanent seats', available: 45 },
    { id: 'hot-desk', name: 'Hot Desk', description: 'Flexible seating for hybrid work', available: 127 },
    { id: 'team-zone', name: 'Team Zone', description: 'Collaborative team spaces', available: 23 },
  ]

  const sampleSeats = [
    { id: '1', code: 'A-101', type: 'hot-desk', floor: 'Floor 3', zone: 'Zone A', status: 'available' },
    { id: '2', code: 'A-102', type: 'hot-desk', floor: 'Floor 3', zone: 'Zone A', status: 'available' },
    { id: '3', code: 'B-201', type: 'permanent', floor: 'Floor 4', zone: 'Zone B', status: 'occupied' },
    { id: '4', code: 'C-301', type: 'team-zone', floor: 'Floor 5', zone: 'Zone C', status: 'available' },
  ]

  const handleBookSeat = () => {
    if (selectedSeat) {
      alert(`Booking seat ${selectedSeat}. Approval workflow will be triggered.`)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Book a Seat</h1>
        <p className="mt-1 text-sm text-gray-500">
          Follow the steps to pick a location, choose seat type, and confirm
        </p>
      </div>

      {/* Step 1: Basics */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Step 1</p>
            <h3 className="text-lg font-semibold text-slate-900">Choose location & date</h3>
          </div>
          <CheckCircleIcon className={`h-6 w-6 ${selectedLocation && selectedDate ? 'text-emerald-500' : 'text-slate-300'}`} />
        </div>
        <div className="card-body grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm"
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">Hybrid-ready, multi-city campuses</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Duration</label>
            <select className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm">
              <option>Full Day</option>
              <option>Half Day (Morning)</option>
              <option>Half Day (Afternoon)</option>
              <option>Custom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 2: Seat Type */}
      <div className="card">
        <div className="card-header">
          <p className="text-xs uppercase tracking-wide text-slate-500">Step 2</p>
          <h3 className="text-lg font-semibold text-slate-900">Pick seat type</h3>
        </div>
        <div className="card-body grid grid-cols-1 gap-4 md:grid-cols-3">
          {seatTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type.id)}
              className={`rounded-lg border px-4 py-4 text-left transition ${
                selectedType === type.id
                  ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{type.name}</h3>
                <span className="pill bg-slate-100 text-slate-700">{type.available} free</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Available Seats */}
      {selectedLocation && selectedDate && (
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Step 3</p>
              <h2 className="text-lg font-semibold text-slate-900">Available Seats</h2>
              <p className="text-sm text-slate-500">Filtered by your selection</p>
            </div>
            {selectedSeat && (
              <span className="pill bg-emerald-50 text-emerald-700">Selected: {selectedSeat}</span>
            )}
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sampleSeats
                .filter((seat) => seat.status === 'available' && seat.type === selectedType)
                .map((seat) => (
                  <div
                    key={seat.id}
                    onClick={() => setSelectedSeat(seat.code)}
                    className={`rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      selectedSeat === seat.code
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">{seat.code}</span>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        seat.type === 'hot-desk' 
                          ? 'bg-blue-100 text-blue-800'
                          : seat.type === 'permanent'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {seat.type}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{seat.floor}</p>
                    <p className="text-sm text-gray-500">{seat.zone}</p>
                  </div>
                ))}
            </div>

            {selectedSeat && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleBookSeat}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
                >
                  Book Seat {selectedSeat}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Rules Info */}
      <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
        <h3 className="text-sm font-semibold text-indigo-900">Booking Rules</h3>
        <ul className="mt-2 space-y-1 text-sm text-indigo-800">
          <li>• Bookings may need approval based on your role/department.</li>
          <li>• Hot desks: up to 30 days in advance. Team zones: team lead approval.</li>
          <li>• Permanent seats require manager approval and HRMS validation.</li>
          <li>• No-show policy: auto-release after grace period.</li>
        </ul>
      </div>
    </div>
  )
}

