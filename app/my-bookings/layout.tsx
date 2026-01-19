import AuthenticatedLayout from '@/components/Layout/AuthenticatedLayout'

export default function MyBookingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}

