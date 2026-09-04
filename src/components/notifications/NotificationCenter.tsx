import { useState } from 'react';
import { Bell, CheckCircle2, Clock, MessageSquare, Send, X, DollarSign, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SaaSPayrollDatabase } from '@/lib/saasPayrollDatabase';
import { cn } from '@/lib/utils';

interface NotificationCenterProps {
  userId: string;
  userType: 'employer' | 'employee';
}

export function NotificationCenter({ userId, userType }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedNotifId, setSelectedNotifId] = useState<string | null>(null);

  const notifications = SaaSPayrollDatabase.getUserNotifications(userId, userType);
  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const handleMarkAsRead = (notifId: string) => {
    SaaSPayrollDatabase.markNotificationAsRead(notifId);
    window.location.reload();
  };

  const handleReply = () => {
    if (!selectedNotifId || !replyMessage.trim()) return;

    const notif = notifications.find(n => n.id === selectedNotifId);
    if (!notif) return;

    SaaSPayrollDatabase.createNotification({
      id: `NOTIF-REPLY-${Date.now()}`,
      type: notif.type,
      from: userType,
      to: userType === 'employer' ? 'employee' : 'employer',
      fromId: userId,
      toId: userType === 'employer' ? notif.fromId : notif.toId,
      disbursementId: notif.disbursementId,
      payrollRunId: notif.payrollRunId,
      title: `Re: ${notif.title}`,
      message: replyMessage,
      status: 'unread',
      createdAt: new Date().toISOString(),
      employerResponse: userType === 'employer' ? replyMessage : notif.employerResponse,
      employeeResponse: userType === 'employee' ? replyMessage : notif.employeeResponse,
    });

    setReplyMessage('');
    setSelectedNotifId(null);
    window.location.reload();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'claim_processed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'claim_failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'claim_request':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-zinc-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'claim_processed':
        return 'border-emerald-200 bg-emerald-50';
      case 'claim_failed':
        return 'border-red-200 bg-red-50';
      case 'claim_request':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-zinc-200 bg-white';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-zinc-100 rounded-xl transition-colors"
      >
        <Bell className="w-5 h-5 text-zinc-600" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </div>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-[100]"
          >
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <h3 className="font-bold text-zinc-900">Notifications</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-zinc-200 rounded-lg">
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                  <p className="text-sm text-zinc-500">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        'p-4 border-l-4 transition-all hover:shadow-md cursor-pointer',
                        getNotificationColor(notif.type),
                        notif.status === 'unread' ? 'border-l-zinc-900' : 'border-l-zinc-300 opacity-75'
                      )}
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <p className="text-sm font-bold text-zinc-900">{notif.title}</p>
                            {notif.status === 'unread' && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-zinc-600 mt-1">{notif.message}</p>
                          
                          {notif.amount && (
                            <div className="flex items-center gap-1 mt-2 text-xs font-bold text-zinc-900">
                              <DollarSign className="w-3 h-3" />
                              <span>{notif.currency} {notif.amount.toLocaleString()}</span>
                            </div>
                          )}

                          {(notif.employerResponse || notif.employeeResponse) && (
                            <div className="mt-2 p-2 bg-white rounded-lg border border-zinc-200">
                              <p className="text-[10px] text-zinc-500 font-bold uppercase">
                                {userType === 'employer' ? 'Your Response' : 'Employer Response'}
                              </p>
                              <p className="text-xs text-zinc-700 mt-1">
                                {userType === 'employer' ? notif.employerResponse : notif.employeeResponse}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] text-zinc-400">
                              {new Date(notif.createdAt).toLocaleString()}
                            </span>
                            {!notif.employerResponse && !notif.employeeResponse && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedNotifId(notif.id);
                                }}
                                className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1"
                              >
                                <MessageSquare className="w-3 h-3" />
                                Reply
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply Modal */}
      {selectedNotifId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Reply to Message</h3>
              <button onClick={() => setSelectedNotifId(null)} className="p-1 hover:bg-zinc-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply..."
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
              rows={4}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedNotifId(null)}
                className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-xl font-medium text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={!replyMessage.trim()}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Reply
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
