'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon, CheckIcon, XMarkIcon, WrenchScrewdriverIcon, LockClosedIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'

interface Seat {
  id: string
  code: string
  x: number
  y: number
  status: 'available' | 'occupied' | 'maintenance' | 'reserved'
  type: 'permanent' | 'hot-desk' | 'team-zone'
  department?: string
}

export default function FloorPlan() {
  const params = useParams()
  const router = useRouter()
  const zoneId = params.zoneId as string

  // Mock zone data
  const [zoneInfo] = useState({
    id: zoneId,
    name: 'Zone A',
    type: 'hot-desk',
    floor: 'Floor 3',
    building: 'Building A',
  })

  // Generate office-style seats in clusters (like real office layouts)
  const generateOfficeSeats = (): Seat[] => {
    const seats: Seat[] = []
    let seatCounter = 1
    
    // Cluster 1: Top left (Engineering) - 2x2 desk cluster
    for (let i = 0; i < 4; i++) {
      seats.push({
        id: `ENG-${seatCounter}`,
        code: `ENG-${seatCounter}`,
        x: 60 + (i % 2) * 70,
        y: 60 + Math.floor(i / 2) * 70,
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        type: 'hot-desk',
        department: 'Engineering',
      })
      seatCounter++
    }

    // Cluster 2: Top center (Engineering continued) - 2x2
    for (let i = 0; i < 4; i++) {
      seats.push({
        id: `ENG-${seatCounter}`,
        code: `ENG-${seatCounter}`,
        x: 280 + (i % 2) * 70,
        y: 60 + Math.floor(i / 2) * 70,
        status: Math.random() > 0.6 ? 'occupied' : 'available',
        type: 'hot-desk',
        department: 'Engineering',
      })
      seatCounter++
    }

    // Cluster 3: Top right (Sales) - 2x2
    for (let i = 0; i < 4; i++) {
      seats.push({
        id: `SAL-${seatCounter}`,
        code: `SAL-${seatCounter}`,
        x: 500 + (i % 2) * 70,
        y: 60 + Math.floor(i / 2) * 70,
        status: Math.random() > 0.5 ? 'occupied' : 'available',
        type: 'hot-desk',
        department: 'Sales',
      })
      seatCounter++
    }

    // Cluster 4: Middle left (HR) - 3x2
    for (let i = 0; i < 6; i++) {
      seats.push({
        id: `HR-${seatCounter}`,
        code: `HR-${seatCounter}`,
        x: 60 + (i % 3) * 70,
        y: 250 + Math.floor(i / 3) * 70,
        status: Math.random() > 0.8 ? 'occupied' : 'available',
        type: 'permanent',
        department: 'HR',
      })
      seatCounter++
    }

    // Cluster 5: Middle right (Operations) - 4x2
    for (let i = 0; i < 8; i++) {
      seats.push({
        id: `OPS-${seatCounter}`,
        code: `OPS-${seatCounter}`,
        x: 430 + (i % 4) * 70,
        y: 250 + Math.floor(i / 4) * 70,
        status: Math.random() > 0.5 ? 'occupied' : 'available',
        type: 'hot-desk',
        department: 'Operations',
      })
      seatCounter++
    }

    // Cluster 6: Bottom left (Finance) - 2x2
    for (let i = 0; i < 4; i++) {
      seats.push({
        id: `FIN-${seatCounter}`,
        code: `FIN-${seatCounter}`,
        x: 60 + (i % 2) * 70,
        y: 450 + Math.floor(i / 2) * 70,
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        type: 'permanent',
        department: 'Finance',
      })
      seatCounter++
    }

    // Cluster 7: Bottom center (Engineering) - 2x2
    for (let i = 0; i < 4; i++) {
      seats.push({
        id: `ENG-${seatCounter}`,
        code: `ENG-${seatCounter}`,
        x: 280 + (i % 2) * 70,
        y: 450 + Math.floor(i / 2) * 70,
        status: Math.random() > 0.6 ? 'occupied' : 'available',
        type: 'hot-desk',
        department: 'Engineering',
      })
      seatCounter++
    }

    // Cluster 8: Bottom right (Sales) - 2x2
    for (let i = 0; i < 4; i++) {
      seats.push({
        id: `SAL-${seatCounter}`,
        code: `SAL-${seatCounter}`,
        x: 500 + (i % 2) * 70,
        y: 450 + Math.floor(i / 2) * 70,
        status: Math.random() > 0.5 ? 'occupied' : 'available',
        type: 'hot-desk',
        department: 'Sales',
      })
      seatCounter++
    }

    // Add some maintenance and reserved seats
    if (seats[5]) seats[5].status = 'maintenance'
    if (seats[12]) seats[12].status = 'reserved'
    if (seats[18]) seats[18].status = 'maintenance'
    if (seats[22]) seats[22].status = 'reserved'

    return seats
  }

  const [seats, setSeats] = useState<Seat[]>(generateOfficeSeats())
  const [selectedStatus, setSelectedStatus] = useState<Seat['status'] | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set())
  const [showDepartments, setShowDepartments] = useState(true)
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null)
  const [filterDept, setFilterDept] = useState<string | null>(null)

  const handleSeatClick = (seatId: string, currentStatus: Seat['status'], e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedStatus) {
      setSeats(seats.map(seat => 
        seat.id === seatId ? { ...seat, status: selectedStatus } : seat
      ))
      setSelectedStatus(null) // Clear selection after update
    } else {
      const newSelected = new Set(selectedSeats)
      if (newSelected.has(seatId)) {
        newSelected.delete(seatId)
      } else {
        newSelected.add(seatId)
      }
      setSelectedSeats(newSelected)
    }
  }

  const handleBulkUpdate = (status: Seat['status']) => {
    if (selectedSeats.size === 0) {
      alert('Please select seats first')
      return
    }
    setSeats(seats.map(seat => 
      selectedSeats.has(seat.id) ? { ...seat, status } : seat
    ))
    setSelectedSeats(new Set())
  }

  const getSeatColor = (status: Seat['status'], isSelected: boolean, isHovered: boolean, department?: string) => {
    if (isSelected) {
      return 'bg-sonata-500 border-sonata-700 ring-4 ring-sonata-200 shadow-lg'
    }
    
    if (isHovered) {
      return 'ring-2 ring-slate-400 shadow-md scale-105'
    }
    
    // Department colors when enabled and status is available
    if (showDepartments && department && status === 'available') {
      const deptColors: Record<string, string> = {
        'Engineering': 'bg-blue-200 border-blue-400 hover:bg-blue-300',
        'Sales': 'bg-purple-200 border-purple-400 hover:bg-purple-300',
        'HR': 'bg-green-200 border-green-400 hover:bg-green-300',
        'Operations': 'bg-orange-200 border-orange-400 hover:bg-orange-300',
        'Finance': 'bg-pink-200 border-pink-400 hover:bg-pink-300',
      }
      if (deptColors[department]) {
        return `${deptColors[department]}`
      }
    }
    
    switch (status) {
      case 'available':
        return 'bg-emerald-200 border-emerald-400 hover:bg-emerald-300 shadow-sm'
      case 'occupied':
        return 'bg-red-200 border-red-400 hover:bg-red-300 shadow-sm'
      case 'maintenance':
        return 'bg-amber-200 border-amber-400 hover:bg-amber-300 shadow-sm'
      case 'reserved':
        return 'bg-blue-200 border-blue-400 hover:bg-blue-300 shadow-sm'
      default:
        return 'bg-gray-200 border-gray-400'
    }
  }

  const getSeatIcon = (status: Seat['status']) => {
    switch (status) {
      case 'available':
        return <CheckIcon className="h-3 w-3 text-emerald-600" />
      case 'occupied':
        return <XMarkIcon className="h-3 w-3 text-red-600" />
      case 'maintenance':
        return <WrenchScrewdriverIcon className="h-3 w-3 text-amber-600" />
      case 'reserved':
        return <LockClosedIcon className="h-3 w-3 text-blue-600" />
    }
  }

  const stats = {
    total: seats.length,
    available: seats.filter(s => s.status === 'available').length,
    occupied: seats.filter(s => s.status === 'occupied').length,
    maintenance: seats.filter(s => s.status === 'maintenance').length,
    reserved: seats.filter(s => s.status === 'reserved').length,
  }

  // Group by department
  const seatsByDept = seats.reduce((acc, seat) => {
    const dept = seat.department || 'Unassigned'
    if (!acc[dept]) {
      acc[dept] = []
    }
    acc[dept].push(seat)
    return acc
  }, {} as Record<string, Seat[]>)

  // Filter seats by department
  const filteredSeats = filterDept 
    ? seats.filter(seat => seat.department === filterDept)
    : seats

  // Department stats
  const deptStats = Object.entries(seatsByDept).map(([dept, deptSeats]) => ({
    department: dept,
    total: deptSeats.length,
    available: deptSeats.filter(s => s.status === 'available').length,
    occupied: deptSeats.filter(s => s.status === 'occupied').length,
    maintenance: deptSeats.filter(s => s.status === 'maintenance').length,
    reserved: deptSeats.filter(s => s.status === 'reserved').length,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-slate-300 bg-white p-2 hover:bg-slate-50"
          >
            <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Floor Plan - {zoneInfo.name}</h1>
            <p className="text-sm text-gray-500">
              {zoneInfo.building} • {zoneInfo.floor} • {zoneInfo.type}
            </p>
          </div>
        </div>
        <button
          onClick={() => alert('Seat configuration saved!')}
          className="rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500"
        >
          Save Configuration
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="card px-4 py-3 border-l-4 border-slate-400">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Seats</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="card px-4 py-3 border-l-4 border-emerald-500">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Available</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{stats.available}</p>
          <p className="text-xs text-slate-500 mt-1">{Math.round((stats.available / stats.total) * 100)}%</p>
        </div>
        <div className="card px-4 py-3 border-l-4 border-red-500">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Occupied</p>
          <p className="mt-1 text-2xl font-bold text-red-600">{stats.occupied}</p>
          <p className="text-xs text-slate-500 mt-1">{Math.round((stats.occupied / stats.total) * 100)}%</p>
        </div>
        <div className="card px-4 py-3 border-l-4 border-amber-500">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Maintenance</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{stats.maintenance}</p>
          <p className="text-xs text-slate-500 mt-1">{Math.round((stats.maintenance / stats.total) * 100)}%</p>
        </div>
        <div className="card px-4 py-3 border-l-4 border-blue-500">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Reserved</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{stats.reserved}</p>
          <p className="text-xs text-slate-500 mt-1">{Math.round((stats.reserved / stats.total) * 100)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card">
            <div className="card-header bg-slate-50">
              <h3 className="text-sm font-semibold text-gray-900">Set Seat Status</h3>
              <p className="text-xs text-slate-500 mt-1">Click a status, then click seats to update</p>
            </div>
            <div className="card-body space-y-2">
              {(['available', 'occupied', 'maintenance', 'reserved'] as Seat['status'][]).map((status) => {
                const StatusIcon = status === 'available' ? CheckIcon :
                                  status === 'occupied' ? XMarkIcon :
                                  status === 'maintenance' ? WrenchScrewdriverIcon : LockClosedIcon
                const getStatusClasses = (isSelected: boolean) => {
                  if (!isSelected) return 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  switch (status) {
                    case 'available': return 'border-emerald-500 bg-emerald-50 shadow-md'
                    case 'occupied': return 'border-red-500 bg-red-50 shadow-md'
                    case 'maintenance': return 'border-amber-500 bg-amber-50 shadow-md'
                    case 'reserved': return 'border-blue-500 bg-blue-50 shadow-md'
                    default: return 'border-slate-200 bg-white'
                  }
                }
                const getIconClasses = () => {
                  switch (status) {
                    case 'available': return 'bg-emerald-100 border-emerald-400 text-emerald-600'
                    case 'occupied': return 'bg-red-100 border-red-400 text-red-600'
                    case 'maintenance': return 'bg-amber-100 border-amber-400 text-amber-600'
                    case 'reserved': return 'bg-blue-100 border-blue-400 text-blue-600'
                    default: return 'bg-gray-100 border-gray-400 text-gray-600'
                  }
                }
                return (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                    className={`w-full rounded-lg border-2 p-3 text-left transition-all ${getStatusClasses(selectedStatus === status)}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded border-2 flex items-center justify-center ${getIconClasses().split(' ').slice(0, 2).join(' ')}`}>
                        <StatusIcon className={`h-3 w-3 ${getIconClasses().split(' ')[2]}`} />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold capitalize text-gray-900 block">{status}</span>
                        <span className="text-xs text-slate-500">
                          {status === 'available' ? 'Ready to book' :
                           status === 'occupied' ? 'Currently in use' :
                           status === 'maintenance' ? 'Under repair' :
                           'Temporarily blocked'}
                        </span>
                      </div>
                      {selectedStatus === status && (
                        <div className="h-2 w-2 rounded-full bg-sonata-600" />
                      )}
                    </div>
                  </button>
                )
              })}
              {selectedStatus && (
                <button
                  onClick={() => setSelectedStatus(null)}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-xs font-medium text-slate-700 hover:bg-slate-100 mt-2"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-slate-50">
              <h3 className="text-sm font-semibold text-gray-900">View Options</h3>
            </div>
            <div className="card-body space-y-3">
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={showDepartments}
                  onChange={(e) => setShowDepartments(e.target.checked)}
                  className="rounded border-slate-300 text-sonata-600 focus:ring-sonata-500"
                />
                <span className="text-sm font-medium text-gray-700">Show by Department</span>
              </label>
              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs font-medium text-slate-500 mb-2">Filter by Department</p>
                <select
                  value={filterDept || ''}
                  onChange={(e) => setFilterDept(e.target.value || null)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-sonata-500 focus:outline-none focus:ring-2 focus:ring-sonata-200"
                >
                  <option value="">All Departments</option>
                  {Object.keys(seatsByDept).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {selectedSeats.size > 0 && (
            <div className="card border-2 border-sonata-200">
              <div className="card-header">
                <h3 className="text-sm font-semibold text-gray-900">
                  Bulk Update ({selectedSeats.size} seats)
                </h3>
              </div>
              <div className="card-body space-y-2">
                {(['available', 'occupied', 'maintenance', 'reserved'] as Seat['status'][]).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleBulkUpdate(status)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-slate-50 capitalize"
                  >
                    Set to {status}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedSeats(new Set())}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm font-medium text-gray-700 hover:bg-slate-100"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}

          {/* Department Legend */}
          {showDepartments && (
            <div className="card">
              <div className="card-header bg-slate-50">
                <h3 className="text-sm font-semibold text-gray-900">Departments</h3>
              </div>
              <div className="card-body space-y-3">
                {deptStats.map((deptStat) => {
                  const getDeptClasses = (isFiltered: boolean) => {
                    const base = isFiltered ? 'shadow-md' : 'hover:border-slate-300'
                    switch (deptStat.department) {
                      case 'Engineering':
                        return isFiltered ? 'border-blue-400 bg-blue-100' : `border-slate-200 bg-white ${base}`
                      case 'Sales':
                        return isFiltered ? 'border-purple-400 bg-purple-100' : `border-slate-200 bg-white ${base}`
                      case 'HR':
                        return isFiltered ? 'border-green-400 bg-green-100' : `border-slate-200 bg-white ${base}`
                      case 'Operations':
                        return isFiltered ? 'border-orange-400 bg-orange-100' : `border-slate-200 bg-white ${base}`
                      case 'Finance':
                        return isFiltered ? 'border-pink-400 bg-pink-100' : `border-slate-200 bg-white ${base}`
                      default:
                        return `border-slate-200 bg-white ${base}`
                    }
                  }
                  const getDeptColorClasses = () => {
                    switch (deptStat.department) {
                      case 'Engineering': return { border: 'border-blue-400', bg: 'bg-blue-100', text: 'text-blue-800' }
                      case 'Sales': return { border: 'border-purple-400', bg: 'bg-purple-100', text: 'text-purple-800' }
                      case 'HR': return { border: 'border-green-400', bg: 'bg-green-100', text: 'text-green-800' }
                      case 'Operations': return { border: 'border-orange-400', bg: 'bg-orange-100', text: 'text-orange-800' }
                      case 'Finance': return { border: 'border-pink-400', bg: 'bg-pink-100', text: 'text-pink-800' }
                      default: return { border: 'border-gray-300', bg: 'bg-gray-100', text: 'text-gray-800' }
                    }
                  }
                  const colors = getDeptColorClasses()
                  return (
                    <button
                      key={deptStat.department}
                      onClick={() => setFilterDept(filterDept === deptStat.department ? null : deptStat.department)}
                      className={`w-full rounded-lg border-2 p-3 text-left transition-all ${getDeptClasses(filterDept === deptStat.department)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`h-4 w-4 rounded border ${colors.border} ${colors.bg}`} />
                          <span className={`text-sm font-semibold ${colors.text}`}>{deptStat.department}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-600">{deptStat.total}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-xs">
                        <div className="text-emerald-600 font-medium">{deptStat.available}✓</div>
                        <div className="text-red-600 font-medium">{deptStat.occupied}✗</div>
                        <div className="text-amber-600 font-medium">{deptStat.maintenance}🔧</div>
                        <div className="text-blue-600 font-medium">{deptStat.reserved}🔒</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-header bg-slate-50">
              <h3 className="text-sm font-semibold text-gray-900">Status Legend</h3>
            </div>
            <div className="card-body space-y-3 text-xs">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="h-5 w-5 rounded border-2 bg-emerald-200 border-emerald-400 flex items-center justify-center">
                  <CheckIcon className="h-3 w-3 text-emerald-600" />
                </div>
                <div>
                  <span className="font-semibold text-emerald-900">Available</span>
                  <p className="text-emerald-700">Ready to book</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-red-50 border border-red-200">
                <div className="h-5 w-5 rounded border-2 bg-red-200 border-red-400 flex items-center justify-center">
                  <XMarkIcon className="h-3 w-3 text-red-600" />
                </div>
                <div>
                  <span className="font-semibold text-red-900">Occupied</span>
                  <p className="text-red-700">Currently booked</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-amber-50 border border-amber-200">
                <div className="h-5 w-5 rounded border-2 bg-amber-200 border-amber-400 flex items-center justify-center">
                  <WrenchScrewdriverIcon className="h-3 w-3 text-amber-600" />
                </div>
                <div>
                  <span className="font-semibold text-amber-900">Maintenance</span>
                  <p className="text-amber-700">Under repair</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 border border-blue-200">
                <div className="h-5 w-5 rounded border-2 bg-blue-200 border-blue-400 flex items-center justify-center">
                  <LockClosedIcon className="h-3 w-3 text-blue-600" />
                </div>
                <div>
                  <span className="font-semibold text-blue-900">Reserved</span>
                  <p className="text-blue-700">Temporarily blocked</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floor Plan */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="card-header bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Office Floor Layout</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedStatus 
                      ? `Selected: ${selectedStatus} - Click seats to update`
                      : filterDept
                      ? `Filtered: ${filterDept} - Click seats to select for bulk update`
                      : 'Select a status from the panel, then click seats to update'}
                  </p>
                </div>
                {filterDept && (
                  <button
                    onClick={() => setFilterDept(null)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
            <div className="card-body">
              {/* Office Floor Plan Container */}
              <div className="relative bg-slate-50 rounded-lg border-2 border-slate-200 overflow-hidden" style={{ minHeight: '600px', width: '100%' }}>
                {/* Meeting Room 1 - Top Center */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-40 h-28 bg-slate-200 border-2 border-slate-400 rounded-lg flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <BuildingOffice2Icon className="h-7 w-7 text-slate-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-slate-700">Meeting Room</p>
                    <p className="text-xs text-slate-600">MR-101</p>
                    <p className="text-xs text-slate-500 mt-1">Capacity: 8</p>
                  </div>
                </div>

                {/* Meeting Room 2 - Right Side */}
                <div className="absolute top-200 right-10 w-36 h-28 bg-slate-200 border-2 border-slate-400 rounded-lg flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <BuildingOffice2Icon className="h-7 w-7 text-slate-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-slate-700">Conference</p>
                    <p className="text-xs text-slate-600">MR-102</p>
                    <p className="text-xs text-slate-500 mt-1">Capacity: 12</p>
                  </div>
                </div>

                {/* Common Area / Breakout Space - Bottom Center */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-56 h-36 bg-slate-100 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-700">Common Area</p>
                    <p className="text-xs text-slate-600">Breakout Space</p>
                    <p className="text-xs text-slate-500 mt-1">Informal Meeting Area</p>
                  </div>
                </div>

                {/* Seats positioned in office clusters */}
                {filteredSeats.map((seat) => {
                  const isSelected = selectedSeats.has(seat.id)
                  const isHovered = hoveredSeat === seat.id
                  return (
                    <div
                      key={seat.id}
                      className="absolute"
                      style={{
                        left: `${seat.x}px`,
                        top: `${seat.y}px`,
                      }}
                    >
                      <button
                        onClick={(e) => handleSeatClick(seat.id, seat.status, e)}
                        onMouseEnter={() => setHoveredSeat(seat.id)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        className={`relative h-12 w-12 rounded-lg border-2 transition-all duration-200 ${getSeatColor(seat.status, isSelected, isHovered, seat.department)}`}
                        title={`${seat.code}\nStatus: ${seat.status}\nDepartment: ${seat.department || 'N/A'}\nType: ${seat.type}`}
                      >
                        <div className="flex items-center justify-center h-full">
                          {getSeatIcon(seat.status)}
                        </div>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-sonata-600 border-2 border-white shadow-lg flex items-center justify-center">
                            <CheckIcon className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                        {isHovered && !isSelected && (
                          <div className="absolute inset-0 rounded-lg border-2 border-slate-500 border-dashed animate-pulse" />
                        )}
                      </button>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-slate-700 whitespace-nowrap bg-white/90 px-1 rounded shadow-sm">
                        {seat.code}
                      </div>
                    </div>
                  )
                })}

                {/* Department Zone Labels with Backgrounds */}
                {showDepartments && (
                  <>
                    {/* Engineering Zone - Top */}
                    <div className="absolute top-140 left-20 w-280 h-140 bg-blue-50/40 border-2 border-blue-300/50 rounded-lg pointer-events-none">
                      <div className="absolute top-2 left-2 bg-blue-100 border border-blue-300 rounded px-2 py-1">
                        <p className="text-xs font-semibold text-blue-800">Engineering (12)</p>
                      </div>
                    </div>
                    
                    {/* Sales Zone - Top Right */}
                    <div className="absolute top-140 right-60 w-200 h-140 bg-purple-50/40 border-2 border-purple-300/50 rounded-lg pointer-events-none">
                      <div className="absolute top-2 right-2 bg-purple-100 border border-purple-300 rounded px-2 py-1">
                        <p className="text-xs font-semibold text-purple-800">Sales (8)</p>
                      </div>
                    </div>
                    
                    {/* HR Zone - Middle Left */}
                    <div className="absolute top-320 left-20 w-240 h-140 bg-green-50/40 border-2 border-green-300/50 rounded-lg pointer-events-none">
                      <div className="absolute top-2 left-2 bg-green-100 border border-green-300 rounded px-2 py-1">
                        <p className="text-xs font-semibold text-green-800">HR (6)</p>
                      </div>
                    </div>
                    
                    {/* Operations Zone - Middle Right */}
                    <div className="absolute top-320 right-60 w-300 h-140 bg-orange-50/40 border-2 border-orange-300/50 rounded-lg pointer-events-none">
                      <div className="absolute top-2 right-2 bg-orange-100 border border-orange-300 rounded px-2 py-1">
                        <p className="text-xs font-semibold text-orange-800">Operations (8)</p>
                      </div>
                    </div>
                    
                    {/* Finance Zone - Bottom Left */}
                    <div className="absolute bottom-160 left-20 w-200 h-140 bg-pink-50/40 border-2 border-pink-300/50 rounded-lg pointer-events-none">
                      <div className="absolute top-2 left-2 bg-pink-100 border border-pink-300 rounded px-2 py-1">
                        <p className="text-xs font-semibold text-pink-800">Finance (4)</p>
                      </div>
                    </div>
                    
                    {/* Engineering Zone - Bottom Center */}
                    <div className="absolute bottom-160 left-240 w-200 h-140 bg-blue-50/40 border-2 border-blue-300/50 rounded-lg pointer-events-none">
                      <div className="absolute top-2 left-2 bg-blue-100 border border-blue-300 rounded px-2 py-1">
                        <p className="text-xs font-semibold text-blue-800">Engineering (4)</p>
                      </div>
                    </div>
                    
                    {/* Sales Zone - Bottom Right */}
                    <div className="absolute bottom-160 right-60 w-200 h-140 bg-purple-50/40 border-2 border-purple-300/50 rounded-lg pointer-events-none">
                      <div className="absolute top-2 right-2 bg-purple-100 border border-purple-300 rounded px-2 py-1">
                        <p className="text-xs font-semibold text-purple-800">Sales (4)</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
