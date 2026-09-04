# 🧪 PayFlow HR - SaaS Architecture Test Run Guide

**Date:** April 4, 2026  
**Version:** 2.0 (SaaS Multi-tenant Architecture)

---

## 🎯 WHAT'S BEEN IMPLEMENTED

### ✅ SaaS Architecture
1. **SaaS Owner (PayFlow HR)** - Master account tracking ALL funds across all companies
2. **Employer Sub-accounts** - Unique company IDs with individual balance tracking
3. **Employee Multi-Currency Claims** - Employees choose their currency & claim frequency
4. **Real-time Notifications** - Two-way communication between employer ↔ employee

### ✅ New Features
- **Currency Conversion** - Automatic conversion (USD, EUR, GBP, NGN, INR, MXN)
- **Claim Frequency** - Daily, Weekly, or Monthly (set by employee)
- **Transaction Notifications** - Every action creates notifications for both parties
- **Message System** - Employees can message employers about claims
- **Response Tracking** - See employer/employee responses in notifications

---

## 🚀 COMPLETE TEST RUN FLOW

### **STEP 1: Setup & Initial State**

1. **Clear existing data** (open browser console):
   ```javascript
   localStorage.clear();
   location.reload();
   ```

2. **Refresh the app** - Mock data will initialize:
   - **SaaS Organization**: PayFlow HR with $2,450,000 master balance
   - **Employer**: TechCorp Inc. with $125,000 balance
   - **3 Employees**:
     - Sarah Jenkins (US) - Prefers **USD**, Monthly claims
     - Alex Rivera (Mexico) - Prefers **MXN**, Weekly claims
     - Priya Sharma (India) - Prefers **INR**, Monthly claims

---

### **STEP 2: Employer Runs Payroll**

1. **Navigate to**: `http://localhost:8081/payroll/overview`

