import AuthenticatedLayout from '@/components/Layout/AuthenticatedLayout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}

