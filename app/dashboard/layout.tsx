import AuthenticatedLayout from '@/components/Layout/AuthenticatedLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}
