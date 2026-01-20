'use client'

import { useState } from 'react'
import { PlusIcon, XMarkIcon, ShieldExclamationIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function BlacklistManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [blacklist] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+91 9876543210',
      company: 'XYZ Corp',
      reason: 'Security violation',
      addedBy: 'Security Admin',
      addedDate: '2024-01-10T10:00:00',
      idNumber: 'XXXX5678',
      idType: 'aadhaar',
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@vendor.com',
      phone: '+91 9876543211',
      company: 'ABC Solutions',
      reason: 'Unauthorized access attempt',
      addedBy: 'Facilities Manager',
      addedDate: '2024-01-08T14:30:00',
      idNumber: 'YYYY1234',
      idType: 'pan',
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    idType: 'aadhaar',
    idNumber: '',
    reason: '',
  })

  const handleAddToBlacklist = () => {
    if (formData.name && formData.reason) {
      alert(`Added ${formData.name} to blacklist`)
      setShowAddForm(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        idType: 'aadhaar',
        idNumber: '',
        reason: '',
      })
    }
  }

  const handleRemoveFromBlacklist = (id: string, name: string) => {
    if (confirm(`Remove ${name} from blacklist?`)) {
      alert(`${name} removed from blacklist`)
    }
  }

  const filteredBlacklist = blacklist.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blacklist / Watchlist Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage visitors who are restricted from accessing the facility
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Add to Blacklist
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total Blacklisted</p>
          <p className="mt-2 text-2xl font-semibold text-sonata-700">{blacklist.length}</p>
        </div>
        <div className="card px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">This Month</p>
          <p className="mt-2 text-2xl font-semibold text-amber-700">2</p>
        </div>
        <div className="card px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Active Entries</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-700">{blacklist.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="card-body">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, phone, or company..."
              className="w-full rounded-lg border border-slate-300 px-10 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-2 focus:ring-sonata-200 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="card border-2 border-sonata-200">
          <div className="card-header flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Add to Blacklist</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-200 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-200 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-200 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-200 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Type</label>
                <select
                  value={formData.idType}
                  onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-200 sm:text-sm"
                >
                  <option value="aadhaar">Aadhaar</option>
                  <option value="pan">PAN</option>
                  <option value="passport">Passport</option>
                  <option value="driving-license">Driving License</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Number</label>
                <input
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-200 sm:text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Reason *</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-200 sm:text-sm"
                  placeholder="Enter reason for blacklisting..."
                  required
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToBlacklist}
                className="rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500"
              >
                Add to Blacklist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blacklist Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">Blacklisted Visitors</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Visitor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Added By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date Added
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredBlacklist.map((item) => (
                <tr key={item.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <ShieldExclamationIcon className="h-5 w-5 text-red-500 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{item.email}</div>
                    <div className="text-sm text-gray-500">{item.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.reason}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {item.addedBy}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(item.addedDate).toLocaleDateString('en-IN')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleRemoveFromBlacklist(item.id, item.name)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
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

