import { useState } from "react";
import EmployeeSidebarLayout from "@/components/layout/EmployeeSidebarLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MoreVertical, Play, Smile, Paperclip, Mic, X } from "lucide-react";

const contacts = [
  { name: "HR Department", preview: "Your time off request has been...", time: "2 m Ago", online: true, unread: 2, avatar: null },
  { name: "John Manager", preview: "Can we schedule a quick meeting...", time: "15 m Ago", online: true, unread: 0, avatar: null },
  { name: "Payroll Team", preview: "Your salary slip is ready for...", time: "1 h Ago", online: false, unread: 1, avatar: null, initials: "PT" },
  { name: "IT Support", preview: "Your ticket has been resolved...", time: "2 h Ago", online: true, unread: 0, avatar: null, initials: "IT" },
  { name: "Sarah Colleague", preview: "Thanks for your help with the...", time: "1 d Ago", online: false, unread: 0, avatar: null, initials: "SC" },
];

const messages = [
  { type: "received", text: "Hello! Your time off request has been received.", time: "09:10" },
  { type: "sent", text: "Great! Thank you for confirming.", time: "09:15" },
  { type: "received", text: "We'll process it within 2 business days. Is there anything else you need?", time: "09:20" },
  { type: "sent", text: "No, that's all. Thanks!", time: "09:25" },
  { type: "received", text: "You're welcome! Have a great day.", time: "09:30" },
];

const EmployeeMessagesList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedContact, setSelectedContact] = useState(0);
  const [showAttachment, setShowAttachment] = useState(false);

  return (
    <EmployeeSidebarLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>

        <div className="flex gap-0 h-[calc(100vh-180px)] bg-card rounded-xl border border-border overflow-hidden">
          {/* Contact List */}
          <div className="w-80 border-r border-border flex flex-col">
            <div className="p-4">
              <div className="relative">
                <Input placeholder="Search messages..." className="pr-10" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex gap-4 px-4 pb-3 border-b border-border">
              <button 
                onClick={() => setActiveTab("all")} 
                className={`text-sm font-medium pb-1 ${
                  activeTab === "all" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab("unread")} 
                className={`text-sm font-medium pb-1 ${
                  activeTab === "unread" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                Unread
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedContact(i)}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors ${
                    selectedContact === i ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                      {c.initials || c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground truncate">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-muted-foreground truncate">{c.preview}</span>
                      {c.unread > 0 ? (
                        <span className="ml-2 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                          {c.unread}
                        </span>
                      ) : (
                        <span className="text-muted-foreground ml-2 text-xs">✓✓</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                  HR
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">HR Department</p>
                  <p className="text-xs text-muted-foreground">Last Seen 2 min ago</p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.type === "sent" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[70%]">
                    {m.type === "sent" && (
                      <div className="bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl rounded-br-sm">
                        <p className="text-sm">{m.text}</p>
                        <p className="text-[10px] text-primary-foreground/70 text-right mt-1">{m.time} ✓✓</p>
                      </div>
                    )}
                    {m.type === "received" && (
                      <div className="bg-muted px-4 py-2.5 rounded-2xl rounded-bl-sm">
                        <p className="text-sm text-foreground">{m.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <Smile className="w-3 h-3 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 p-4 border-t border-border">
              <button 
                onClick={() => setShowAttachment(!showAttachment)} 
                className="text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <Input placeholder="Type your message here..." className="flex-1" />
              <Button size="icon" className="rounded-full w-10 h-10 bg-primary">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </EmployeeSidebarLayout>
  );
};

export default EmployeeMessagesList;
