import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Info, Calendar, ThumbsUp } from "lucide-react";

const faqs = [
  { q: "What is an HR management platform?", a: "An HR management platform is a software solution designed to streamline and automate various HR-related tasks such as payroll processing, employee record keeping, benefits administration, and performance management.", likes: 30 },
  { q: "What are the benefits of using an HR management platform?", a: "Using an HR management platform can help save time, reduce errors, and improve efficiency in HR operations. It can also improve communication between employees and HR, enhance compliance with regulations, and provide insights into HR metrics.", likes: 44 },
  { q: "How do I choose the right HR management platform for my organization?", a: "When choosing an HR management platform, consider your organization's specific needs, budget, and goals. Evaluate different platforms based on features, ease of use, customer support, security, and integration with other systems.", likes: 52 },
  { q: "How do I implement an HR management platform?", a: "Implementing an HR management platform typically involves setting up the software, configuring settings, migrating data, and training employees. The process may vary depending on the platform and your organization's needs.", likes: 28 },
];

const HelpFaq = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-primary cursor-pointer hover:underline">Help Center</span>
              <span className="mx-2">›</span>
              <span>FAQ's</span>
            </p>
          </div>
          <div className="relative">
            <Input placeholder="Search what you need" className="w-64 pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Updated over a week ago</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{faq.likes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default HelpFaq;
