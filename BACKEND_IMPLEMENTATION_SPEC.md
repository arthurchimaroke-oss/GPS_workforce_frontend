# PayFlow HR - Backend Implementation Specification

**Document Version:** 1.0  
**Last Updated:** April 4, 2026  
**For:** Backend Development Team  
**Frontend Stack:** React + TypeScript + Vite + TailwindCSS  
**Current Backend:** None (95% frontend-only with mock data)

---

## TABLE OF CONTENTS

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Recommendations](#2-technology-recommendations)
3. [Authentication & Authorization](#3-authentication--authorization)
4. [Database Schema](#4-database-schema)
5. [API Endpoints Specification](#5-api-endpoints-specification)
6. [File Storage & Uploads](#6-file-storage--uploads)
7. [Payment Integration (Flutterwave)](#7-payment-integration-flutterwave)
8. [Real-time Features](#8-real-time-features)
9. [Background Jobs & Cron](#9-background-jobs--cron)
10. [Security Requirements](#10-security-requirements)
11. [Validation & Business Logic](#11-validation--business-logic)
12. [Data Migration Strategy](#12-data-migration-strategy)
13. [API Response Format](#13-api-response-format)
14. [Error Handling](#14-error-handling)
15. [Testing Requirements](#15-testing-requirements)
16. [Deployment & DevOps](#16-deployment--devops)

---

## 1. ARCHITECTURE OVERVIEW

### Current State
- **95+ routes** all frontend-only
- **Hardcoded data** in every single page/component
- **localStorage** used for auth token and mock payroll database
- **No backend API** except 3 endpoints (`/company_login`, `/company_onboarding`, `/check_auth`)

### Required Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  - Vite + TypeScript + TailwindCSS                      │
│  - 95+ routes, all need API integration                  │
│  - Currently hardcoded data → needs API calls            │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST + WebSockets
┌────────────────────▼────────────────────────────────────┐
│                   Backend API                            │
│  - RESTful API (or GraphQL)                              │
│  - JWT Authentication                                    │
│  - Role-based Access Control (Owner/Employee)            │
│  - File upload handling                                  │
│  - Flutterwave webhook handlers                          │
│  - Real-time WebSocket server                            │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   Database                               │
│  - PostgreSQL (recommended)                              │
│  - 39+ tables needed                                     │
│  - Row-level security for multi-tenant isolation         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│               External Services                          │
│  - Flutterwave (Payments)                                │
│  - S3/Cloudinary (File Storage)                          │
│  - SendGrid/Resend (Email)                               │
│  - Firebase/OneSignal (Push Notifications)               │
└─────────────────────────────────────────────────────────┘
```

---

## 2. TECHNOLOGY RECOMMENDATIONS

### Option A: Node.js + Express (Recommended for JS ecosystem alignment)
```
- Runtime: Node.js 20+
- Framework: Express.js or Fastify
- ORM: Prisma (type-safe, excellent PostgreSQL support)
- Validation: Zod
- Auth: jsonwebtoken + bcrypt
- File Upload: Multer + S3
- Real-time: Socket.io
- Job Queue: Bull (Redis-based)
- Email: Resend or SendGrid SDK
- Testing: Jest + Supertest
```

### Option B: Python + FastAPI (Recommended for performance)
```
- Runtime: Python 3.11+
- Framework: FastAPI
- ORM: SQLAlchemy + Alembic
- Validation: Pydantic
- Auth: python-jose + passlib
- File Upload: python-multipart + boto3
- Real-time: FastAPI WebSockets
- Job Queue: Celery + Redis
- Email: Resend/SendGrid Python SDK
- Testing: pytest + httpx
```

### Option C: Rust + Actix (Recommended for the existing Rust backend)
```
NOTE: There's an existing Rust backend at:
c:\Users\User\Documents\gasless_payroll_system\gps_backend_system

If continuing with Rust:
- Framework: Actix-web or Axum
- ORM: SQLx or Diesel
- Validation: validator + serde
- Auth: jsonwebtoken + argon2
- File Upload: actix-multipart
- Real-time: actix-ws
- Job Queue: lapin (RabbitMQ) or redis-rs
```

---

## 3. AUTHENTICATION & AUTHORIZATION

### 3.1 Current State
- JWT stored in `localStorage` (INSECURE - vulnerable to XSS)
- Only 3 working endpoints: `/company_login`, `/company_onboarding`, `/check_auth`
- NO route guards
- NO role-based access control
- Password reset flow exists but has NO backend

### 3.2 Required Endpoints

#### Registration & Onboarding
```
POST   /api/auth/signup
  - Validates: first_name, last_name, email, password, company_name
  - Creates Company + Owner User
  - Sends email verification
  - Returns: { user, company, token }

POST   /api/auth/verify-email
  - Validates: email, otp_code
  - Marks user as verified

POST   /api/auth/forgot-password
  - Validates: email
  - Sends password reset email with token

POST   /api/auth/reset-password
  - Validates: token, new_password
  - Password requirements: min 8 chars, 1 uppercase, 1 number, 1 special

POST   /api/auth/login
  - Validates: email, password, company_code
  - Returns: { user, company, token }
  - Token: JWT with { sub, email, role, company_id, exp }
  - Set HTTP-only cookie instead of localStorage (SECURITY FIX)

GET    /api/auth/me
  - Requires: Auth token
  - Returns: { user, company, role }

POST   /api/auth/logout
  - Requires: Auth token
  - Invalidates token server-side
  - Clears HTTP-only cookie

POST   /api/auth/refresh-token
  - Requires: Refresh token (HTTP-only cookie)
  - Returns: New access token
```

#### Authorization Rules
```
ROLES:
- owner: Full access to company settings, payroll, employees, reports
- employee: Access to own data only (profile, claims, time off, attendance)

MIDDLEWARE:
- authenticate: Verify JWT token
- authorize(roles[]): Check user role
- multiTenant: Ensure user belongs to company_id in request
```

### 3.3 Security Fixes Required
```
1. Move JWT from localStorage → HTTP-only Secure Cookie
2. Add refresh token mechanism (7-day expiry for access, 30-day for refresh)
3. Add CSRF tokens for all state-changing requests
4. Implement rate limiting on auth endpoints (10 req/min)
5. Add password strength validation (regex + zxcvbn scoring)
6. Add account lockout after 5 failed attempts
7. Implement session management (revoke tokens on logout)
```

---

## 4. DATABASE SCHEMA

### 4.1 Core Tables

#### companies
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(255),
  industry VARCHAR(100),
  company_size VARCHAR(50),
  country VARCHAR(100),
  city VARCHAR(100),
  registration_number VARCHAR(100),
  logo_url TEXT,
  subscription_plan VARCHAR(50) DEFAULT 'essentials',
  subscription_status VARCHAR(50) DEFAULT 'trial',
  subscription_start DATE,
  subscription_end DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_companies_code ON companies(company_code);
```

#### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(50) NOT NULL DEFAULT 'employee', -- 'owner', 'admin', 'employee'
  email_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(company_id, email)
);

CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
```

#### employees
```sql
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  employee_code VARCHAR(50) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  job_title VARCHAR(100),
  department_id UUID REFERENCES departments(id),
  office_id UUID REFERENCES offices(id),
  line_manager_id UUID REFERENCES employees(id),
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'onboarding', 'probation', 'on_leave', 'terminated'
  account_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'active', 'suspended'
  
  -- Compensation
  base_salary DECIMAL(12, 2),
  currency VARCHAR(10) DEFAULT 'USD',
  payment_frequency VARCHAR(50) DEFAULT 'monthly',
  
  -- Bank Details (for Flutterwave transfers)
  bank_name VARCHAR(100),
  bank_account_number VARCHAR(50),
  bank_account_name VARCHAR(255),
  
  -- Dates
  join_date DATE NOT NULL,
  end_date DATE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(company_id, employee_code),
  UNIQUE(company_id, email)
);

CREATE INDEX idx_employees_company ON employees(company_id);
CREATE INDEX idx_employees_status ON employees(status);
```

### 4.2 Payroll Tables

#### payroll_runs
```sql
CREATE TABLE payroll_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  transaction_id VARCHAR(100) UNIQUE, -- Flutterwave transaction reference
  name VARCHAR(255) NOT NULL,
  cycle_month INT NOT NULL,
  cycle_year INT NOT NULL,
  total_gross DECIMAL(14, 2) NOT NULL,
  processing_fee DECIMAL(14, 2) DEFAULT 0,
  grand_total DECIMAL(14, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'funding', 'processing', 'completed', 'failed'
  payment_method VARCHAR(50) DEFAULT 'flutterwave',
  flutterwave_tx_ref VARCHAR(100),
  
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  
  UNIQUE(company_id, cycle_month, cycle_year)
);

CREATE INDEX idx_payroll_runs_company ON payroll_runs(company_id);
CREATE INDEX idx_payroll_runs_status ON payroll_runs(status);
```

#### payroll_disbursements
```sql
CREATE TABLE payroll_disbursements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payroll_run_id UUID REFERENCES payroll_runs(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  employee_email VARCHAR(255) NOT NULL,
  
  amount DECIMAL(12, 2) NOT NULL,
  bonus DECIMAL(12, 2) DEFAULT 0,
  deduction DECIMAL(12, 2) DEFAULT 0,
  net_amount DECIMAL(12, 2) GENERATED ALWAYS AS (amount + bonus - deduction) STORED,
  
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'disbursed', 'claimed', 'failed'
  
  -- Flutterwave transfer details
  flutterwave_transfer_id VARCHAR(100),
  flutterwave_transfer_status VARCHAR(50),
  
  claimed_at TIMESTAMP,
  transaction_id VARCHAR(100),
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(payroll_run_id, employee_id)
);

CREATE INDEX idx_disbursements_payroll ON payroll_disbursements(payroll_run_id);
CREATE INDEX idx_disbursements_employee ON payroll_disbursements(employee_id);
CREATE INDEX idx_disbursements_status ON payroll_disbursements(status);
```

### 4.3 Additional Tables (Complete List)

```sql
-- Organization Structure
departments (id, company_id, name, parent_id, manager_id, created_at)
offices (id, company_id, name, address, city, country, is_headquarters, created_at)
job_titles (id, company_id, title, department_id, salary_range_min, salary_range_max, created_at)

-- Time Off
leave_types (id, company_id, name, days_per_year, carry_over_max, requires_approval, created_at)
leave_requests (id, employee_id, leave_type_id, start_date, end_date, days_count, status, reason, approved_by, approved_at, created_at)
leave_balances (id, employee_id, leave_type_id, year, total_days, used_days, remaining_days, UNIQUE(employee_id, leave_type_id, year))
holidays (id, company_id, name, date, recurring, created_at)

-- Attendance
attendance_records (id, employee_id, date, clock_in TIME, clock_out TIME, hours_worked DECIMAL(5,2), status VARCHAR(50), notes TEXT, created_at)

-- Performance
review_cycles (id, company_id, name, period VARCHAR(50), status, start_date, end_date, created_at)
reviews (id, cycle_id, reviewer_id, reviewee_id, status, scores JSONB, feedback TEXT, completed_at, created_at)
goals (id, employee_id, title, description, progress INT, target TEXT, deadline DATE, status, created_at)
skills (id, employee_id, name VARCHAR(100), score INT, created_at)

-- Recruitment
job_postings (id, company_id, title, description TEXT, department_id, location, employment_type, salary_range JSONB, status, created_at)
candidates (id, job_id, name, email, phone, cv_url, current_stage, status, notes TEXT, created_at)
email_templates (id, company_id, name, stage, subject, body TEXT, created_at)

-- Documents
document_folders (id, company_id, name, description TEXT, share_scope, created_by, created_at)
document_files (id, folder_id, name, file_path, file_size BIGINT, mime_type, uploaded_by, uploaded_at)

-- Checklists
checklist_templates (id, company_id, name, type VARCHAR(50), department, tasks JSONB, created_at)
checklist_items (id, template_id, employee_id, task_name, due_date, completed BOOLEAN, completed_at, created_at)

-- News
news_articles (id, company_id, title, content TEXT, category, author_id, published_at, status, created_at)

-- Notifications
notifications (id, user_id, title, message TEXT, type VARCHAR(50), read BOOLEAN, created_at)
notification_preferences (id, user_id, channel VARCHAR(50), enabled BOOLEAN, notification_type VARCHAR(50), UNIQUE(user_id, notification_type))

-- Messages
conversations (id, participant_ids UUID[], last_message_at, created_at)
messages (id, conversation_id, sender_id, content TEXT, read BOOLEAN, created_at)

-- Training
courses (id, company_id, title, description TEXT, category, duration_hours, status, created_at)
course_modules (id, course_id, title, description TEXT, order_index, video_url, duration_minutes, created_at)
enrollments (id, course_id, employee_id, progress INT, status, deadline DATE, completed_at, created_at)

-- Assets
assets (id, company_id, name, type, serial_number, assigned_to UUID REFERENCES employees(id), department, condition, status, purchase_date, value DECIMAL(12,2), created_at)

-- Expenses
expense_claims (id, employee_id, category, amount DECIMAL(12,2), date DATE, description TEXT, receipt_path, status, approved_by, submitted_at, created_at)

-- Subscription & Payments
payment_transactions (id, company_id, amount DECIMAL(12,2), currency, status, provider VARCHAR(50), provider_ref VARCHAR(100), metadata JSONB, created_at)
integrations (id, company_id, provider VARCHAR(50), enabled BOOLEAN, config JSONB, created_at)

-- Settings
work_schedules (id, company_id, name, work_days JSONB, hours_per_day DECIMAL(4,2), timezone VARCHAR(50), created_at)
roles (id, company_id, name, permissions JSONB, created_at)
role_members (id, role_id, user_id, UNIQUE(role_id, user_id))
```

---

## 5. API ENDPOINTS SPECIFICATION

### 5.1 Employee Management

```
GET    /api/employees
  Query: page, limit, search, department_id, status, sort_by, sort_order
  Response: { employees: Employee[], total, page, limit }
  Auth: owner, admin

POST   /api/employees
  Body: { first_name, last_name, email, phone, job_title, department_id, join_date, base_salary, bank_details }
  Response: { employee: Employee }
  Auth: owner, admin
  Side Effect: Send invitation email to employee

GET    /api/employees/:id
  Response: { employee: Employee }
  Auth: owner, admin (any employee in company), employee (own profile only)

PUT    /api/employees/:id
  Body: { first_name?, last_name?, phone?, job_title?, department_id?, base_salary?, bank_details? }
  Response: { employee: Employee }
  Auth: owner, admin

DELETE /api/employees/:id
  Response: { success: true }
  Auth: owner, admin
  Side Effect: Trigger offboarding checklist

POST   /api/employees/:id/invite
  Response: { success: true, message: "Invitation sent" }
  Auth: owner, admin
  Side Effect: Send email with signup link

GET    /api/employees/export
  Query: format (csv|xlsx), filters...
  Response: File download
  Auth: owner, admin
```

### 5.2 Payroll Management

```
GET    /api/payroll/runs
  Query: page, limit, status, month, year
  Response: { runs: PayrollRun[], total, page, limit }
  Auth: owner, admin

POST   /api/payroll/runs
  Body: { 
    name, 
    cycle_month, 
    cycle_year, 
    employees: [{ employee_id, amount, bonus?, deduction? }] 
  }
  Response: { payroll_run: PayrollRun }
  Auth: owner, admin

GET    /api/payroll/runs/:id
  Response: { payroll_run: PayrollRunWithDisbursements }
  Auth: owner, admin

POST   /api/payroll/runs/:id/process-payment
  Body: { payment_method: 'flutterwave', flutterwave_config? }
  Response: { payment_url: string } OR { transaction_id: string }
  Auth: owner, admin
  Side Effect: 
    1. Create Flutterwave payment
    2. Update payroll_run status to 'processing'
    3. Create disbursement records
  Note: Frontend will redirect to Flutterwave URL or open modal

POST   /api/payroll/runs/:id/download-receipt
  Response: File download (PDF)
  Auth: owner, admin
```

### 5.3 Flutterwave Webhook Handlers (CRITICAL)

```
POST   /api/webhooks/flutterwave
  Headers: x-paystack-signature (or Flutterwave equivalent)
  Body: Flutterwave event payload
  Response: { received: true }
  Auth: Public (signature validation only)
  
  Events to handle:
  - charge.completed → Update payroll_disbursements status to 'disbursed'
  - charge.failed → Update payroll_disbursements status to 'failed', notify employer
  - transfer.completed → Update disbursement status to 'claimed'
  - transfer.failed → Update disbursement status to 'failed', notify employee

  Implementation:
  1. Verify webhook signature
  2. Find disbursement by flutterwave_transfer_id
  3. Update status
  4. Send notification to affected user
  5. Return 200 immediately (process async)
```

### 5.4 Employee Salary Claims

```
GET    /api/employee/claims
  Query: status (pending|claimed|all)
  Response: { claims: Disbursement[], total_pending }
  Auth: employee (own claims only)

POST   /api/employee/claims/:disbursement_id/claim
  Body: { payment_method: 'flutterwave_bank_transfer' }
  Response: { claim: Disbursement, flutterwave_redirect_url? }
  Auth: employee
  Side Effect: 
    1. Initiate Flutterwave transfer
    2. Update disbursement status to 'processing'
    3. Create notification for employee
```

### 5.5 Time Off Management

```
GET    /api/time-off/types
  Response: { leave_types: LeaveType[] }
  Auth: employee, owner, admin

GET    /api/time-off/requests
  Query: employee_id (owner/admin only), status, leave_type_id, month, year
  Response: { requests: LeaveRequest[], total }
  Auth: employee (own), owner/admin (all in company)

POST   /api/time-off/requests
  Body: { leave_type_id, start_date, end_date, reason }
  Response: { request: LeaveRequest }
  Auth: employee
  Validation: 
    - Check leave balance
    - Ensure dates don't conflict with existing requests
    - Calculate days_count excluding weekends/holidays

PUT    /api/time-off/requests/:id
  Body: { start_date?, end_date?, reason? }
  Response: { request: LeaveRequest }
  Auth: employee (own, status=pending only)

PUT    /api/time-off/requests/:id/approve
  Body: { action: 'approve' | 'reject', comment? }
  Response: { request: LeaveRequest }
  Auth: owner, admin
  Side Effect:
    - Update leave_balance.used_days
    - Send notification to employee

GET    /api/time-off/balance
  Response: { balances: LeaveBalance[] }
  Auth: employee (own), owner/admin (any employee)

GET    /api/time-off/team-calendar
  Query: month, year, department_id
  Response: { events: LeaveRequest[] }
  Auth: owner, admin
```

### 5.6 Attendance Tracking

```
POST   /api/attendance/clock-in
  Body: { latitude?, longitude? } (optional GPS validation)
  Response: { record: AttendanceRecord }
  Auth: employee
  Validation: Prevent duplicate clock-in

POST   /api/attendance/clock-out
  Body: { latitude?, longitude? }
  Response: { record: AttendanceRecord, hours_worked }
  Auth: employee
  Validation: Must have active clock-in

GET    /api/attendance/my
  Query: month, year
  Response: { records: AttendanceRecord[], stats: { total_hours, late_count, on_time_count } }
  Auth: employee

GET    /api/attendance/team
  Query: date, department_id
  Response: { records: AttendanceRecord[] }
  Auth: owner, admin

POST   /api/attendance/:id/correct
  Body: { clock_in?, clock_out?, reason }
  Response: { record: AttendanceRecord }
  Auth: owner, admin
```

### 5.7 File Uploads

```
POST   /api/upload
  Body: FormData { file, folder_id? }
  Response: { file_url, file_id }
  Auth: owner, admin, employee (own documents)
  Validation:
    - Max size: 10MB
    - Allowed types: pdf, png, jpg, jpeg, doc, docx, xls, xlsx
    - Scan for malware (ClamAV or similar)
  Storage: Upload to S3/Cloudinary, store metadata in DB

DELETE /api/upload/:id
  Response: { success: true }
  Auth: owner, admin, employee (own files only)
  Side Effect: Delete from S3 + database
```

### 5.8 Notifications

```
GET    /api/notifications
  Query: page, limit, unread_only
  Response: { notifications: Notification[], unread_count }
  Auth: employee, owner, admin (own notifications)

PUT    /api/notifications/:id/read
  Response: { success: true }
  Auth: notification recipient

PUT    /api/notifications/read-all
  Response: { success: true, count }
  Auth: employee, owner, admin

GET    /api/notifications/preferences
  Response: { preferences: NotificationPreference[] }
  Auth: employee, owner, admin

PUT    /api/notifications/preferences
  Body: [{ notification_type, channel, enabled }]
  Response: { preferences: NotificationPreference[] }
  Auth: employee, owner, admin
```

### 5.9 Reports

```
GET    /api/reports/headcount
  Query: month, year, department_id
  Response: { 
    total_headcount, 
    by_department, 
    by_location, 
    by_employment_type,
    trend: [{ month, count }]
  }
  Auth: owner, admin

GET    /api/reports/turnover
  Query: month, year
  Response: { 
    turnover_rate, 
    exit_reasons, 
    by_department,
    monthly_trend
  }
  Auth: owner, admin

GET    /api/reports/payroll
  Query: month, year, payroll_run_id
  Response: { 
    total_paid, 
    by_department, 
    by_employee,
    fees,
    trend
  }
  Auth: owner, admin

GET    /api/reports/attendance
  Query: month, year, employee_id
  Response: { 
    attendance_rate, 
    late_count, 
    hours_worked,
    daily_breakdown
  }
  Auth: owner, admin

GET    /api/reports/performance
  Query: cycle_id, department_id
  Response: { 
    average_scores, 
    by_department, 
    completed_reviews,
    top_performers
  }
  Auth: owner, admin
```

### 5.10 Settings

```
GET    /api/settings/company
  Response: { company: Company }
  Auth: owner, admin

PUT    /api/settings/company
  Body: { name?, email?, phone?, website?, industry?, logo? }
  Response: { company: Company }
  Auth: owner

GET    /api/settings/departments
  Response: { departments: Department[] }
  Auth: owner, admin, employee

POST   /api/settings/departments
  Body: { name, parent_id?, manager_id? }
  Response: { department: Department }
  Auth: owner, admin

GET    /api/settings/offices
  Response: { offices: Office[] }
  Auth: owner, admin, employee

POST   /api/settings/offices
  Body: { name, address, city, country, is_headquarters }
  Response: { office: Office }
  Auth: owner, admin

GET    /api/settings/subscription
  Response: { subscription: Subscription, available_plans: Plan[] }
  Auth: owner, admin

POST   /api/settings/subscription/upgrade
  Body: { plan_name, billing_cycle }
  Response: { payment_url: string }
  Auth: owner
  Side Effect: Create Flutterwave payment for subscription
```

---

## 6. FILE STORAGE & UPLOADS

### 6.1 Storage Strategy
```
Provider: AWS S3 or Cloudinary
Structure:
  s3://payflow-hr-prod/
    ├── {company_id}/
    │   ├── employees/
    │   │   └── {employee_id}/
    │   │       ├── documents/
    │   │       └── receipts/
    │   ├── payroll/
    │   │   └── {payroll_run_id}/
    │   │       └── receipts/
    │   └── general/
    │       └── logos/
    └── public/
        └── company-logos/
```

### 6.2 Upload Flow
```
1. Frontend sends POST /api/upload with FormData
2. Backend validates file (size, type, malware scan)
3. Upload to S3 with unique filename (UUID)
4. Store metadata in database (document_files table)
5. Return file_url to frontend
6. Frontend displays using signed URL (if private) or public URL
```

### 6.3 Security
```
- All uploads scanned for malware
- File size limits enforced (10MB default, configurable)
- Signed URLs for private files (expire after 1 hour)
- CORS configured to only allow your frontend domain
- S3 bucket: Block public access, use CloudFront for CDN
```

---

## 7. PAYMENT INTEGRATION (FLUTTERWAVE)

### 7.1 Current Issues
```
⚠️ CRITICAL: Flutterwave test keys are exposed in frontend .env file
- VITE_FLUTTERWAVE_CLIENT_SECRET is visible to anyone
- VITE_FLUTTERWAVE_ENCRYPTION_KEY is visible to anyone

FIX: Move all secret keys to backend immediately!
```

### 7.2 Backend Payment Flow

#### Employer Pays Payroll
```
1. Employer clicks "Pay via Flutterwave" on frontend
2. Frontend calls: POST /api/payroll/runs/:id/process-payment
3. Backend:
   a. Creates Flutterwave payment with:
      - amount: grand_total
      - tx_ref: payroll_run_id
      - customer: employer email
      - callback_url: https://yourapp.com/payroll/callback
   b. Returns payment_url or payment_config to frontend
4. Frontend opens Flutterwave modal with config
5. Employer completes payment
6. Flutterwave redirects to callback_url with status
7. Frontend polls GET /api/payroll/runs/:id for status
8. OR Flutterwave webhook updates status server-side
```

#### Employee Claims Salary
```
1. Employee clicks "Claim" on pending disbursement
2. Frontend calls: POST /api/employee/claims/:id/claim
3. Backend:
   a. Validates employee owns this disbursement
   b. Creates Flutterwave transfer to employee's bank
   c. Returns transfer status to frontend
4. Flutterwave processes transfer
5. Webhook updates disbursement status to 'claimed'
6. Employee receives notification
```

### 7.3 Webhook Handler Implementation

```typescript
// Example: Node.js/Express
import { Request, Response } from 'express';
import { verifyFlutterwaveWebhook } from '@/lib/flutterwave';

export async function handleFlutterwaveWebhook(req: Request, res: Response) {
  try {
    // 1. Verify signature
    const signature = req.headers['verif-hash'] as string;
    if (!verifyFlutterwaveWebhook(req.body, signature)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // 2. Process event
    const { event, data } = req.body;
    
    switch (event) {
      case 'charge.completed':
        await handlePaymentCompleted(data);
        break;
      case 'charge.failed':
        await handlePaymentFailed(data);
        break;
      case 'transfer.completed':
        await handleTransferCompleted(data);
        break;
      case 'transfer.failed':
        await handleTransferFailed(data);
        break;
    }
    
    // 3. Return 200 immediately (process async)
    res.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handleTransferCompleted(data: any) {
  const { id, status, complete_message } = data;
  
  // Find disbursement
  const disbursement = await prisma.payrollDisbursement.findFirst({
    where: { flutterwave_transfer_id: id }
  });
  
  if (!disbursement) return;
  
  // Update status
  await prisma.payrollDisbursement.update({
    where: { id: disbursement.id },
    data: {
      status: 'claimed',
      claimed_at: new Date(),
      flutterwave_transfer_status: status
    }
  });
  
  // Send notification to employee
  await prisma.notification.create({
    data: {
      user_id: disbursement.employee_id,
      title: 'Salary Claimed Successfully',
      message: `Your salary of $${disbursement.net_amount} has been transferred to your bank account.`,
      type: 'payment_success'
    }
  });
}
```

### 7.4 Environment Variables (Backend)
```env
# Flutterwave (KEEP SECRET - NEVER EXPOSE TO FRONTEND)
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-c4f07775ff810b93a91c60545032e952-X
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-xxxxxxxxxxxxxxxxx-X
FLUTTERWAVE_ENCRYPTION_KEY=3L81dppzFLoVnUx5wgHviYLgSWPDUtsz7sq2mVWXVN4=
FLUTTERWAVE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Frontend only needs:
# VITE_FLUTTERWAVE_PUBLIC_KEY (can be exposed safely)
```

---

## 8. REAL-TIME FEATURES

### 8.1 WebSocket Implementation

```typescript
// Socket.io setup example
import { Server } from 'socket.io';

const io = new Server(httpServer, {
  cors: { origin: process.FRONTEND_URL, credentials: true }
});

io.use((socket, next) => {
  // Authenticate with JWT
  const token = socket.handshake.auth.token;
  const user = verifyJWT(token);
  if (!user) return next(new Error('Authentication error'));
  
  socket.data.user = user;
  next();
});

io.on('connection', (socket) => {
  // Join company room
  socket.join(`company:${socket.data.user.company_id}`);
  
  // Join user room
  socket.join(`user:${socket.data.user.id}`);
  
  // Handle events
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
```

### 8.2 Real-time Events

```typescript
// Emit when payroll is processed
io.to(`company:${companyId}`).emit('payroll:status_update', {
  payroll_run_id: runId,
  status: 'processing',
  disbursements_completed: count,
  total_disbursements: total
});

// Emit when employee claims salary
io.to(`user:${employeeId}`).emit('claim:status_update', {
  disbursement_id: disbId,
  status: 'claimed',
  transaction_id: txId
});

// Emit for notifications
io.to(`user:${userId}`).emit('notification:new', {
  id: notifId,
  title: 'New Notification',
  message: '...',
  type: 'info'
});

// Emit for live attendance tracking
io.to(`company:${companyId}`).emit('attendance:clock_in', {
  employee_id: empId,
  employee_name: 'John Doe',
  clock_in_time: '09:00:00',
  status: 'on_time'
});
```

### 8.3 Frontend Integration Needed

```typescript
// Frontend needs to connect to WebSocket
import { io } from 'socket.io-client';

const socket = io(process.env.VITE_API_URL, {
  auth: { token: authToken }
});

// Listen for events
socket.on('notification:new', (notification) => {
  // Update notification badge
  showNotification(notification);
});

socket.on('payroll:status_update', (data) => {
  // Update payroll progress UI
  updatePayrollProgress(data);
});

socket.on('claim:status_update', (data) => {
  // Update claim status
  updateClaimStatus(data);
});
```

---

## 9. BACKGROUND JOBS & CRON

### 9.1 Job Queue Setup (Redis + Bull)

```typescript
import Queue from 'bull';

const emailQueue = new Queue('email', process.env.REDIS_URL);
const payrollQueue = new Queue('payroll', process.env.REDIS_URL);
const notificationQueue = new Queue('notification', process.env.REDIS_URL);
```

### 9.2 Scheduled Jobs

```typescript
// 1. Monthly Payroll Reminder (1st of every month at 9 AM)
cron.schedule('0 9 1 * *', async () => {
  const companies = await prisma.companies.findMany({
    where: { subscription_status: 'active' }
  });
  
  for (const company of companies) {
    await emailQueue.add('payroll_reminder', {
      to: company.email,
      company_name: company.name,
      month: new Date().getMonth() + 1
    });
  }
});

// 2. Leave Balance Reset (January 1st)
cron.schedule('0 0 1 1 *', async () => {
  await prisma.leaveBalance.updateMany({
    where: { year: new Date().getFullYear() - 1 },
    data: { year: new Date().getFullYear(), used_days: 0 }
  });
});

// 3. Subscription Renewal Reminder (7 days before expiry)
cron.schedule('0 9 * * *', async () => {
  const expiringSubs = await prisma.subscription.findMany({
    where: {
      subscription_end: {
        lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        gte: new Date()
      }
    }
  });
  
  for (const sub of expiringSubs) {
    await emailQueue.add('subscription_renewal_reminder', {
      to: sub.company.email,
      company_name: sub.company.name,
      expiry_date: sub.subscription_end
    });
  }
});

// 4. Failed Payroll Retry (every hour)
cron.schedule('0 * * * *', async () => {
  const failedDisbursements = await prisma.payrollDisbursement.findMany({
    where: { status: 'failed', created_at: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
  });
  
  for (const disb of failedDisbursements) {
    await payrollQueue.add('retry_disbursement', {
      disbursement_id: disb.id
    });
  }
});

// 5. Daily Attendance Summary (6 PM every day)
cron.schedule('0 18 * * 1-5', async () => {
  const companies = await prisma.companies.findMany();
  
  for (const company of companies) {
    const attendanceStats = await getTodayAttendanceStats(company.id);
    
    await emailQueue.add('daily_attendance_summary', {
      to: company.email,
      company_name: company.name,
      stats: attendanceStats
    });
  }
});
```

### 9.3 Email Templates Needed

```
1. Welcome/Account Created
2. Email Verification
3. Password Reset
4. Payroll Processed (Employer)
5. Salary Claimed (Employee)
6. Time Off Approved/Rejected
7. Performance Review Due
8. Subscription Renewal Reminder
9. Daily Attendance Summary
10. New Employee Invitation
```

---

## 10. SECURITY REQUIREMENTS

### 10.1 Critical Security Fixes

```
1. ✅ Move all secret keys to backend (Flutterwave, DB credentials)
2. ✅ Use HTTP-only Secure Cookies for JWT (NOT localStorage)
3. ✅ Implement CSRF protection (csurf middleware)
4. ✅ Add rate limiting (express-rate-limit)
   - Auth endpoints: 10 req/min
   - API endpoints: 100 req/min
   - File uploads: 20 req/hour
5. ✅ Implement CORS properly
   - Only allow your frontend domain
   - No wildcard (*) in production
6. ✅ Add input validation on ALL endpoints (Zod/Pydantic)
7. ✅ Use parameterized queries (Prisma/SQLx prevents SQL injection)
8. ✅ Implement file upload security:
   - Scan for malware
   - Enforce file type whitelist
   - Enforce file size limits
   - Store outside webroot
9. ✅ Add HTTPS everywhere (redirect HTTP → HTTPS)
10. ✅ Implement Content Security Policy (CSP) headers
11. ✅ Add X-Frame-Options: DENY
12. ✅ Add X-Content-Type-Options: nosniff
```

### 10.2 Multi-Tenant Isolation

```sql
-- EVERY query MUST include company_id filter
-- Example:
SELECT * FROM employees 
WHERE company_id = current_user_company_id();

-- Use Row Level Security (PostgreSQL)
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON employees
  USING (company_id = current_setting('app.current_company_id')::uuid);
```

### 10.3 Data Encryption

```
- Passwords: bcrypt (cost factor 12) or argon2
- Bank account numbers: AES-256 encryption at rest
- Sensitive PII: Encrypt in database
- API keys: Encrypt in database
- TLS 1.3 for all connections
```

---

## 11. VALIDATION & BUSINESS LOGIC

### 11.1 Validation Rules

```typescript
// Employee Creation
const createEmployeeSchema = z.object({
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  job_title: z.string().max(100),
  department_id: z.string().uuid().optional(),
  join_date: z.date(),
  base_salary: z.number().positive().optional(),
  bank_details: z.object({
    bank_name: z.string().min(2),
    account_number: z.string().min(10),
    account_name: z.string().min(2)
  }).optional()
});

// Payroll Run Creation
const createPayrollRunSchema = z.object({
  name: z.string().min(3).max(255),
  cycle_month: z.number().min(1).max(12),
  cycle_year: z.number().min(2024).max(2030),
  employees: z.array(z.object({
    employee_id: z.string().uuid(),
    amount: z.number().positive(),
    bonus: z.number().min(0).default(0),
    deduction: z.number().min(0).default(0)
  })).min(1)
}).refine(data => {
  // Ensure no duplicate employees
  const employeeIds = data.employees.map(e => e.employee_id);
  return new Set(employeeIds).size === employeeIds.length;
}, { message: 'Duplicate employees not allowed' });

// Leave Request
const createLeaveRequestSchema = z.object({
  leave_type_id: z.string().uuid(),
  start_date: z.date(),
  end_date: z.date(),
  reason: z.string().min(10).max(500)
}).refine(data => {
  return data.end_date >= data.start_date;
}, { message: 'End date must be after start date' });
```

### 11.2 Business Logic (Backend)

```typescript
// Calculate leave days (excluding weekends and holidays)
function calculateLeaveDays(startDate: Date, endDate: Date, company_id: string): number {
  let days = 0;
  let current = new Date(startDate);
  
  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = await isCompanyHoliday(current, company_id);
    
    if (!isWeekend && !isHoliday) {
      days++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return days;
}

// Calculate payroll totals
function calculatePayrollTotals(employees: PayrollEmployee[]) {
  const totalGross = employees.reduce((sum, emp) => 
    sum + emp.amount + emp.bonus - emp.deduction, 0
  );
  
  const processingFee = totalGross * 0.015; // 1.5%
  const grandTotal = totalGross + processingFee;
  
  return { totalGross, processingFee, grandTotal };
}

// Validate employee has sufficient leave balance
async function validateLeaveBalance(employee_id: string, leave_type_id: string, days: number) {
  const balance = await prisma.leaveBalance.findUnique({
    where: { employee_id_leave_type_id_year: { employee_id, leave_type_id, year: 2026 } }
  });
  
  if (!balance || balance.remaining_days < days) {
    throw new Error('Insufficient leave balance');
  }
}
```

---

## 12. DATA MIGRATION STRATEGY

### 12.1 Current State
- All data is hardcoded in frontend components
- localStorage used for auth token and mock payroll database

### 12.2 Migration Steps

```
PHASE 1: Database Setup
1. Create all tables (schema provided above)
2. Set up database on cloud provider (Supabase, Railway, or AWS RDS)
3. Run migrations
4. Seed essential data (leave types, job titles, etc.)

PHASE 2: Auth & User Management
1. Implement registration/login endpoints
2. Migrate existing users (if any) from localStorage
3. Test role-based access control
4. Add password reset flow

PHASE 3: Employee Management
1. Implement Employee CRUD endpoints
2. Replace hardcoded employee data with API calls
3. Test file uploads (employee documents)

PHASE 4: Payroll
1. Implement payroll run creation
2. Implement Flutterwave integration
3. Implement webhook handlers
4. Test complete payment flow

PHASE 5: All Other Features
1. Time Off
2. Attendance
3. Performance
4. Recruitment
5. Documents
6. Reports
7. Settings

PHASE 6: Real-time Features
1. Set up WebSocket server
2. Implement real-time notifications
3. Implement live dashboard updates
```

---

## 13. API RESPONSE FORMAT

### 13.1 Success Response

```json
{
  "success": true,
  "data": {
    "employee": { ... }
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### 13.2 Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### 13.3 Pagination

```json
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## 14. ERROR HANDLING

### 14.1 Error Types

```typescript
// Custom Error Classes
class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
  }
}

class ValidationError extends AppError {
  constructor(details: any) {
    super(400, 'VALIDATION_ERROR', 'Validation failed', details);
  }
}

class AuthenticationError extends AppError {
  constructor() {
    super(401, 'AUTHENTICATION_ERROR', 'Invalid or expired token');
  }
}

class AuthorizationError extends AppError {
  constructor() {
    super(403, 'AUTHORIZATION_ERROR', 'Insufficient permissions');
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, 'NOT_FOUND', `${resource} not found`);
  }
}
```

### 14.2 Global Error Handler

```typescript
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);
  
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    });
  }
  
  // Unhandled errors
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  });
});
```

---

## 15. TESTING REQUIREMENTS

### 15.1 Test Coverage Requirements

```
- Unit Tests: 80%+ coverage on all business logic
- Integration Tests: All API endpoints
- E2E Tests: Critical user journeys
- Load Tests: Payment processing, file uploads
```

### 15.2 Test Examples

```typescript
// Unit Test Example
describe('Payroll Service', () => {
  it('should calculate payroll totals correctly', () => {
    const employees = [
      { amount: 5000, bonus: 500, deduction: 200 },
      { amount: 3000, bonus: 0, deduction: 100 }
    ];
    
    const totals = calculatePayrollTotals(employees);
    
    expect(totals.totalGross).toBe(8200);
    expect(totals.processingFee).toBe(123); // 8200 * 0.015
    expect(totals.grandTotal).toBe(8323);
  });
});

// Integration Test Example
describe('POST /api/employees', () => {
  it('should create employee and send invitation email', async () => {
    const response = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        join_date: '2026-04-01',
        base_salary: 5000
      });
    
    expect(response.status).toBe(201);
    expect(response.body.employee.email).toBe('john@example.com');
    expect(mockEmailQueue.add).toHaveBeenCalledWith('employee_invitation', expect.any(Object));
  });
});

// E2E Test Example
describe('Complete Payroll Flow', () => {
  it('should create payroll, process payment, and disburse salaries', async () => {
    // 1. Create payroll run
    const payrollRun = await createPayrollRun(...);
    
    // 2. Process payment
    const paymentResult = await processPayment(payrollRun.id);
    
    // 3. Simulate Flutterwave webhook
    await simulateFlutterwaveWebhook(paymentResult.tx_ref);
    
    // 4. Verify disbursements created
    const disbursements = await getDisbursements(payrollRun.id);
    expect(disbursements.length).toBe(5);
    
    // 5. Verify notifications sent
    const notifications = await getNotifications();
    expect(notifications.length).toBe(6); // 5 employees + 1 employer
  });
});
```

---

## 16. DEPLOYMENT & DEVOPS

### 16.1 Recommended Stack

```
Backend API:
  - Railway.app or Render.com (easiest)
  - AWS ECS or DigitalOcean App Platform (scalable)

Database:
  - Supabase (PostgreSQL + Auth + Real-time)
  - Railway PostgreSQL
  - AWS RDS PostgreSQL

File Storage:
  - AWS S3 + CloudFront
  - Cloudinary (easier, includes image optimization)

Redis (for queues & caching):
  - Upstash (serverless)
  - Railway Redis

Email:
  - Resend (modern, easy)
  - SendGrid (established)

Monitoring:
  - Sentry (error tracking)
  - LogRocket (session replay)
  - Datadog or New Relic (APM)

CI/CD:
  - GitHub Actions
  - Automated tests on PR
  - Auto-deploy on merge to main
```

### 16.2 Environment Variables (Production)

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/payflow_hr_prod

# Auth
JWT_SECRET=your_super_secret_key_64_chars
JWT_EXPIRY=15m
REFRESH_TOKEN_SECRET=another_super_secret_key_64_chars
REFRESH_TOKEN_EXPIRY=7d

# Flutterwave (KEEP SECRET)
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-xxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-xxx
FLUTTERWAVE_ENCRYPTION_KEY=xxx
FLUTTERWAVE_WEBHOOK_SECRET=whsec_xxx

# File Storage
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=payflow-hr-prod

# Email
RESEND_API_KEY=xxx
FROM_EMAIL=noreply@payflowhr.com

# Redis
REDIS_URL=redis://:password@host:6379

# Frontend URL (for CORS)
FRONTEND_URL=https://app.payflowhr.com

# Node Environment
NODE_ENV=production
PORT=8080
```

### 16.3 Docker Setup (Optional)

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["node", "dist/index.js"]
```

---

## PRIORITY IMPLEMENTATION ORDER

### Phase 1: Foundation (Week 1-2)
```
✅ Database setup & migrations
✅ Authentication system (signup, login, JWT)
✅ Basic user roles (owner, employee)
✅ Company management
```

### Phase 2: Employee Management (Week 3-4)
```
✅ Employee CRUD
✅ Department & Office management
✅ File uploads
✅ Employee invitation flow
```

### Phase 3: Payroll (Week 5-6)
```
✅ Payroll run creation
✅ Flutterwave integration
✅ Webhook handlers
✅ Payment processing flow
✅ Salary claims for employees
```

### Phase 4: Time Off & Attendance (Week 7-8)
```
✅ Leave types & balances
✅ Leave request workflow
✅ Attendance tracking
✅ Clock in/out
```

### Phase 5: Notifications & Real-time (Week 9)
```
✅ WebSocket setup
✅ Notification system
✅ Real-time updates
```

### Phase 6: Advanced Features (Week 10-12)
```
✅ Performance management
✅ Recruitment
✅ Documents
✅ Reports
✅ Training & Assets
✅ Expenses
```

### Phase 7: Settings & Polish (Week 13-14)
```
✅ All settings pages
✅ Subscription management
✅ Integrations
✅ Email templates
```

### Phase 8: Testing & Deployment (Week 15-16)
```
✅ Comprehensive testing
✅ Load testing
✅ Security audit
✅ Production deployment
```

---

## QUICK START CHECKLIST FOR BACKEND DEVELOPER

```
□ 1. Read this entire document
□ 2. Set up development environment (Node.js/Python/Rust)
□ 3. Create PostgreSQL database
□ 4. Initialize project with framework of choice
□ 5. Set up Prisma/ORM with database connection
□ 6. Create all database migrations (use schema above)
□ 7. Implement authentication system
   □ JWT generation & validation
   □ HTTP-only cookies
   □ Password hashing (bcrypt/argon2)
   □ Email verification
   □ Password reset
□ 8. Implement middleware
   □ Authentication middleware
   □ Authorization (role-based)
   □ Multi-tenant isolation
   □ Rate limiting
   □ CORS
   □ Error handling
□ 9. Implement Employee CRUD endpoints
□ 10. Implement Payroll endpoints
□ 11. Integrate Flutterwave
   □ Payment creation
   □ Webhook handler (CRITICAL)
   □ Transfer API for employee claims
□ 12. Implement file upload endpoint
□ 13. Set up Redis for queues
□ 14. Implement background jobs
   □ Email sending
   □ Payroll processing
   □ Scheduled reminders
□ 15. Set up WebSocket server
□ 16. Write tests (unit + integration)
□ 17. Deploy to staging
□ 18. Test with frontend
□ 19. Security audit
□ 20. Deploy to production
```

---

## SUPPORT & QUESTIONS

For any questions about frontend implementation details:
- Check the frontend codebase at: `c:\Users\User\Documents\gasless_payroll_system\payflow-hr\src`
- All components are in TypeScript with clear interfaces
- Mock data in components shows expected data structure

**End of Document**
