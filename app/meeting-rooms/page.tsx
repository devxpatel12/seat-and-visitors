'use client'

import { useState } from 'react'
import { CalendarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default function MeetingRooms() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [rooms] = useState([
    {
      id: '1',
      name: 'Conference Room A',
      capacity: 20,
      floor: 'Floor 3',
      resources: ['Projector', 'Whiteboard', 'Video Conferencing'],
      availability: [
        { time: '09:00-10:00', available: true },
        { time: '10:00-11:00', available: false },
        { time: '11:00-12:00', available: true },
        { time: '14:00-15:00', available: true },
        { time: '15:00-16:00', available: true },
      ],
    },
    {
      id: '2',
      name: 'Conference Room B',
      capacity: 15,
      floor: 'Floor 3',
      resources: ['Projector', 'Whiteboard'],
      availability: [
        { time: '09:00-10:00', available: true },
        { time: '10:00-11:00', available: true },
        { time: '11:00-12:00', available: true },
        { time: '14:00-15:00', available: false },
        { time: '15:00-16:00', available: true },
      ],
    },
    {
      id: '3',
      name: 'Board Room',
      capacity: 30,
      floor: 'Floor 5',
      resources: ['Projector', 'Whiteboard', 'Video Conferencing', 'Catering'],
      availability: [
        { time: '09:00-10:00', available: false },
        { time: '10:00-11:00', available: false },
        { time: '11:00-12:00', available: true },
        { time: '14:00-15:00', available: true },
        { time: '15:00-16:00', available: true },
      ],
    },
  ])

  const handleBookRoom = (roomId: string, timeSlot: string) => {
    alert(`Booking ${roomId} for ${timeSlot}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meeting Rooms</h1>
        <p className="mt-1 text-sm text-gray-500">
          Book meeting rooms and shared assets
        </p>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select duration</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <UserGroupIcon className="mr-1 h-4 w-4" />
                    Capacity: {room.capacity}
                  </span>
                  <span className="flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {room.floor}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {room.resources.map((resource, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                    >
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Available Time Slots</h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                {room.availability.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBookRoom(room.id, slot.time)}
                    disabled={!slot.available}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      slot.available
                        ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <ClockIcon className="mr-1 h-4 w-4" />
                      {slot.time}
                    </div>
                    {!slot.available && (
                      <div className="mt-1 text-xs">Booked</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

