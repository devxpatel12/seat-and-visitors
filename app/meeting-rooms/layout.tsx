import AuthenticatedLayout from '@/components/Layout/AuthenticatedLayout'

export default function MeetingRoomsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>
}

