'use client'

import { useState } from 'react'
import { ShieldCheckIcon, LockClosedIcon, BellIcon } from '@heroicons/react/24/outline'

export default function Settings() {
  const [settings, setSettings] = useState({
    dataResidency: 'india',
    encryptionAtRest: true,
    encryptionInTransit: true,
    auditLogs: true,
    dataRetention: {
      bookings: 365,
      visits: 365,
      auditLogs: 1095,
      inactiveUsers: 90,
    },
    emailGateway: {
      provider: 'sendgrid',
      apiKey: '••••••••••••••••',
      enabled: true,
    },
    smsGateway: {
      provider: 'twilio',
      apiKey: '••••••••••••••••',
      enabled: true,
    },
    sso: {
      provider: 'azure-ad',
      enabled: true,
      clientId: '••••••••••••••••',
    },
  })

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure security, compliance, and integration settings
        </p>
      </div>

      {/* Security & Compliance */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center mb-4">
          <ShieldCheckIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Security & Compliance (India DPDP Act, 2023)</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Residency</label>
            <select
              value={settings.dataResidency}
              onChange={(e) => setSettings({ ...settings, dataResidency: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="india">India Region (Preferred)</option>
              <option value="other">Other Region</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Data residency within India is preferred for DPDP Act compliance
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Encryption at Rest</label>
              <p className="text-xs text-gray-500">Encrypt all data stored in database</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.encryptionAtRest}
                onChange={(e) => setSettings({ ...settings, encryptionAtRest: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Encryption in Transit</label>
              <p className="text-xs text-gray-500">Use TLS/SSL for all data transmission</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.encryptionInTransit}
                onChange={(e) => setSettings({ ...settings, encryptionInTransit: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Audit Logs</label>
              <p className="text-xs text-gray-500">Log all critical actions for compliance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.auditLogs}
                onChange={(e) => setSettings({ ...settings, auditLogs: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Retention Policies */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center mb-4">
          <LockClosedIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Data Retention Policies</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Booking Records (days)</label>
            <input
              type="number"
              value={settings.dataRetention.bookings}
              onChange={(e) => setSettings({
                ...settings,
                dataRetention: { ...settings.dataRetention, bookings: parseInt(e.target.value) }
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Visit Records (days)</label>
            <input
              type="number"
              value={settings.dataRetention.visits}
              onChange={(e) => setSettings({
                ...settings,
                dataRetention: { ...settings.dataRetention, visits: parseInt(e.target.value) }
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Audit Logs (days)</label>
            <input
              type="number"
              value={settings.dataRetention.auditLogs}
              onChange={(e) => setSettings({
                ...settings,
                dataRetention: { ...settings.dataRetention, auditLogs: parseInt(e.target.value) }
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Inactive User Data (days)</label>
            <input
              type="number"
              value={settings.dataRetention.inactiveUsers}
              onChange={(e) => setSettings({
                ...settings,
                dataRetention: { ...settings.dataRetention, inactiveUsers: parseInt(e.target.value) }
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center mb-4">
          <LockClosedIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">SSO Integration</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Enable SSO</label>
              <p className="text-xs text-gray-500">Single Sign-On integration</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.sso.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  sso: { ...settings.sso, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">SSO Provider</label>
            <select
              value={settings.sso.provider}
              onChange={(e) => setSettings({
                ...settings,
                sso: { ...settings.sso, provider: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="azure-ad">Azure AD</option>
              <option value="google-workspace">Google Workspace</option>
              <option value="okta">Okta</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Client ID</label>
            <input
              type="text"
              value={settings.sso.clientId}
              onChange={(e) => setSettings({
                ...settings,
                sso: { ...settings.sso, clientId: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Email & SMS Gateways */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center mb-4">
          <BellIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Email & SMS Gateways (India)</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Email Gateway</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Enable Email</label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailGateway.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      emailGateway: { ...settings.emailGateway, enabled: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider</label>
                <select
                  value={settings.emailGateway.provider}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailGateway: { ...settings.emailGateway, provider: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="sendgrid">SendGrid</option>
                  <option value="ses">AWS SES</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">API Key</label>
                <input
                  type="password"
                  value={settings.emailGateway.apiKey}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailGateway: { ...settings.emailGateway, apiKey: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">SMS Gateway</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Enable SMS</label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.smsGateway.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      smsGateway: { ...settings.smsGateway, enabled: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider</label>
                <select
                  value={settings.smsGateway.provider}
                  onChange={(e) => setSettings({
                    ...settings,
                    smsGateway: { ...settings.smsGateway, provider: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="twilio">Twilio</option>
                  <option value="aws-sns">AWS SNS</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">API Key</label>
                <input
                  type="password"
                  value={settings.smsGateway.apiKey}
                  onChange={(e) => setSettings({
                    ...settings,
                    smsGateway: { ...settings.smsGateway, apiKey: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Save All Settings
        </button>
      </div>
    </div>
  )
}

