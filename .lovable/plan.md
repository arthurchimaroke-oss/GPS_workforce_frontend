

# HRDashboard — Batch 1: Authentication Screens (9 screens)

## Design Style Captured
- **Color scheme**: White/light background, dark navy (#1B2559) buttons, teal/green (#0D9488) accents and borders
- **Typography**: Clean, bold headings with lighter body text
- **Layout**: Split-screen for Sign In (hero image left, form right), centered card for password reset flows
- **Background**: Subtle curved line pattern on password reset/OTP screens
- **Brand**: "HRDashboard" with green "H" logo icon

---

## Screens to Build

### 1. Sign In Page (`/sign-in`)
- **Split layout**: Left side with hero image of people collaborating, dark teal footer with "HRDashboard" branding and tagline *"Let's empower your employees today"*
- **Right side**: Login form with Email Address and Password fields (green border on focus), password visibility toggle, "Remember Me" checkbox, "Forgot Password" link
- **Login button** (outlined/light style), social login buttons (Google & Apple)
- **Footer**: Link to "Create Account", copyright with Terms & Conditions / Privacy Policy
- **States**: Empty, Filled, and Error state (red error message under email: *"The email you entered is not registered"*)

### 2. Sign Up Page (`/sign-up`)
- **Split layout**: Left side with registration form, right side shows dashboard preview on teal background with the tagline
- **Form fields**: Name, Work Email, Password (with visibility toggle)
- **"Create Account" button**, social registration (Google & Apple)
- **Footer link**: "Already have an account? Login Here"

### 3. Forgot Password Page (`/forgot-password`)
- **Centered card** on subtle curved-line background
- HRDashboard logo, heading "Reset your password"
- Description text, "Registered Email" input field
- **Two buttons**: "Send Reset Link" (dark) and "Back to Login" (outlined)

### 4. OTP Verification Page (`/otp-verification`)
- **Centered layout** with curved-line background
- HRDashboard logo, "OTP Verification" heading
- Message showing email address with "Wrong Email?" link in green
- **4-digit OTP input** boxes (large, square inputs)
- Dark "Submit" button

### 5. Enter New Password Page (`/reset-password`)
- **Centered layout** with curved-line background
- "Update your password" heading with instructions (min 8 chars, letters + numbers)
- **New Password** field with visibility toggle
- **Real-time password validation indicators** (green ✓ / red ✗): 8 characters, Number (0-9), Uppercase (A-Z), Lowercase (a-z)
- **Confirm Password** field
- Dark "Submit" button

### 6. Success State Page (`/password-success`)
- **Centered layout** with celebration illustration (checkmark in green circle with confetti)
- Heading: "You successfully changed your password"
- Subtitle reminder text
- Dark "Back to Login" button

---

## Navigation Flow
- Sign In ↔ Sign Up (linked to each other)
- Sign In → Forgot Password → OTP Verification → Enter New Password → Success → Back to Sign In

## Approach
- All screens built as **UI-only** for now (no backend/auth wired up yet)
- Form validation with proper error states as shown in the designs
- Responsive layout matching the Figma designs
- Shared auth layout components to keep code DRY
- This establishes the design system (colors, typography, spacing) that all future screens will follow

