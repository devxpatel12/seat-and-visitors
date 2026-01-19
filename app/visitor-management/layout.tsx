import AuthenticatedLayout from '@/components/Layout/AuthenticatedLayout'

export default function VisitorManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}

