export type UserRole = 'employee' | 'manager' | 'hr' | 'facilities' | 'security' | 'admin'

export interface User {
  id: string
  hrmsId: string
  name: string
  email: string
  phone: string
  role: UserRole
  department: string
  designation: string
  location: string
  status: 'active' | 'inactive' | 'exited'
}

export interface Location {
  id: string
  name: string
  address: string
  timezone: string
}

export interface Building {
  id: string
  locationId: string
  name: string
}

export interface Floor {
  id: string
  buildingId: string
  name: string
}

export interface Zone {
  id: string
  floorId: string
  name: string
  type: 'permanent' | 'hot-desk' | 'team-zone'
}

export interface Seat {
  id: string
  zoneId: string
  code: string
  type: 'permanent' | 'hot-desk' | 'team-zone'
  status: 'available' | 'occupied' | 'maintenance' | 'reserved'
  attributes?: Record<string, any>
}

export interface SeatBooking {
  id: string
  seatId: string
  userId: string
  userName: string
  startDate: string
  endDate: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed'
  purpose: string
  approverId?: string
  approverName?: string
  createdAt: string
}

export interface MeetingRoom {
  id: string
  zoneId: string
  name: string
  capacity: number
  resources: string[]
}

export interface RoomBooking {
  id: string
  roomId: string
  roomName: string
  organizerId: string
  organizerName: string
  startTime: string
  endTime: string
  status: 'pending' | 'approved' | 'cancelled' | 'completed'
  attendees: string[]
}

export interface Visitor {
  id: string
  name: string
  email: string
  phone: string
  category: 'client' | 'vendor' | 'interview' | 'contractor' | 'delivery'
  company: string
  idType: 'aadhaar' | 'pan' | 'passport' | 'driving-license' | 'other'
  idNumber: string
  blacklistFlag: boolean
}

export interface Visit {
  id: string
  visitorId: string
  visitorName: string
  hostUserId: string
  hostName: string
  purpose: string
  startTime: string
  endTime: string
  status: 'pending' | 'approved' | 'rejected' | 'checked-in' | 'checked-out' | 'cancelled'
  otp?: string
  qrCode?: string
  badgeId?: string
  gatePass?: string
  securityNotes?: string
  checkInTime?: string
  checkOutTime?: string
}

export interface Approval {
  id: string
  subjectType: 'seat-booking' | 'visit' | 'room-booking'
  subjectId: string
  approverId: string
  approverName: string
  status: 'pending' | 'approved' | 'rejected'
  comments?: string
  createdAt: string
  updatedAt: string
}

export interface AuditLog {
  id: string
  actorId: string
  actorName: string
  action: string
  entityType: string
  entityId: string
  before?: Record<string, any>
  after?: Record<string, any>
  timestamp: string
  ipAddress: string
}

export interface OccupancyReport {
  date: string
  totalSeats: number
  occupiedSeats: number
  utilization: number
  byDepartment: Record<string, number>
  byLocation: Record<string, number>
}

export interface VisitorReport {
  date: string
  totalVisits: number
  byCategory: Record<string, number>
  checkedIn: number
  checkedOut: number
  noShows: number
}

