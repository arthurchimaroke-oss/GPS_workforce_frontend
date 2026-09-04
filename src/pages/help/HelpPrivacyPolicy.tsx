import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Info } from "lucide-react";

const HelpPrivacyPolicy = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-primary cursor-pointer hover:underline">Help Center</span>
              <span className="mx-2">›</span>
              <span>Privacy Policy</span>
            </p>
          </div>
          <div className="relative">
            <Input placeholder="Search what you need" className="w-64 pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">Privacy Policy</h2>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>

        <Card>
          <CardContent className="p-6 prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold text-foreground mb-3">Introduction</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              HRDashboard is committed to protecting your privacy and the confidentiality of your personal information. This Privacy Policy describes how we collect, use, and disclose your personal information in connection with our HR management platform, HRDashboard. By using HRDashboard, you consent to the collection, use, and disclosure of your personal information in accordance with this Privacy Policy.
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Collection and Use of Personal Information</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              We collect personal information from you when you use HRDashboard, such as your name, contact information, employment history, and other HR-related data. We use this information to provide you with our HR management services, including payroll processing, benefits administration, employee record keeping, and performance management.
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Disclosure of Personal Information</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              We may disclose your personal information to third-party service providers who assist us in providing our HR management services, such as payroll processors, benefits providers, and performance management software vendors. We may also disclose your personal information to comply with legal obligations, such as responding to subpoenas or court orders.
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Security</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. We use a variety of security measures, including encryption and firewalls, to safeguard your information. However, no data transmission over the Internet can be guaranteed to be 100% secure, and we cannot ensure or warrant the security of any information you transmit to us.
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Access and Correction of Personal Information</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You have the right to access and correct your personal information held by us. You can do so by logging into your account on HRDashboard or by contacting us at the contact information provided below.
            </p>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default HelpPrivacyPolicy;
