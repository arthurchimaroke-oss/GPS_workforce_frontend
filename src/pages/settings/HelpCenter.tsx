import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, BookOpen, MessageCircle, Mail, FileText, Video, ExternalLink } from "lucide-react";

const faqs = [
  { q: "How do I request time off?", a: "Navigate to Time Off > My Time Off and click 'Request Time Off'. Select the dates, type of leave, and add any notes before submitting." },
  { q: "How do I update my personal information?", a: "Go to Settings > My Profile to update your personal details, contact information, and profile photo." },
  { q: "Where can I find my payslips?", a: "Your payslips are available under Payroll > Employee Payroll. Click on any month to view or download your payslip." },
  { q: "How do I set performance goals?", a: "Navigate to Performance > My Performance and click 'Add Goal'. Fill in the goal details, set a deadline, and track your progress." },
  { q: "How do I submit an attendance correction?", a: "Go to Attendance > My Attendance, find the date that needs correction, and click 'Request Correction'. Your manager will be notified for approval." },
  { q: "How do I access company documents?", a: "All company documents are available under Documents. You can search, filter by category, and download documents as needed." },
];

const resources = [
  { title: "Getting Started Guide", desc: "Learn the basics of using HRDashboard", icon: BookOpen, type: "Guide" },
  { title: "Employee Handbook", desc: "Company policies and procedures", icon: FileText, type: "Document" },
  { title: "Video Tutorials", desc: "Step-by-step video walkthroughs", icon: Video, type: "Video" },
  { title: "API Documentation", desc: "Developer documentation and APIs", icon: ExternalLink, type: "Docs" },
];

const HelpCenter = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
          <p className="text-muted-foreground text-sm mt-1 mb-6">Find answers, resources, and get support</p>
          <div className="relative">
            <Input placeholder="Search for help articles, guides, and more..." className="pl-10 h-12 text-base" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((r) => (
            <Card key={r.title} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <r.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Still need help?</h3>
            <p className="text-sm text-muted-foreground mb-4">Our support team is available Monday-Friday, 9AM-6PM</p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="outline"><MessageCircle className="w-4 h-4 mr-2" /> Live Chat</Button>
              <Button><Mail className="w-4 h-4 mr-2" /> Email Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default HelpCenter;
