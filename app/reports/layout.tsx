import AuthenticatedLayout from '@/components/Layout/AuthenticatedLayout'

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}

