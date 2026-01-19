import AuthenticatedLayout from '@/components/Layout/AuthenticatedLayout'

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}

