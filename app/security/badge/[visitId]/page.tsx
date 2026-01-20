'use client'

import { useState } from 'react'
import { PrinterIcon, QrCodeIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'

export default function BadgeGeneration() {
  const params = useParams()
  const visitId = params.visitId as string

  // Mock badge data
  const [badgeData] = useState({
    visitId: visitId || '1',
    visitorName: 'Rajesh Kumar',
    visitorEmail: 'rajesh@company.com',
    visitorPhone: '+91 9876543210',
    company: 'ABC Corp',
    hostName: 'John Doe',
    purpose: 'Business meeting',
    checkInTime: '2024-01-15T10:05:00',
    badgeId: 'BG-2024-001-001',
    gatePassNumber: 'GP-2024-001-001',
    qrCode: 'QR123456',
    validUntil: '2024-01-15T12:00:00',
  })

  const handlePrintBadge = () => {
    window.print()
  }

  const handlePrintGatePass = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Badge & Gate Pass</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate and print visitor badge and gate pass
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePrintBadge}
            className="inline-flex items-center rounded-md bg-sonata-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sonata-500"
          >
            <PrinterIcon className="mr-2 h-5 w-5" />
            Print Badge
          </button>
          <button
            onClick={handlePrintGatePass}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <PrinterIcon className="mr-2 h-5 w-5" />
            Print Gate Pass
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Visitor Badge */}
        <div className="card print:shadow-none">
          <div className="card-body">
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 bg-white">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-sonata-600 text-white flex items-center justify-center text-3xl font-bold">
                    {badgeData.visitorName.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{badgeData.visitorName}</h3>
                  <p className="text-sm text-slate-600">{badgeData.company}</p>
                </div>
                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Host:</span>
                    <span className="font-medium text-slate-900">{badgeData.hostName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Purpose:</span>
                    <span className="font-medium text-slate-900">{badgeData.purpose}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Badge ID:</span>
                    <span className="font-mono font-medium text-sonata-600">{badgeData.badgeId}</span>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <QrCodeIcon className="h-20 w-20 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500">Valid until: {new Date(badgeData.validUntil).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gate Pass */}
        <div className="card print:shadow-none">
          <div className="card-body">
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 bg-white">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Gate Pass</p>
                    <p className="text-lg font-bold text-slate-900">Sonata Software</p>
                  </div>
                  <IdentificationIcon className="h-12 w-12 text-sonata-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500">Gate Pass Number</p>
                    <p className="text-lg font-mono font-bold text-sonata-600">{badgeData.gatePassNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Visitor Name</p>
                    <p className="text-base font-semibold text-slate-900">{badgeData.visitorName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Company</p>
                    <p className="text-sm text-slate-700">{badgeData.company}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Host</p>
                    <p className="text-sm text-slate-700">{badgeData.hostName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Purpose</p>
                    <p className="text-sm text-slate-700">{badgeData.purpose}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                    <div>
                      <p className="text-xs text-slate-500">Check-in Time</p>
                      <p className="text-sm font-medium text-slate-900">
                        {new Date(badgeData.checkInTime).toLocaleTimeString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Valid Until</p>
                      <p className="text-sm font-medium text-slate-900">
                        {new Date(badgeData.validUntil).toLocaleTimeString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-xs text-center text-slate-500">
                      Please return this pass at the security desk during check-out
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

