# Seat Booking & Visitor Management System

A comprehensive web-based application for managing seat bookings and visitor management for IT facilities in India, aligned with Facilities Management and HRMS processes.

## Features

### 🪑 Seat/Workspace Booking
- Configure buildings, floors, zones, and individual seats
- Support for permanent, hot desk, and team zone seat types
- Booking rules based on role, department, or location
- Configurable approval workflows (manager and/or facilities)
- Temporary seat assignments for visitors/contractors
- Admin override and emergency reallocation
- Meeting room and shared asset booking

### 👥 Visitor Management
- Visitor pre-registration with host nomination
- Visitor categories (client, vendor, interview, contractor, delivery)
- Host approval and security desk validation
- QR code and OTP-based check-in/check-out
- Badge and gate pass generation
- Blacklist/watchlist management
- Visitor audit logs and history

### 🔗 HRMS Integration
- Sync employee master data from HRMS
- Department, designation, and location-based rules
- Auto-deactivation on employee exit
- Contractor and intern handling
- Optional attendance/presence indicators

### 🔐 Roles & Access Control
- Employee, Manager, HR, Facilities, Security, Admin roles
- Role-based dashboards and permissions
- Enterprise SSO integration (Azure AD, Google Workspace, etc.)

### 📊 Dashboards & Reporting
- Seat utilization and occupancy reports
- Department-wise and location-wise analytics
- Visitor volume and trends
- No-show and policy violation reports
- Export to Excel/CSV

### 🔒 Security & Compliance (India DPDP Act, 2023)
- Data residency within India (preferred)
- Encryption at rest and in transit
- Audit logs for all critical actions
- Configurable data retention policies

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Charts**: Recharts
- **Authentication**: SSO-ready (mock implementation)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Default Login

The application includes a mock authentication system. Click "Sign in with SSO" on the login page to access the dashboard.

## Project Structure

