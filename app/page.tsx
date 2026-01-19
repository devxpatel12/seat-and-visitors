'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { ArrowRightIcon, ShieldCheckIcon, CheckCircleIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const router = useRouter()
  const { user, loginSSO } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleSSOLogin = async () => {
    await loginSSO()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-16 lg:flex-row lg:items-start lg:gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Trusted workplace platform for India DPDP compliance
          </div>
          <h1 className="text-4xl font-bold text-slate-900 leading-tight">
            Seat Booking & Visitor Management made simple
          </h1>
          <p className="text-lg text-slate-600">
            One place to book desks, manage visitors, and keep facilities aligned with HRMS, SSO, and security.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: CheckCircleIcon, text: 'Seat & meeting room booking' },
              { icon: ShieldCheckIcon, text: 'QR/OTP visitor validation' },
              { icon: GlobeAsiaAustraliaIcon, text: 'India data residency ready' },
              { icon: ArrowRightIcon, text: 'SSO with Azure AD / Google' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm border border-slate-200">
                <item.icon className="h-5 w-5 text-indigo-600" />
                <span className="text-sm text-slate-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-200 lg:mt-0">
          <div className="space-y-1 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-500">Sign in</p>
            <h2 className="text-2xl font-semibold text-slate-900">Access your workplace</h2>
          </div>

          <div className="mt-6 space-y-4">
            <button
              onClick={handleSSOLogin}
              className="group relative flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500"
            >
              <ShieldCheckIcon className="h-5 w-5 text-indigo-100" />
              Continue with SSO
              <ArrowRightIcon className="h-5 w-5" />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-500">or use work email</span>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Continue
              </button>
            </form>
          </div>

          <div className="mt-6 rounded-lg bg-indigo-50 border border-indigo-100 p-4 text-sm text-indigo-800">
            <p className="font-medium">Compliance ready</p>
            <p>DPDP Act 2023 • India data residency • Audit logs • Encryption</p>
          </div>
        </div>
      </div>
    </div>
  )
}

