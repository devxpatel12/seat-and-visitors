'use client'

import { useState } from 'react'
import { QrCodeIcon, KeyIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface VisitorInfo {
  id: string
  name: string
  email: string
  phone: string
  category: string
  company: string
  hostName: string
  purpose: string
  startTime: string
  endTime: string
  idNumber: string
  blacklistFlag: boolean
}

export default function SecurityCheckIn() {
  const [checkInMethod, setCheckInMethod] = useState<'qr' | 'otp'>('qr')
  const [otp, setOtp] = useState('')
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null)
  const [blacklistCheck, setBlacklistCheck] = useState(false)

  const handleQRScan = () => {
    // Mock visitor data - QR code scanned
    setVisitorInfo({
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@company.com',
      phone: '+91 9876543210',
      category: 'client',
      company: 'ABC Corp',
      hostName: 'John Doe',
      purpose: 'Business meeting',
      startTime: '2024-01-15T10:00:00',
      endTime: '2024-01-15T12:00:00',
      idNumber: 'XXXX1234',
      blacklistFlag: false,
    })
    setBlacklistCheck(true)
  }

  const handleOTPSubmit = () => {
    // Mock OTP validation
    setVisitorInfo({
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@company.com',
      phone: '+91 9876543210',
      category: 'client',
      company: 'ABC Corp',
      hostName: 'John Doe',
      purpose: 'Business meeting',
      startTime: '2024-01-15T10:00:00',
      endTime: '2024-01-15T12:00:00',
      idNumber: 'XXXX1234',
      blacklistFlag: false,
    })
    setBlacklistCheck(true)
  }

  const handleCheckIn = () => {
    if (visitorInfo && !visitorInfo.blacklistFlag) {
      alert('Visitor checked in successfully! Badge and gate pass generated.')
      // Reset form
      setVisitorInfo(null)
      setOtp('')
      setBlacklistCheck(false)
    }
  }

  const handleCheckOut = () => {
    if (visitorInfo) {
      alert('Visitor checked out successfully!')
      setVisitorInfo(null)
      setOtp('')
      setBlacklistCheck(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Security Desk</h1>
        <p className="mt-1 text-sm text-gray-500">
          Scan QR or verify OTP, run blacklist checks, and check visitors in/out
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Check-in Method */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Check-in Method</h2>
            <p className="text-sm text-slate-500">Choose how you want to validate the visitor</p>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setCheckInMethod('qr')}
              className={`flex-1 rounded-md px-4 py-3 text-sm font-medium ${
                checkInMethod === 'qr'
                  ? 'bg-sonata-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <QrCodeIcon className="mx-auto h-6 w-6 mb-1" />
              QR Code
            </button>
            <button
              onClick={() => setCheckInMethod('otp')}
              className={`flex-1 rounded-md px-4 py-3 text-sm font-medium ${
                checkInMethod === 'otp'
                  ? 'bg-sonata-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <KeyIcon className="mx-auto h-6 w-6 mb-1" />
              OTP
            </button>
          </div>

          {checkInMethod === 'qr' ? (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Scan QR Code</p>
                <div className="inline-block p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <QrCodeIcon className="h-32 w-32 text-gray-400 mx-auto" />
                  <p className="mt-2 text-xs text-gray-500">QR Code Scanner</p>
                </div>
              </div>
              <button
                onClick={() => handleQRScan()}
                className="w-full rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500"
              >
                Simulate QR Scan
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-sonata-500 focus:outline-none focus:ring-sonata-500 sm:text-sm"
                />
              </div>
              <button
                onClick={handleOTPSubmit}
                className="w-full rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500"
              >
                Validate OTP
              </button>
            </div>
          )}
        </div>

        {/* Visitor Information */}
        {visitorInfo && (
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Visitor Information</h2>
                <p className="text-sm text-slate-500">Verify identity and proceed to check-in</p>
              </div>
              {blacklistCheck && (
                <span className={`pill ${
                  visitorInfo.blacklistFlag ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {visitorInfo.blacklistFlag ? 'Blacklisted' : 'Clear'}
                </span>
              )}
            </div>
            
            {blacklistCheck && (
              <div className={`mb-4 rounded-md p-3 ${
                visitorInfo.blacklistFlag 
                  ? 'bg-red-50 border border-red-200' 
                  : 'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-center">
                  {visitorInfo.blacklistFlag ? (
                    <>
                      <XCircleIcon className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-sm font-medium text-red-800">BLACKLISTED - Access Denied</span>
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">Not in blacklist - Proceed</span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Name:</span>
                <p className="text-sm text-gray-900">{visitorInfo.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Email:</span>
                <p className="text-sm text-gray-900">{visitorInfo.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Phone:</span>
                <p className="text-sm text-gray-900">{visitorInfo.phone}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Category:</span>
                <p className="text-sm text-gray-900 capitalize">{visitorInfo.category}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Company:</span>
                <p className="text-sm text-gray-900">{visitorInfo.company}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Host:</span>
                <p className="text-sm text-gray-900">{visitorInfo.hostName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Purpose:</span>
                <p className="text-sm text-gray-900">{visitorInfo.purpose}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Visit Time:</span>
                <p className="text-sm text-gray-900">
                  {new Date(visitorInfo.startTime).toLocaleString('en-IN')} - {new Date(visitorInfo.endTime).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {!visitorInfo.blacklistFlag && (
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={handleCheckIn}
                  className="flex-1 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
                >
                  Check In
                </button>
                <button
                  onClick={handleCheckOut}
                  className="flex-1 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-500"
                >
                  Check Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