```
seat-booking/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Main dashboard
│   ├── seat-booking/      # Seat booking pages
│   ├── visitor-management/# Visitor management pages
│   ├── security/          # Security desk pages
│   ├── reports/           # Reports & analytics
│   ├── admin/             # Admin configuration pages
│   └── meeting-rooms/     # Meeting room booking
├── components/            # Reusable components
│   └── Layout/           # Layout components (Sidebar, Header)
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## End‑to‑End Functional Workflow (for KT)

This section explains how the system works step‑by‑step and how it maps to the RFP requirements. Use this as the main script when giving KT.

### 1. Authentication, Roles & Landing

- **User login**
  - User opens `/` and signs in via **SSO** (mocked) or work email.
  - After login, user is redirected to `/dashboard`.
- **Roles covered**
  - `employee`, `manager`, `hr`, `facilities`, `security`, `admin` (RFP 4.4).
  - Role information is stored on the mocked user object (HRMS‑synced in real implementation).
- **Dashboard (`/dashboard`)**
  - Shows key stats: available seats, visitors today, pending approvals, free rooms.
  - Quick actions for: **Book Seat**, **Book Meeting Room**, **Pre‑register Visitor**, **Security Check‑in**.
  - This satisfies **role‑based dashboards** (RFP 4.4, 4.5).

### 2. Seat / Workspace Booking (RFP 4.1)

- **Seat Booking (`/seat-booking`)**
  - **Step 1 – Basics**: User selects *Location*, *Date*, and *Duration*.
  - **Step 2 – Seat Type**: User chooses **Permanent**, **Hot Desk**, or **Team Zone**.
    - Models RFP’s *seat types* and *facilities‑aligned zones*.
  - **Step 3 – Available Seats**: Filtered grid of seats by type:
    - Shows floor, zone, and type (permanent/hot‑desk/team zone).
    - Selecting a seat and clicking *Book* simulates approval workflow.
  - **Booking Rules Panel** describes:
    - Role/department/location based rules.
    - Approval dependencies (manager, team lead, facilities).
- **My Bookings (`/my-bookings`)**
  - List of all bookings with status (**pending**, **approved**, **rejected**, **cancelled**).
  - Allows cancelling active/pending bookings.
- **Seat Configuration (`/admin/seats`) – Facilities View**
  - **Hierarchy management**: Locations → Buildings → Floors → Zones.
  - **Seat types and counts** per zone.
  - **Booking Rules configuration** cards:
    - Role‑based, department‑based, location‑based rules.
  - This page represents how *Facilities* would configure building/floor/zone/seat and rules (RFP 4.1 and 4.4).
- **Meeting Rooms (`/meeting-rooms`)**
  - Shows rooms with **capacity**, **floor**, **resources** and **time slots**.
  - User can book available slots, covering *meeting rooms and shared assets* requirement.

### 3. Approvals (RFP 4.1, 4.2, 4.4)

- **Approvals (`/approvals`)**
  - Unified list of **seat bookings**, **visitor visits**, and **room bookings** needing approval.
  - Manager/facilities/admin can **Approve** or **Reject** with comments (prompt).
  - Maps directly to **configurable manager/facilities approval workflows** in the RFP.

### 4. Visitor Management (RFP 4.2)

- **Visitor Management Overview (`/visitor-management`)**
  - Cards showing: *Total today*, *Checked in*, *Pending approval*, *Checked out*.
  - Tabs for *Today* vs *Upcoming* (conceptually; data is mocked).
  - Visitor cards show:
    - Visitor details (name, email, phone).
    - Category (client, vendor, interview, contractor, delivery).
    - Host, purpose, time window.
    - Status labels: *pending*, *approved*, *checked‑in*.
    - Link to QR where applicable.
  - This covers **visitor categories**, **volumes/trends base**, and **status tracking**.

- **Pre‑registration (`/visitor-management/pre-register`)**
  - Host fills:
    - Visitor personal info + category + company.
    - ID type and ID number (Aadhaar/PAN/passport/etc.).
    - Visit details: purpose, time window, *host email*.
  - On submit:
    - Simulates **host nomination**, **host approval flow** and sending **QR/OTP** to visitor.
  - Aligns with *pre‑registration & host nomination* requirement.

- **Security Desk (`/security/check-in`)**
  - **Check‑in method**: toggle between **QR** and **OTP** flow.
  - **QR**: button to simulate scan; loads visitor details.
  - **OTP**: validate 6‑digit OTP to fetch visitor.
  - **Blacklist / Watchlist**
    - Banner shows whether visitor is blacklisted (UI wiring in place).
  - **Visitor Information Panel**
    - Shows full details (host, purpose, time, company, ID number).
    - Buttons for **Check In** and **Check Out**.
  - Represents **security desk validation**, **QR/OTP check‑in/out**, **blacklist/watchlist**, **badge/gate pass generation** (simulated).

### 5. HRMS Integration (RFP 4.3 & Integrations)

- **HRMS Integration (`/admin/hrms`)**
  - **Sync Status**:
    - Last sync time, sync frequency, enable/disable integration.
  - **Sync Statistics**:
    - Employee counts, departments, locations, last sync delta.
  - **Configuration**:
    - HRMS API endpoint, API key (masked), frequency (realtime/hourly/daily/weekly).
    - Toggles for:
      - Auto‑deactivate on employee exit.
      - Sync departments, designations, locations.
  - **Department / Location Rules**
    - Cards to configure booking rules based on HRMS attributes.
  - This page fully models **HRMS master sync**, **contractor/intern handling**, **auto‑deactivation**, and **rules based on department/designation/location**.

### 6. Reports & Dashboards (RFP 4.5)

- **Reports & Analytics (`/reports`)**
  - Top‑level date range filter (Today, Last 7/30 days, Last 3 months, Custom).
  - **Tabs**:
    - *Seat Occupancy*:
      - Daily occupancy trend (Line chart: occupied vs available seats).
      - Department‑wise occupancy (Bar chart).
      - Location‑wise analytics (occupancy vs visitors).
    - *Utilization*:
      - Overall/peak/average utilization cards.
      - Department utilization (horizontal bar chart).
    - *Visitors*:
      - Visitor trend (Line chart: total vs checked‑in).
      - Visitor category split (Pie chart).
    - *No‑Shows & Violations*:
      - No‑shows and policy violations bar chart.
      - Table listing violations (e.g., no‑show, unauthorized booking).
  - **Export**
    - Buttons to export current view as **Excel** or **CSV** (front‑end simulated).
  - This satisfies **seat utilization & occupancy**, **dept/location analytics**, **visitor trends**, **no‑shows & policy violations**, **Excel/CSV export**.

### 7. System Settings, Security & Compliance (RFP 5.x)

- **Settings (`/admin/settings`)**
  - **Security & Compliance**
    - Data residency option (India region preferred).
    - Toggles for encryption at rest & in transit.
    - Toggle for audit logs for critical actions.
  - **Data Retention Policies**
    - Number of days to retain:
      - Booking records.
      - Visit records.
      - Audit logs.
      - Inactive user data.
  - **SSO Integration**
    - Enable/disable SSO.
    - SSO provider (Azure AD, Google Workspace, Okta, Other).
    - Client ID configuration.
  - **Email & SMS Gateways (India)**
    - Enable/disable, provider selection, API key for both Email and SMS.
  - Collectively this addresses **Security & Compliance**, **data retention**, **SSO**, **email/SMS gateways**, and parts of the **deployment/security model** in the RFP.

### 8. How RFP Requirements Are Covered (Quick Map)

- **4.1 Seat / Workspace Booking**
  - Building/floor/zone/seat config → `Seat Configuration` page.
  - Seat types & zones → seat types + zones in config and booking screens.
  - Booking rules & approvals → rules cards + `Approvals` page.
  - Temporary seats for visitors/contractors → modeled via seat types + visitors.
  - Admin override/emergency realloc → conceptually via Facilities/Approvals UI.
  - Meeting rooms & shared assets → `Meeting Rooms` page.

- **4.2 Visitor Management**
  - Pre‑registration & host nomination → pre‑register form.
  - Categories → visitor category chips.
  - Host approval & desk validation → approvals + Security Desk.
  - QR/OTP check‑in/out → Security Desk flow.
  - Badge/gate pass → represented as part of successful check‑in.
  - Blacklist/watchlist → blacklist banner.
  - Audit logs/history → modeled for backend; surfaced via reporting.

- **4.3 HRMS Integration**
  - Employee master sync, departments, locations, roles, deactivation, contractors → `HRMS Integration` UI.

- **4.4 Roles & Access Control**
  - Roles, dashboards, permissions, SSO → Auth context + sidebar visibility + dashboards + Settings.

- **4.5 Dashboards & Reporting**
  - All analytics and exports → `Reports` page.

- **5.1–5.3 Non‑functional (front‑end perspective)**
  - Security/compliance & retention → `Settings` and `HRMS` pages.
  - Scalability & usability → modern responsive Next.js UI; role‑specific flows.

- **6–9 Integrations, Deployment, Support**
  - Modeled as configuration UIs (HRMS, SSO, Email/SMS); real backend would complete these.

Use this section during KT to walk stakeholders from login → booking → visitors → approvals → reporting → admin configuration, explicitly calling out which RFP point each screen satisfies.

## Features Implementation Status

✅ Authentication & SSO (mock)
✅ Role-based access control
✅ Seat booking interface
✅ Visitor management
✅ Pre-registration form
✅ Security check-in/out
✅ Reports & analytics
✅ Admin configuration pages
✅ HRMS integration UI
✅ Settings & compliance

## Next Steps

1. **Backend Integration**: Connect to actual API endpoints
2. **Database**: Set up PostgreSQL database with proper schema
3. **Real SSO**: Implement actual SSO integration (Azure AD, Google Workspace)
4. **HRMS Sync**: Implement actual HRMS API integration
5. **Email/SMS**: Integrate with email and SMS gateways
6. **QR Code Generation**: Implement actual QR code generation
7. **Badge Printing**: Integrate with badge printing system
8. **Mobile App**: Develop optional mobile applications

## Compliance

This system is designed to comply with:
- **India DPDP Act, 2023**: Data protection and privacy requirements
- **Data Residency**: Prefers India region for data storage
- **Audit Logging**: Comprehensive audit trails for compliance

## License

This is a prototype implementation for demonstration purposes.