2. **Review Employees** (you'll see 5 employees):
   - Sarah Jenkins - $8,500
   - Alex Rivera - $7,200
   - Marcus Chen - $6,800
   - Elena Rodriguez - $5,400
   - David Kim - $7,000

3. **Click "Continue to Funding"**

4. **Review Payment Summary**:
   - Total Gross: $34,900
   - Processing Fee (1.5%): $523.50
   - Grand Total: $35,423.50

5. **Click "Pay $34,900 with Flutterwave"**

6. **Click "Pay" in modal** (simulates 2-second payment)

7. **Watch Disbursement Progress**:
   - Each employee processes one-by-one
   - Amounts are **automatically converted** to their preferred currency
   - Notifications are created for BOTH employer and each employee

8. **Click "Download Receipt"** - Downloads detailed payroll receipt

---

### **STEP 3: Employee Views Notifications**

1. **Navigate to employee claim page**

2. **Check Notification Bell** (top-right):
   - You'll see **red badge** with unread count
   - Click bell to open notification center

3. **View Notifications**:
   - "Salary Disbursed Successfully!"
   - Shows amount in **employee's preferred currency**
   - Shows exchange rate used

4. **Click notification** to mark as read

---

### **STEP 4: Employee Claims Salary**

1. **View Pending Claims**:
   - Shows all disbursed salaries ready to claim
   - Amounts shown in **employee's currency** (e.g., MXN 124,800 for Alex)
   - Shows original USD amount and conversion rate

2. **Option 1: Claim Individual**
   - Click **"Claim"** button
   - 2-second processing simulation
   - Success notification created

3. **Option 2: Send Message to Employer First**
   - Click **message icon** (💬)
   - Type message (e.g., "Please confirm my bonus amount")
   - Click "Send Message"
   - Employer receives notification with message

4. **Option 3: Claim All**
   - Click **"Claim All"** button
   - Processes all pending claims
   - Creates notifications for employer

---

### **STEP 5: Employer Sees Employee Activity**

1. **Check Notification Bell** (employer view):
   - "Sarah Jenkins - Salary Disbursed"
   - "Sarah Jenkins claimed salary - $8,500 USD"
   - Employee messages appear here

2. **View All Notifications**:
   - System notifications (disbursement status)
   - Employee messages
   - Can reply to employee messages

---

## 📊 DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                  SAAS OWNER (PayFlow HR)                     │
│  Master Balance: $2,450,000                                  │
│  Tracks ALL transactions across ALL companies                │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              EMPLOYER SUB-ACCOUNT (TechCorp)                 │
│  Employer ID: EMP-COMPANY-001                                │
│  Balance: $125,000 → -$35,423.50 (after payroll)            │
│  Currency: USD                                               │
│                                                              │
│  ACTION: Creates payroll run                                 │
│  ├─ Total: $34,900                                           │
│  ├─ Fee: $523.50                                             │
│  └─ Grand Total: $35,423.50                                  │
│                                                              │
│  NOTIFICATIONS CREATED:                                      │
│  ├─ To each employee: "Salary disbursed"                     │
│  └─ To employer: "Employee X status update"                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    EMPLOYEES (Multi-Currency)                │
│                                                              │
│  Sarah Jenkins (US)                                          │
│  ├─ Preferred Currency: USD                                  │
│  ├─ Claim Frequency: Monthly                                 │
│  ├─ Amount: $8,500 USD                                       │
│  └─ Bank: Chase ****4829                                     │
│                                                              │
│  Alex Rivera (Mexico)                                        │
│  ├─ Preferred Currency: MXN                                  │
│  ├─ Claim Frequency: Weekly                                  │
│  ├─ Amount: $7,200 USD → MXN 124,584 (Rate: 17.2)           │
│  └─ Bank: BBVA México ****7821                               │
│                                                              │
│  Priya Sharma (India)                                        │
│  ├─ Preferred Currency: INR                                  │
│  ├─ Claim Frequency: Monthly                                 │
│  ├─ Amount: $6,800 USD → INR 567,800 (Rate: 83.5)           │
│  └─ Bank: HDFC Bank ****3456                                 │
│                                                              │
│  EACH EMPLOYEE CAN:                                          │
│  ├─ View disbursement in their currency                      │
│  ├─ Claim salary (triggers notification to employer)         │
│  ├─ Send message to employer about claim                     │
│  └─ View claim history                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔔 NOTIFICATION TYPES

### System → Employee
| Type | When | Message |
|------|------|---------|
| `claim_processed` | Employer disburses salary | "Your salary of {currency} {amount} has been processed" |
| `claim_failed` | Disbursement fails | "There was an issue processing your salary" |

### System → Employer
| Type | When | Message |
|------|------|---------|
| `claim_processed` | Employee disbursement succeeds | "{Employee}'s salary has been disbursed" |
| `claim_failed` | Employee disbursement fails | "Failed to disburse salary for {Employee}" |

### Employee → Employer
| Type | When | Message |
|------|------|---------|
| `claim_request` | Employee claims salary | "{Employee} claimed {currency} {amount}" |
| `claim_request` | Employee sends message | Custom message from employee |

### Employer → Employee
| Type | When | Message |
|------|------|---------|
| `claim_approved` | Employer approves claim | "Your salary claim has been approved" |
| `claim_rejected` | Employer rejects claim | "Your salary claim needs review" |

---

## 💱 CURRENCY CONVERSION RATES

```
From USD:
- USD → USD: 1.0
- USD → EUR: 0.92
- USD → GBP: 0.79
- USD → NGN: 1,550
- USD → INR: 83.5
- USD → MXN: 17.2

Example Conversions:
- $8,500 USD → MXN 146,200 (Alex if he chose MXN)
- $7,200 USD → INR 601,200 (Priya if she chose INR)
- $6,800 USD → EUR 6,256 (if EUR chosen)
```

---

## 🎯 TESTING CHECKLIST

### SaaS Owner Level
- [ ] Master balance updates after payroll
- [ ] Total processed amount increases
- [ ] All employer transactions tracked

### Employer Level
- [ ] Employer balance decreases after payroll
- [ ] Notifications received for each employee
- [ ] Can see employee claim notifications
- [ ] Can reply to employee messages

### Employee Level
- [ ] Sees disbursed salary in preferred currency
- [ ] Exchange rate displayed correctly
- [ ] Can claim individual salary
- [ ] Can claim all pending salaries
- [ ] Can send message to employer
- [ ] Receives notification after claim
- [ ] Can see claim history

### Notification System
- [ ] Notification badge shows unread count
- [ ] Click notification marks as read
- [ ] Can reply to messages
- [ ] Responses visible in notification thread
- [ ] Notifications sorted by date (newest first)

---

## 🔍 HOW TO VERIFY DATA

Open browser console and run:

```javascript
// View SaaS organization
JSON.parse(localStorage.getItem('payflow_saas_organization'))

// View employers
JSON.parse(localStorage.getItem('payflow_employers'))

// View employees
JSON.parse(localStorage.getItem('payflow_employees'))

// View payroll runs
JSON.parse(localStorage.getItem('payflow_payroll_runs'))

// View notifications
JSON.parse(localStorage.getItem('payflow_notifications'))

// Clear all data
localStorage.clear()
location.reload()
```

---

## 🎬 DEMO SCRIPT (For Stakeholders)

### Introduction (30 seconds)
"PayFlow HR is a SaaS payroll platform where a master account tracks all funds. Each company has a sub-account, and employees can claim salaries in their preferred currency with real-time notifications."

### Demo Flow (3 minutes)
1. **Show employer dashboard** - "Here's TechCorp with $125K balance"
2. **Run payroll** - "Create payroll for 5 employees, $35K total"
3. **Show currency conversion** - "Alex in Mexico sees MXN, Priya in India sees INR"
4. **Show notifications** - "Both employer and employee get notified"
5. **Employee claims** - "Employee claims salary, employer gets notified"
6. **Message system** - "Can message employer about claims"

### Key Differentiators (30 seconds)
- Multi-currency support with real-time conversion
- Two-way notification system
- Message thread between employer/employee
- SaaS master tracking all transactions

---

## 🐛 TROUBLESHOOTING

### Issue: Notifications not showing
**Fix**: Check localStorage for `payflow_notifications` key

### Issue: Currency not converting
**Fix**: Ensure employee has `preferredCurrency` set in database

### Issue: Claims not appearing
**Fix**: Run payroll first - claims only appear after disbursement

### Issue: Data persistence across refreshes
**Expected**: Data stored in localStorage, persists until cleared

---

## 📝 NEXT STEPS (For Production)

1. Replace localStorage with real backend API
2. Implement actual Flutterwave multi-currency payments
3. Add WebSocket for real-time notifications
4. Implement proper authentication (JWT)
5. Add database (PostgreSQL)
6. Set up email notifications
7. Add push notifications (Firebase/OneSignal)

---

**END OF TEST RUN GUIDE**
