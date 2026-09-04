# Web3 Integration Guide for PayFlow HR

## ✅ Installed Packages

| Package | Purpose |
|---------|---------|
| `viem@^2.21.0` | TypeScript Ethereum library (lighter & faster than ethers.js) |
| `wagmi@^2.12.0` | React hooks for wallet connection |
| `@web3modal/wagmi@^5.1.0` | WalletConnect modal for wallet connection UI |
| `@web3modal/ui@^5.1.0` | WalletConnect UI components |
| `@ramp-network/ramp-instant-sdk` | **Ramp Network** — Fiat → USDT on-ramp (FREE, 0.49% fee) |

## 📁 Created Files

```
payflow-hr/src/
├── config/
│   ├── web3.ts              # Wagmi config + Web3Modal initialization
│   └── metadata.ts          # App metadata for wallet connection
├── providers/
│   └── Web3Provider.tsx     # App-wide Web3 context provider
├── lib/
│   └── queryClient.ts       # TanStack Query client (shared with wagmi)
├── hooks/
│   ├── useWallet.ts         # Wallet connection, balance, chain switching hooks
│   └── useUSDTTransfer.ts   # USDT transfer hook for disbursements/claims
└── components/
    └── web3/
        ├── WalletButton.tsx      # Connect wallet button component
        └── RampOnRamp.tsx       # Ramp Network fiat → USDT on-ramp
```

## 💰 Ramp Network — Why It's Better

| Feature | Ramp | Transak | MoonPay |
|---------|------|---------|---------|
| **Integration Cost** | ✅ FREE | FREE | FREE |
| **Bank Transfer Fee** | **0.49%** (lowest) | 1.5% | ~1% |
| **Card Fee** | 1.5% | 4.5% | 4.5% |
| **USDT on Polygon** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Open Source SDK** | ✅ Yes | ❌ No | ❌ No |
| **KYC** | Built-in | Built-in | Built-in |

**No monthly fees. No setup fees. Pay only per transaction.**

## 🔧 Usage Examples

### 1. Connect Wallet
```tsx
import { useWallet } from '@/hooks/useWallet';
import { WalletButton } from '@/components/web3/WalletButton';

function MyComponent() {
  const { address, isConnected, connectWallet } = useWallet();
  
  return (
    <div>
      {isConnected ? (
        <p>Connected: {address}</p>
      ) : (
        <WalletButton />
      )}
    </div>
  );
}
```

### 2. Buy USDT with Ramp (Fiat On-Ramp)
```tsx
import { RampOnRamp } from '@/components/web3/RampOnRamp';
import { useWallet } from '@/hooks/useWallet';

function FundTreasury() {
  const { address } = useWallet();

  return (
    <div>
      <h2>Fund Your Treasury</h2>
      <RampOnRamp walletAddress={address} />
    </div>
  );
}
```

### 3. Check USDT Balance
```tsx
import { useUSDTBalance } from '@/hooks/useWallet';

function BalanceDisplay() {
  const { address } = useWallet();
  const { balance, symbol, isLoading } = useUSDTBalance(address);
  
  if (isLoading) return <span>Loading...</span>;
  return <span>{balance} {symbol}</span>;
}
```

### 4. Send USDT (Employer Disbursement)
```tsx
import { useUSDTTransfer } from '@/hooks/useUSDTTransfer';
import { useToast } from '@/hooks/use-toast';

function DisburseSalary() {
  const { toast } = useToast();
  const { transfer, isPending, isConfirmed } = useUSDTTransfer({
    onSuccess: (hash) => {
      toast({ title: 'Salary disbursed!', description: `TX: ${hash}` });
    },
    onError: (error) => {
      toast({ title: 'Transfer failed', description: error.message });
    },
  });

  return (
    <button
      onClick={() => transfer('0xEmployeeWalletAddress', '1500.00')}
      disabled={isPending}
    >
      {isPending ? 'Processing...' : 'Disburse $1,500 USDT'}
    </button>
  );
}
```

## 🌐 Supported Chains

| Chain | USDT Address | Why |
|-------|--------------|-----|
| **Polygon** | `0xc2132D05D31c914a87C6611C10748AEb04B58e8F` | Default — fees ~$0.01 |
| **Base** | `0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2` | Coinbase L2 — cheap & fast |
| **Arbitrum** | `0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9` | Popular L2 |

## 🔑 Environment Variables

`.env` already configured with:
```env
VITE_WALLETCONNECT_PROJECT_ID = 571b91bedb65790d89fa438505f6398a

# Ramp Network
VITE_RAMP_APP_ID = YOUR_RAMP_APP_ID
VITE_RAMP_API_KEY = YOUR_RAMP_API_KEY
```

### Get Ramp Credentials (FREE):
1. Go to https://ramp.network
2. Click "Get Started" → "For Businesses"
3. Fill out the partner form (or email partners@ramp.network)
4. You'll receive an **App ID** and **API Key**
5. Add them to `.env`

**Note**: Ramp works in demo mode without API keys — you can test the widget immediately.

## 💡 Transaction Flow

**Employer Funds Treasury:**
1. Connect wallet → `WalletButton`
2. Click "Buy USDT with Ramp" → Opens Ramp widget
3. Pay with card/bank (Apple Pay, Google Pay, SEPA, etc.)
4. USDT deposited directly to wallet on Polygon

**Employer Disburses Salary:**
1. Connect wallet
2. Enter employee wallet address + amount
3. Call `transfer(employeeAddress, amount)` → Signs tx in MetaMask
4. Transaction confirmed on-chain (~2-5 seconds on Polygon)

**Employee Claims Salary:**
1. Connect wallet
2. View pending salary in dashboard
3. Click "Claim" → Calls smart contract claim function
4. USDT transferred to employee wallet

## 🚀 Next Steps

1. ✅ ~~Install packages~~ — Done
2. ✅ ~~Configure Web3 provider~~ — Done
3. 🔲 Get Ramp App ID → https://ramp.network (works without for testing)
4. 🔲 Update UI components to use `WalletButton` and `RampOnRamp`
5. 🔲 Deploy Smart Contracts (Solidity payroll contract for claims)
