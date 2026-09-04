import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import PasswordSuccess from "./pages/PasswordSuccess";
import OnboardingStep1 from "./pages/onboarding/OnboardingStep1";
import OnboardingEntityStep from "./pages/onboarding/OnboardingEntityStep";
import OnboardingStep2 from "./pages/onboarding/OnboardingStep2";
import OnboardingReview from "./pages/onboarding/OnboardingReview";
import DashboardV1 from "./pages/DashboardV1";
// import DashboardV2 from "./pages/DashboardV2";
import EmployeeDashboard from "./pages/employee-dashboard/EmployeeDashboard";
import EmployeeList from "./pages/employees/EmployeeList";
import EmployeeDetail from "./pages/employees/EmployeeDetail";
import Directory from "./pages/employees/Directory";
import OrgChart from "./pages/employees/OrgChart";
import MyTimeOff from "./pages/timeoff/MyTimeOff";
import TeamTimeOff from "./pages/timeoff/TeamTimeOff";
import EmployeeTimeOff from "./pages/timeoff/EmployeeTimeOff";
import TimeOffSettings from "./pages/timeoff/TimeOffSettings";
import MyAttendance from "./pages/attendance/MyAttendance";
import TeamAttendance from "./pages/attendance/TeamAttendance";
import EmployeeAttendance from "./pages/attendance/EmployeeAttendance";
import AttendanceSettings from "./pages/attendance/AttendanceSettings";
import PayrollLayout from "./pages/payroll/PayrollLayout";
import PayrollList from "./pages/payroll/PayrollList";
import PayrollOverview from "./pages/payroll/PayrollOverview";
import PayrollDetail from "./pages/payroll/PayrollDetail";
import PayrollSettings from "./pages/payroll/PayrollSettings";
import { DisburseSalary } from "./components/payroll/DisburseSalary";
import { ClaimSalary } from "./components/payroll/ClaimSalary";
import JobsList from "./pages/recruitment/JobsList";
import JobDetail from "./pages/recruitment/JobDetail";
import CandidatesList from "./pages/recruitment/CandidatesList";
import EmployeeToBeOnboarded from "./pages/recruitment/EmployeeToBeOnboarded";
import DocumentsList from "./pages/documents/DocumentsList";
import DocumentDetail from "./pages/documents/DocumentDetail";
import EmployerDocumentsList from "./pages/documents/EmployerDocumentsList";
import ChecklistTodos from "./pages/checklist/ChecklistTodos";
import OnboardingList from "./pages/checklist/OnboardingList";
import OnboardingDetail from "./pages/checklist/OnboardingDetail";
import OffboardingList from "./pages/checklist/OffboardingList";
import ChecklistSettings from "./pages/checklist/ChecklistSettings";
import NewsList from "./pages/news/NewsList";
import NewsDetail from "./pages/news/NewsDetail";
import NewsCreate from "./pages/news/NewsCreate";
import NewsEdit from "./pages/news/NewsEdit";
import ReportsIndex from "./pages/reports/ReportsIndex";
import EmployeeDataAge from "./pages/reports/EmployeeDataAge";
import EmployeeDataGender from "./pages/reports/EmployeeDataGender";
import EmployeeDataBirthday from "./pages/reports/EmployeeDataBirthday";
import EmployeeTurnoverRate from "./pages/reports/EmployeeTurnoverRate";
import Headcount from "./pages/reports/Headcount";
import OnboardingReport from "./pages/reports/OnboardingReport";
import OffboardingReport from "./pages/reports/OffboardingReport";
import TimeOffBalance from "./pages/reports/TimeOffBalance";
import TimeOffSchedule from "./pages/reports/TimeOffSchedule";
import NotFound from "./pages/NotFound";
import PerformanceOverview from "./pages/performance/PerformanceOverview";
import MyPerformance from "./pages/performance/MyPerformance";
import TeamPerformance from "./pages/performance/TeamPerformance";
import PerformanceReviews from "./pages/performance/PerformanceReviews";
import PerformanceSettings from "./pages/performance/PerformanceSettings";
import ProfileSettings from "./pages/settings/ProfileSettings";
import NotificationsPage from "./pages/settings/NotificationsPage";
import HelpCenter from "./pages/settings/HelpCenter";
import CompanySettings from "./pages/settings/CompanySettings";
import ChangePassword from "./pages/settings/ChangePassword";
import PushNotifications from "./pages/settings/PushNotifications";
import NotificationsList from "./pages/notifications/NotificationsList";
import NotificationSettings from "./pages/notifications/NotificationSettings";
import EmployeeNotificationsList from "./pages/notifications/EmployeeNotificationsList";
import MessagesList from "./pages/messages/MessagesList";
import EmployeeMessagesList from "./pages/messages/EmployeeMessagesList";
import HelpCenterIndex from "./pages/help/HelpCenterIndex";
import HelpFaq from "./pages/help/HelpFaq";
import HelpPrivacyPolicy from "./pages/help/HelpPrivacyPolicy";
import PermissionSettings from "./pages/settings/PermissionSettings";
import IntegrationSettings from "./pages/settings/IntegrationSettings";
import SubscriptionSettings from "./pages/settings/SubscriptionSettings";
import PaymentCheckout from "./pages/settings/PaymentCheckout";
import CompanyInfoSettings from "./pages/settings/CompanyInfoSettings";
import OfficesSettings from "./pages/settings/OfficesSettings";
import SystemSettings from "./pages/settings/SystemSettings";
import DepartmentSettings from "./pages/settings/DepartmentSettings";
import JobTitlesSettings from "./pages/settings/JobTitlesSettings";
import WorkScheduleSettings from "./pages/settings/WorkScheduleSettings";
import TrainingOverview from "./pages/training/TrainingOverview";
import MyCourses from "./pages/training/MyCourses";
import CourseDetail from "./pages/training/CourseDetail";
import TrainingSettings from "./pages/training/TrainingSettings";
import AssetList from "./pages/assets/AssetList";
import AssetDetail from "./pages/assets/AssetDetail";
import AssetSettings from "./pages/assets/AssetSettings";
import ExpenseList from "./pages/expenses/ExpenseList";
import ExpenseCreate from "./pages/expenses/ExpenseCreate";
import ExpenseSettings from "./pages/expenses/ExpenseSettings";
// import { OnboardingProvider } from "./components/onboarding/OnboardingContext";
import { AuthProvider } from "./components/context/authContext";
import { FundProvider } from "./components/context/fundingContext";
import SidebarLayout from "./components/layout/SidebarLayout";
import EmployeeOnboarding from "./pages/onboard-new-employee/NewEmployeeOnboarding";
import { EmployeeProvider } from "./components/context/employeeContext";
import RecruitmentSettings from "./pages/recruitment/RecruitmentSettings";
import { OnboardingProvider } from "./components/onboarding/OnboardingContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>

      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Every route needs to be wrapped in a Auth provider */}
          <Route element={<AuthProvider><Outlet /></AuthProvider>}>
            <Route element={<EmployeeProvider><Outlet /></EmployeeProvider>}>
              <Route path="/employees" element={<EmployeeList />} />

              <Route path="/employee/onboard" element={<EmployeeOnboarding />} />
              <Route path="/recruitment/employee_onboarding" element={<EmployeeToBeOnboarded />} />

            </Route>
            <Route path="/" element={<Navigate to="/sign-in" replace />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password-success" element={<PasswordSuccess />} />
            <Route element={<OnboardingProvider><Outlet /></OnboardingProvider>}>
              <Route path="/onboarding/step-1" element={<OnboardingStep1 />} />
              <Route path="/onboarding/step-2" element={<OnboardingEntityStep />} />
              <Route path="/onboarding/step-3" element={<OnboardingStep2 />} />
              <Route path="/onboarding/step-4" element={<OnboardingReview />} />
            </Route>



            <Route path="/dashboard-v1" element={<DashboardV1 />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard-v1" replace />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/employees/directory" element={<Directory />} />
            <Route path="/employees/org-chart" element={<OrgChart />} />
            <Route path="/employees/:id" element={<EmployeeDetail />} />
            <Route path="/time-off/my" element={<MyTimeOff />} />
            <Route path="/time-off/team" element={<TeamTimeOff />} />
            <Route path="/time-off/employee" element={<EmployeeTimeOff />} />
            <Route path="/time-off/settings" element={<TimeOffSettings />} />
            <Route path="/attendance/my" element={<MyAttendance />} />
            <Route path="/attendance/team" element={<TeamAttendance />} />
            <Route path="/attendance/employee" element={<EmployeeAttendance />} />
            <Route path="/attendance/settings" element={<AttendanceSettings />} />
            <Route element={<FundProvider><Outlet /></FundProvider>}>

              <Route path="/payroll" element={<PayrollLayout />}>
                <Route index element={<PayrollList />} />
                <Route path="list" element={<PayrollList />} />
                <Route path="overview" element={<PayrollOverview />} />
                <Route path="settings" element={<PayrollSettings />} />
                <Route path=":id" element={<PayrollDetail />} />
              </Route>
            </Route>

            <Route path="/recruitment/jobs" element={<JobsList />} />
            <Route path="/recruitment/jobs/:id" element={<JobDetail />} />
            <Route path="/recruitment/candidates" element={<CandidatesList />} />
            <Route path="/recruitment/settings" element={<RecruitmentSettings />} />
            <Route path="/documents" element={<DocumentsList />} />
            <Route path="/documents/:id" element={<DocumentDetail />} />
            <Route path="/employer-documents" element={<EmployerDocumentsList />} />
            <Route path="/employer-documents/:id" element={<DocumentDetail />} />
            <Route path="/checklist/todos" element={<ChecklistTodos />} />
            <Route path="/checklist/onboarding" element={<OnboardingList />} />
            <Route path="/checklist/onboarding/:id" element={<OnboardingDetail />} />
            <Route path="/checklist/offboarding" element={<OffboardingList />} />
            <Route path="/checklist/settings" element={<ChecklistSettings />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/create" element={<NewsCreate />} />
            <Route path="/news/:id/edit" element={<NewsEdit />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/reports" element={<ReportsIndex />} />
            <Route path="/reports/headcount" element={<Headcount />} />
            <Route path="/reports/turnover" element={<EmployeeTurnoverRate />} />
            <Route path="/reports/onboarding" element={<OnboardingReport />} />
            <Route path="/reports/offboarding" element={<OffboardingReport />} />
            <Route path="/reports/time-off-balance" element={<TimeOffBalance />} />
            <Route path="/reports/time-off-schedule" element={<TimeOffSchedule />} />
            <Route path="/reports/employee-data/age" element={<EmployeeDataAge />} />
            <Route path="/reports/employee-data/gender" element={<EmployeeDataGender />} />
            <Route path="/reports/employee-data/birthday" element={<EmployeeDataBirthday />} />
            <Route path="/performance" element={<PerformanceOverview />} />
            <Route path="/performance/my" element={<MyPerformance />} />
            <Route path="/performance/team" element={<TeamPerformance />} />
            <Route path="/performance/reviews" element={<PerformanceReviews />} />
            <Route path="/performance/settings" element={<PerformanceSettings />} />
            <Route path="/system-settings" element={<SystemSettings />} />
            <Route path="/settings" element={<Navigate to="/settings/company" replace />} />
            <Route path="/settings/company" element={<CompanyInfoSettings />} />
            <Route path="/settings/profile" element={<ProfileSettings />} />
            <Route path="/settings/notifications" element={<NotificationsPage />} />
            <Route path="/settings/company-info" element={<Navigate to="/settings/company" replace />} />
            <Route path="/settings/offices" element={<OfficesSettings />} />
            <Route path="/settings/department" element={<DepartmentSettings />} />
            <Route path="/settings/job-titles" element={<JobTitlesSettings />} />
            <Route path="/settings/work-schedule" element={<WorkScheduleSettings />} />
            <Route path="/settings/permission" element={<PermissionSettings activeTab="/settings/permission" />} />
            <Route path="/settings/integration" element={<IntegrationSettings activeTab="/settings/integration" />} />
            <Route path="/settings/subscription" element={<SubscriptionSettings activeTab="/settings/subscription" />} />
            <Route path="/settings/payment" element={<PaymentCheckout />} />
            <Route path="/settings/password" element={<ChangePassword activeTab="/settings/password" />} />
            <Route path="/settings/push-notifications" element={<PushNotifications activeTab="/settings/push-notifications" />} />
            <Route path="/training" element={<TrainingOverview />} />
            <Route path="/training/my-courses" element={<MyCourses />} />
            <Route path="/training/courses/:id" element={<CourseDetail />} />
            <Route path="/training/settings" element={<TrainingSettings />} />
            <Route path="/assets" element={<AssetList />} />
            <Route path="/assets/settings" element={<AssetSettings />} />
            <Route path="/assets/:id" element={<AssetDetail />} />
            <Route path="/expenses" element={<ExpenseList />} />
            <Route path="/expenses/create" element={<ExpenseCreate />} />
            <Route path="/expenses/settings" element={<ExpenseSettings />} />
            <Route path="/notifications" element={<NotificationsList />} />
            <Route path="/notifications/settings" element={<NotificationSettings />} />
            <Route path="/employee-notifications" element={<EmployeeNotificationsList />} />
            <Route path="/messages" element={<MessagesList />} />
            <Route path="/employee-messages" element={<EmployeeMessagesList />} />
            <Route path="/help" element={<HelpCenterIndex />} />
            <Route path="/help/faq" element={<HelpFaq />} />
            <Route path="/help/privacy-policy" element={<HelpPrivacyPolicy />} />
            <Route path="/help/:section" element={<HelpCenterIndex />} />
          </Route>
          {/* Payroll Smart Contract Routes */}
          <Route path="/payroll/disburse" element={<SidebarLayout><DisburseSalary /></SidebarLayout>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;