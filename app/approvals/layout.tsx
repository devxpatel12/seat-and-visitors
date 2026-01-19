import AuthenticatedLayout from '@/components/Layout/AuthenticatedLayout'

export default function ApprovalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}

