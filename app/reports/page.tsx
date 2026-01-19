'use client'

import { useState } from 'react'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function Reports() {
  const [dateRange, setDateRange] = useState('last7days')
  const [selectedReport, setSelectedReport] = useState('occupancy')

  // Mock data
  const occupancyData = [
    { date: '2024-01-08', occupied: 320, available: 180, utilization: 64 },
    { date: '2024-01-09', occupied: 350, available: 150, utilization: 70 },
    { date: '2024-01-10', occupied: 380, available: 120, utilization: 76 },
    { date: '2024-01-11', occupied: 340, available: 160, utilization: 68 },
    { date: '2024-01-12', occupied: 360, available: 140, utilization: 72 },
    { date: '2024-01-13', occupied: 330, available: 170, utilization: 66 },
    { date: '2024-01-14', occupied: 370, available: 130, utilization: 74 },
  ]

  const departmentData = [
    { department: 'Engineering', occupancy: 85, bookings: 120 },
    { department: 'Sales', occupancy: 70, bookings: 80 },
    { department: 'HR', occupancy: 60, bookings: 45 },
    { department: 'Finance', occupancy: 75, bookings: 60 },
    { department: 'Operations', occupancy: 65, bookings: 55 },
  ]

  const locationData = [
    { location: 'Mumbai', occupancy: 72, visitors: 45 },
    { location: 'Bangalore', occupancy: 68, visitors: 38 },
    { location: 'Delhi', occupancy: 65, visitors: 28 },
  ]

  const visitorCategoryData = [
    { name: 'Client', value: 45 },
    { name: 'Vendor', value: 30 },
    { name: 'Interview', value: 15 },
    { name: 'Contractor', value: 8 },
    { name: 'Delivery', value: 2 },
  ]

  const visitorTrendData = [
    { date: '2024-01-08', visitors: 25, checkedIn: 22 },
    { date: '2024-01-09', visitors: 30, checkedIn: 28 },
    { date: '2024-01-10', visitors: 35, checkedIn: 32 },
    { date: '2024-01-11', visitors: 28, checkedIn: 25 },
    { date: '2024-01-12', visitors: 32, checkedIn: 30 },
    { date: '2024-01-13', visitors: 40, checkedIn: 38 },
    { date: '2024-01-14', visitors: 38, checkedIn: 35 },
  ]

  const noShowData = [
    { date: '2024-01-08', noShows: 3, violations: 1 },
    { date: '2024-01-09', noShows: 2, violations: 0 },
    { date: '2024-01-10', noShows: 3, violations: 2 },
    { date: '2024-01-11', noShows: 3, violations: 1 },
    { date: '2024-01-12', noShows: 2, violations: 1 },
    { date: '2024-01-13', noShows: 2, violations: 0 },
    { date: '2024-01-14', noShows: 3, violations: 1 },
  ]

  const handleExport = (format: 'csv' | 'excel') => {
    alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            View seat utilization, occupancy, and visitor analytics
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-500"
          >
            <option value="today">Today</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last3months">Last 3 Months</option>
            <option value="custom">Custom Range</option>
          </select>
          <button
            onClick={() => handleExport('excel')}
            className="inline-flex items-center rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500"
          >
            <ArrowDownTrayIcon className="mr-2 h-5 w-5" />
            Export Excel
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="mr-2 h-5 w-5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'occupancy', name: 'Seat Occupancy' },
            { id: 'utilization', name: 'Utilization' },
            { id: 'visitors', name: 'Visitors' },
            { id: 'noshow', name: 'No-Shows & Violations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedReport(tab.id)}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                selectedReport === tab.id
                  ? 'border-sonata-500 text-sonata-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Occupancy Report */}
      {selectedReport === 'occupancy' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Occupancy Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="occupied" stroke="#3b82f6" name="Occupied" />
                  <Line type="monotone" dataKey="available" stroke="#10b981" name="Available" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Occupancy</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="occupancy" fill="#3b82f6" name="Occupancy %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location-wise Analytics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="occupancy" fill="#3b82f6" name="Occupancy %" />
                <Bar dataKey="visitors" fill="#10b981" name="Visitors" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Utilization Report */}
      {selectedReport === 'utilization' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">Overall Utilization</h3>
              <p className="mt-2 text-3xl font-bold text-sonata-600">72%</p>
              <p className="mt-1 text-sm text-gray-500">500 seats / 360 occupied</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">Peak Utilization</h3>
              <p className="mt-2 text-3xl font-bold text-green-600">85%</p>
              <p className="mt-1 text-sm text-gray-500">On 2024-01-10</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">Average Utilization</h3>
              <p className="mt-2 text-3xl font-bold text-blue-600">68%</p>
              <p className="mt-1 text-sm text-gray-500">Last 7 days</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Utilization</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="department" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="occupancy" fill="#3b82f6" name="Occupancy %" />
                <Bar dataKey="bookings" fill="#10b981" name="Total Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Visitors Report */}
      {selectedReport === 'visitors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Visitor Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visitorTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="#3b82f6" name="Total Visitors" />
                  <Line type="monotone" dataKey="checkedIn" stroke="#10b981" name="Checked In" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Visitor Categories</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={visitorCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {visitorCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* No-Shows & Violations */}
      {selectedReport === 'noshow' && (
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">No-Shows & Policy Violations</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={noShowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="noShows" fill="#f59e0b" name="No-Shows" />
                <Bar dataKey="violations" fill="#ef4444" name="Policy Violations" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Violation Details</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Violation Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">2024-01-10</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">John Doe</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">No-Show</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Booked seat A-101 but did not check in</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">2024-01-10</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Jane Smith</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Policy Violation</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Booked permanent seat without approval</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

