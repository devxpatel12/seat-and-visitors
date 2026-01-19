'use client'

import { useState } from 'react'
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function HRMSIntegration() {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle')
  const [lastSync, setLastSync] = useState<Date | null>(new Date('2024-01-14T10:30:00'))
  const [integrationConfig, setIntegrationConfig] = useState({
    enabled: true,
    apiEndpoint: 'https://hrms.company.com/api/v1',
    apiKey: '••••••••••••••••',
    syncFrequency: 'hourly',
    autoDeactivate: true,
    syncDepartments: true,
    syncDesignations: true,
    syncLocations: true,
  })

  const [syncStats] = useState({
    totalEmployees: 1250,
    activeEmployees: 1180,
    inactiveEmployees: 70,
    departments: 12,
    locations: 3,
    lastSyncCount: 15,
  })

  const handleSync = async () => {
    setSyncStatus('syncing')
    // Simulate API call
    setTimeout(() => {
      setSyncStatus('success')
      setLastSync(new Date())
      setTimeout(() => setSyncStatus('idle'), 3000)
    }, 2000)
  }

  const handleSaveConfig = () => {
    alert('Configuration saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">HRMS Integration</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure and manage integration with HRMS for employee master data sync
        </p>
      </div>

      {/* Sync Status */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Sync Status</h2>
          <button
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
            className="inline-flex items-center rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowPathIcon className={`mr-2 h-5 w-5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Last Sync</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {lastSync ? lastSync.toLocaleString('en-IN') : 'Never'}
                </p>
              </div>
              {syncStatus === 'success' && (
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              )}
              {syncStatus === 'error' && (
                <XCircleIcon className="h-8 w-8 text-red-500" />
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-500">Sync Frequency</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 capitalize">
              {integrationConfig.syncFrequency}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="mt-1 text-lg font-semibold text-green-600">
              {integrationConfig.enabled ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      </div>

      {/* Sync Statistics */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sync Statistics</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Employees</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{syncStats.totalEmployees}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active</p>
            <p className="mt-1 text-2xl font-bold text-green-600">{syncStats.activeEmployees}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Inactive</p>
            <p className="mt-1 text-2xl font-bold text-red-600">{syncStats.inactiveEmployees}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Departments</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{syncStats.departments}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Locations</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{syncStats.locations}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Sync</p>
            <p className="mt-1 text-2xl font-bold text-sonata-600">+{syncStats.lastSyncCount}</p>
          </div>
        </div>
      </div>

      {/* Integration Configuration */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Integration Configuration</h2>
          <button
            onClick={handleSaveConfig}
            className="rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500"
          >
            Save Configuration
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Enable HRMS Integration</label>
              <p className="text-xs text-gray-500">Enable automatic sync with HRMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={integrationConfig.enabled}
                onChange={(e) => setIntegrationConfig({ ...integrationConfig, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sonata-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sonata-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">API Endpoint</label>
            <input
              type="text"
              value={integrationConfig.apiEndpoint}
              onChange={(e) => setIntegrationConfig({ ...integrationConfig, apiEndpoint: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">API Key</label>
            <input
              type="password"
              value={integrationConfig.apiKey}
              onChange={(e) => setIntegrationConfig({ ...integrationConfig, apiKey: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sync Frequency</label>
            <select
              value={integrationConfig.syncFrequency}
              onChange={(e) => setIntegrationConfig({ ...integrationConfig, syncFrequency: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-500 sm:text-sm"
            >
              <option value="realtime">Real-time</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900">Auto-deactivate on Employee Exit</label>
                <p className="text-xs text-gray-500">Automatically deactivate employees when they exit in HRMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={integrationConfig.autoDeactivate}
                  onChange={(e) => setIntegrationConfig({ ...integrationConfig, autoDeactivate: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sonata-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sonata-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900">Sync Departments</label>
                <p className="text-xs text-gray-500">Sync department master data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={integrationConfig.syncDepartments}
                  onChange={(e) => setIntegrationConfig({ ...integrationConfig, syncDepartments: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sonata-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sonata-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900">Sync Designations</label>
                <p className="text-xs text-gray-500">Sync designation/role master data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={integrationConfig.syncDesignations}
                  onChange={(e) => setIntegrationConfig({ ...integrationConfig, syncDesignations: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sonata-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sonata-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900">Sync Locations</label>
                <p className="text-xs text-gray-500">Sync location master data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={integrationConfig.syncLocations}
                  onChange={(e) => setIntegrationConfig({ ...integrationConfig, syncLocations: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sonata-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sonata-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Department/Location Rules */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Department & Location Rules</h2>
        <p className="text-sm text-gray-500 mb-4">
          Configure booking rules based on department, designation, and location from HRMS data
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Department-based Rules</h3>
              <p className="text-xs text-gray-500">Set booking rules by department</p>
            </div>
            <button className="text-sm text-sonata-600 hover:text-sonata-500">Configure</button>
          </div>
          <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Designation-based Rules</h3>
              <p className="text-xs text-gray-500">Set booking rules by designation/role</p>
            </div>
            <button className="text-sm text-sonata-600 hover:text-sonata-500">Configure</button>
          </div>
          <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Location-based Rules</h3>
              <p className="text-xs text-gray-500">Set booking rules by employee location</p>
            </div>
            <button className="text-sm text-sonata-600 hover:text-sonata-500">Configure</button>
          </div>
        </div>
      </div>
    </div>
  )
}

