'use client'

import { useState } from 'react'
import { PlusIcon, BuildingOfficeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function SeatConfiguration() {
  const [locations] = useState([
    {
      id: '1',
      name: 'Mumbai - Tech Park',
      address: 'Andheri East, Mumbai',
      buildings: [
        {
          id: 'b1',
          name: 'Building A',
          floors: [
            {
              id: 'f1',
              name: 'Floor 1',
              zones: [
                { id: 'z1', name: 'Zone A', type: 'hot-desk', seats: 50 },
                { id: 'z2', name: 'Zone B', type: 'permanent', seats: 30 },
              ],
            },
            {
              id: 'f2',
              name: 'Floor 2',
              zones: [
                { id: 'z3', name: 'Zone C', type: 'team-zone', seats: 20 },
              ],
            },
          ],
        },
      ],
    },
  ])

  const [selectedLocation, setSelectedLocation] = useState(locations[0])

  const handleAddLocation = () => {
    // TODO: Implement add location functionality
    alert('Add location functionality will be implemented')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seat Configuration</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure buildings, floors, zones, and individual seats
          </p>
        </div>
        <button
          onClick={handleAddLocation}
          className="inline-flex items-center rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Add Location
        </button>
      </div>

      {/* Location Selector */}
      <div className="rounded-lg bg-white p-4 shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Location</label>
        <select
          value={selectedLocation.id}
          onChange={(e) => {
            const loc = locations.find(l => l.id === e.target.value)
            if (loc) setSelectedLocation(loc)
          }}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-500 sm:text-sm"
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>
      </div>

      {/* Building/Floor/Zone Tree */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{selectedLocation.name}</h2>
          <p className="text-sm text-gray-500">{selectedLocation.address}</p>
        </div>
        <div className="p-6">
          {selectedLocation.buildings.map((building) => (
            <div key={building.id} className="mb-6">
              <div className="flex items-center mb-4">
                <BuildingOfficeIcon className="h-6 w-6 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">{building.name}</h3>
                <button className="ml-4 text-sm text-sonata-600 hover:text-sonata-500">
                  Add Floor
                </button>
              </div>
              
              {building.floors.map((floor) => (
                <div key={floor.id} className="ml-8 mb-4">
                  <div className="flex items-center mb-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <h4 className="text-md font-medium text-gray-800">{floor.name}</h4>
                    <button className="ml-4 text-sm text-sonata-600 hover:text-sonata-500">
                      Add Zone
                    </button>
                  </div>
                  
                  <div className="ml-8 space-y-2">
                    {floor.zones.map((zone) => (
                      <div key={zone.id} className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{zone.name}</span>
                          <span className={`ml-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            zone.type === 'hot-desk' 
                              ? 'bg-blue-100 text-blue-800'
                              : zone.type === 'permanent'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {zone.type}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">{zone.seats} seats</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-sm text-sonata-600 hover:text-sonata-500">
                            Configure Seats
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-500">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Seat Types Configuration */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Seat Types</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900">Permanent</h3>
            <p className="mt-1 text-sm text-gray-500">Assigned permanent seats for employees</p>
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-700">Booking Rules</label>
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 text-xs">
                <option>Manager Approval Required</option>
                <option>Auto-approve</option>
              </select>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900">Hot Desk</h3>
            <p className="mt-1 text-sm text-gray-500">Flexible seating for hybrid work</p>
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-700">Booking Rules</label>
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 text-xs">
                <option>Auto-approve</option>
                <option>Department-based</option>
              </select>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900">Team Zone</h3>
            <p className="mt-1 text-sm text-gray-500">Collaborative team spaces</p>
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-700">Booking Rules</label>
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 text-xs">
                <option>Team Lead Approval</option>
                <option>Manager Approval</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Rules Configuration */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Rules</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Role-based Rules</h3>
              <p className="text-xs text-gray-500">Configure booking rules by employee role</p>
            </div>
            <button className="text-sm text-sonata-600 hover:text-sonata-500">Configure</button>
          </div>
          <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Department-based Rules</h3>
              <p className="text-xs text-gray-500">Set booking rules by department</p>
            </div>
            <button className="text-sm text-sonata-600 hover:text-sonata-500">Configure</button>
          </div>
          <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Location-based Rules</h3>
              <p className="text-xs text-gray-500">Define rules specific to locations</p>
            </div>
            <button className="text-sm text-sonata-600 hover:text-sonata-500">Configure</button>
          </div>
        </div>
      </div>
    </div>
  )
}

