import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MoreVertical, Play, Smile, Paperclip, Mic, Users, Building2, FileText, Image } from "lucide-react";

const contacts = [
  { name: "Davis Rosser", preview: "Sure! let me tell you about what w...", time: "2 m Ago", online: true, unread: 2, avatar: null },
  { name: "Emerson Levin", preview: "You : Find out who is in charge of thi...", time: "2 m Ago", online: true, unread: 0, avatar: null },
  { name: "Lydia Franci", preview: "You : Sure! let me tell you about w...", time: "2 m Ago", online: true, unread: 0, avatar: null },
  { name: "Miracle Botosh", preview: "You : Sure! let me tell you about w...", time: "2 m Ago", online: true, unread: 0, avatar: null, initials: "MB" },
  { name: "Zaire Mango", preview: "Sure! let me tell you about what we can...", time: "2 m Ago", online: true, unread: 0, avatar: null },
  { name: "Ashlynn Bergson", preview: "You : Sure! let me tell you about w...", time: "2 m Ago", online: false, unread: 0, avatar: null },
  { name: "Kierra Calzoni", preview: "You : Sure! let me tell you about w...", time: "2 m Ago", online: true, unread: 0, avatar: null, initials: "KC" },
];

const messages = [
  { type: "sent", text: "Hello Marilyn! consectetur adipiscing elit ames.", time: "09:10" },
  { type: "received", text: "Fames eros urna, felis morbi a est est.", time: "09:40" },
  { type: "received-audio", duration: "00:24", time: "09:40" },
  { type: "sent", text: "How confident are we on presenting this?", time: "09:50" },
  { type: "sent-image", caption: "Find out who is in charge of this portion of the process.", time: "10:00" },
];

const MessagesList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedContact, setSelectedContact] = useState(0);
  const [showAttachment, setShowAttachment] = useState(false);

  return (
    <SidebarLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Message</h1>

        <div className="flex gap-0 h-[calc(100vh-180px)] bg-card rounded-xl border border-border overflow-hidden">
          {/* Contact List */}
          <div className="w-80 border-r border-border flex flex-col">
            <div className="p-4">
              <div className="relative">
                <Input placeholder="Search message..." className="pr-10" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex gap-4 px-4 pb-3 border-b border-border">
              <button onClick={() => setActiveTab("all")} className={`text-sm font-medium pb-1 ${activeTab === "all" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>All</button>
              <button onClick={() => setActiveTab("unread")} className={`text-sm font-medium pb-1 ${activeTab === "unread" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>Unread</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedContact(i)}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors ${selectedContact === i ? "bg-muted/50" : ""}`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                      {c.initials || c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-card" />}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground truncate">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-muted-foreground truncate">{c.preview}</span>
                      {c.unread > 0 ? (
                        <span className="ml-2 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">{c.unread}</span>
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
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">MG</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Marilyn George</p>
                  <p className="text-xs text-muted-foreground">Last Seen 09:40</p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.type.startsWith("sent") ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] ${m.type.startsWith("sent") ? "" : ""}`}>
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
                    {m.type === "received-audio" && (
                      <div>
                        <div className="bg-muted px-4 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-3">
                          <Play className="w-4 h-4 text-foreground" />
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 20 }).map((_, j) => (
                              <div key={j} className="w-0.5 bg-primary rounded-full" style={{ height: `${Math.random() * 16 + 4}px` }} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{m.duration}</span>
                          <Smile className="w-3 h-3 text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[10px] text-muted-foreground">{m.time}</span>
                          <span className="text-sm">👋</span>
                        </div>
                        <div className="flex gap-1 mt-1">
                          {["😁", "😀", "❤️", "👍", "👋"].map((e) => (
                            <span key={e} className="text-lg">{e}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {m.type === "sent-image" && (
                      <div>
                        <div className="bg-primary rounded-2xl rounded-br-sm overflow-hidden">
                          <div className="w-64 h-36 bg-primary/80 flex items-center justify-center text-primary-foreground/50 text-xs">
                            [Meeting Photo]
                          </div>
                          <div className="px-4 py-2">
                            <p className="text-xs text-primary-foreground/90">{m.caption}</p>
                            <p className="text-[10px] text-primary-foreground/70 text-right mt-1">{m.time} ✓✓</p>
                          </div>
                        </div>
                        <div className="text-right mt-1">
                          <span className="text-sm">😍</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Attachment Menu */}
            {showAttachment && (
              <div className="absolute bottom-20 left-1/2 flex flex-col gap-2">
                {[
                  { icon: Users, color: "bg-accent" },
                  { icon: Building2, color: "bg-accent" },
                  { icon: FileText, color: "bg-accent" },
                  { icon: Image, color: "bg-accent" },
                ].map((item, i) => (
                  <button key={i} className={`w-10 h-10 rounded-full ${item.color} text-accent-foreground flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-3 p-4 border-t border-border">
              <button onClick={() => setShowAttachment(!showAttachment)} className="text-muted-foreground hover:text-foreground">
                <Paperclip className="w-5 h-5" />
              </button>
              <Input placeholder="Write message here..." className="flex-1" />
              <Button size="icon" className="rounded-full w-10 h-10 bg-primary">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default MessagesList;
