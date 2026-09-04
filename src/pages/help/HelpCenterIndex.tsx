import { useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Users, HelpCircle, UserCheck, Star, Zap, Phone, DollarSign, MessageSquare, Settings } from "lucide-react";

const helpCards = [
  { title: "Get Started", desc: "Discover Unpixel Company", icon: Users, path: "/help/get-started" },
  { title: "FAQ", desc: "Frequently Asked Questions", icon: HelpCircle, path: "/help/faq" },
  { title: "Employee Profile", desc: "Instructions for employees", icon: UserCheck, path: "/help/employee-profile" },
  { title: "Checklists - On/offboarding", desc: "Instructions for employees", icon: Star, path: "/help/checklists" },
  { title: "Keyboard Shortcut", desc: "Instructions for employees", icon: Zap, path: "/help/keyboard-shortcuts" },
  { title: "Contact Support", desc: "Get support if you having trouble", icon: Phone, path: "/help/contact" },
  { title: "Pricing Plan", desc: "Information about pricing plan", icon: DollarSign, path: "/help/pricing" },
  { title: "Company News", desc: "Latest news about unpixel studio", icon: MessageSquare, path: "/help/news" },
  { title: "Integrations", desc: "Setting integration third party", icon: Settings, path: "/help/integrations" },
];

const HelpCenterIndex = () => {
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
            <p className="text-muted-foreground text-sm mt-1">What can we help you with?</p>
          </div>
          <div className="relative">
            <Input placeholder="Search what you need" className="w-64 pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpCards.map((card) => (
            <Card key={card.title} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(card.path)}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default HelpCenterIndex;
