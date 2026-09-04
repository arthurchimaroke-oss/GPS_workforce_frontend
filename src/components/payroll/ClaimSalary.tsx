import { useState } from 'react';
import { CheckCircle2, Clock, DollarSign, Loader2, ArrowDownLeft, CreditCard, Globe, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SaaSPayrollDatabase } from '@/lib/saasPayrollDatabase';
import { cn } from '@/lib/utils';

export function ClaimSalary() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingClaim, setProcessingClaim] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageToEmployer, setMessageToEmployer] = useState('');
  const [selectedDisbursementId, setSelectedDisbursementId] = useState<string | null>(null);
  
  // Mock employee ID (in real app, this comes from auth)
  const employeeId = 'EMP-001';
  
  // Fetch data from SaaS database
  const employee = SaaSPayrollDatabase.getEmployee(employeeId);
  const pendingClaims = SaaSPayrollDatabase.getEmployeePendingClaims(employeeId);
  const allClaims = SaaSPayrollDatabase.getEmployeeAllClaims(employeeId);
  
  const totalPending = pendingClaims.reduce((sum, claim) => sum + claim.netAmount, 0);

  const handleClaimSuccess = (disbursementId: string, amount: number, currency: string) => {
    const txRef = `CLAIM-${Date.now()}-${disbursementId}`;
    SaaSPayrollDatabase.updateDisbursementStatus(disbursementId, 'claimed');
    
    // Create notification for employer
    SaaSPayrollDatabase.createNotification({
      id: `NOTIF-CLAIM-${Date.now()}`,
      type: 'claim_request',
      from: 'employee',
      to: 'employer',
      fromId: employeeId,
      toId: employee?.employerId || '',
      disbursementId,
      title: `${employee?.name} Claimed Salary`,
      message: `${employee?.name} has claimed their salary of ${currency} ${amount.toLocaleString()}. Transaction: ${txRef}`,
      amount,
      currency,
      status: 'unread',
      createdAt: new Date().toISOString(),
    });
    
    toast({ 
      title: 'Salary claimed successfully!', 
      description: `${currency} ${amount.toLocaleString()} will be transferred to your ${employee?.bankDetails.bankName} account. Ref: ${txRef}` 
    });
    
    window.location.reload();
  };

  const handleSendMessage = () => {
    if (!selectedDisbursementId || !messageToEmployer.trim()) return;
    
    SaaSPayrollDatabase.createNotification({
      id: `NOTIF-MSG-${Date.now()}`,
      type: 'claim_request',
      from: 'employee',
      to: 'employer',
      fromId: employeeId,
      toId: employee?.employerId || '',
      disbursementId: selectedDisbursementId,
      title: `Message from ${employee?.name}`,
      message: messageToEmployer,
      status: 'unread',
      createdAt: new Date().toISOString(),
      employeeResponse: messageToEmployer,
    });
    
    toast({ title: 'Message sent to employer', description: 'Your employer will review your message.' });
    setShowMessageModal(false);
    setMessageToEmployer('');
    setSelectedDisbursementId(null);
  };

  return (
    <div className="space-y-6">
      {/* Employee Info Header */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border border-blue-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">My Salary Claims</h2>
            <p className="text-sm text-zinc-500 mt-1">
              {employee?.name} • {employee?.location} • Prefers {employee?.preferredCurrency}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-zinc-600">
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Claim Frequency: <strong className="uppercase">{employee?.claimFrequency}</strong></span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                <span>Bank: <strong>{employee?.bankDetails.bankName}</strong></span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500 mb-1">Total Earned</p>
            <p className="text-2xl font-black text-zinc-900">${employee?.totalEarned.toLocaleString()}</p>
            <p className="text-xs text-zinc-500 mt-1">Claimed: ${employee?.totalClaimed.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Pending Amount Card */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Pending to Claim</p>
            </div>
            <p className="text-4xl font-black text-zinc-900">
              {employee?.preferredCurrency === 'USD' ? '$' : ''}{totalPending.toLocaleString()}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {pendingClaims.length} disbursement(s) ready in {employee?.preferredCurrency}
            </p>
          </div>
          {pendingClaims.length > 0 && (
            <button
              onClick={() => {
                setIsProcessing(true);
                setTimeout(() => {
                  pendingClaims.forEach(claim => {
                    handleClaimSuccess(claim.id, claim.netAmount, claim.currency);
                  });
                  setIsProcessing(false);
                }, 2000);
              }}
              disabled={isProcessing}
              className={cn(
                'px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-100 disabled:opacity-50',
                isProcessing && 'cursor-not-allowed'
              )}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowDownLeft className="w-5 h-5" />
                  Claim All ({employee?.preferredCurrency} {totalPending.toLocaleString()})
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* No Pending Claims */}
      {pendingClaims.length === 0 && allClaims.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-zinc-200">
          <DollarSign className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="font-bold text-zinc-900">No salary disbursements yet</h3>
          <p className="text-sm text-zinc-500 mt-1">Your employer hasn't processed any payroll runs for you yet.</p>
        </div>
      )}

      {pendingClaims.length === 0 && allClaims.length > 0 && (
        <div className="text-center py-8 bg-emerald-50 rounded-2xl border border-emerald-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="font-bold text-emerald-900">All salaries claimed!</h3>
          <p className="text-sm text-emerald-700 mt-1">You've claimed all your pending disbursements.</p>
        </div>
      )}

      {/* Pending Claims */}
      {pendingClaims.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">
            Ready to Claim ({pendingClaims.length})
          </h3>

          {pendingClaims.map((claim) => (
            <div key={claim.id} className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-emerald-200 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">Payroll Run #{claim.payrollRunId.slice(-6)}</p>
                    <p className="text-sm text-zinc-500">
                      {new Date(claim.payrollDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    {claim.currency !== 'USD' && (
                      <p className="text-xs text-blue-600 mt-1">
                        Original: ${claim.amount.toLocaleString()} USD → {claim.currency} {claim.netAmount.toLocaleString()} (Rate: {claim.exchangeRate})
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-black text-zinc-900">
                      {claim.currency === 'USD' ? '$' : ''}{claim.netAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-emerald-600 font-bold">Ready</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedDisbursementId(claim.id);
                        setShowMessageModal(true);
                      }}
                      className="p-2.5 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
                      title="Send message to employer"
                    >
                      <MessageSquare className="w-4 h-4 text-zinc-600" />
                    </button>
                    <button
                      onClick={() => {
                        setProcessingClaim(claim.id);
                        setTimeout(() => {
                          handleClaimSuccess(claim.id, claim.netAmount, claim.currency);
                          setProcessingClaim(null);
                        }, 2000);
                      }}
                      disabled={processingClaim === claim.id}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {processingClaim === claim.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CreditCard className="w-4 h-4" />
                      )}
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Claimed History */}
      {allClaims.filter(c => c.status === 'claimed').length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">
            Claimed History ({allClaims.filter(c => c.status === 'claimed').length})
          </h3>

          {allClaims.filter(c => c.status === 'claimed').map((claim) => (
            <div key={claim.id} className="bg-white border border-emerald-200 rounded-xl p-5 opacity-75">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">Payroll Run #{claim.payrollRunId.slice(-6)}</p>
                    <p className="text-sm text-zinc-500">
                      {new Date(claim.payrollDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black text-zinc-900">
                    {claim.currency === 'USD' ? '$' : ''}{claim.netAmount.toLocaleString()} {claim.currency}
                  </p>
                  <p className="text-xs text-emerald-600 font-bold">Claimed</p>
                  {claim.claimedAt && (
                    <p className="text-[10px] text-zinc-400">
                      {new Date(claim.claimedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message to Employer Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Message to Employer</h3>
              <button onClick={() => setShowMessageModal(false)} className="p-1 hover:bg-zinc-100 rounded-lg">
                <Clock className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                <strong>Regarding:</strong> Payroll disbursement claim
              </p>
            </div>

            <textarea
              value={messageToEmployer}
              onChange={(e) => setMessageToEmployer(e.target.value)}
              placeholder="Write your message to the employer regarding this claim..."
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
              rows={4}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-xl font-medium text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageToEmployer.trim()}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
