import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

const PaymentCheckout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Left - Summary */}
      <div className="w-1/2 bg-primary p-12 flex flex-col justify-between text-primary-foreground">
        <div>
          <button onClick={() => navigate(-1)} className="mb-8 text-primary-foreground/80 hover:text-primary-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <p className="text-sm opacity-80 mb-2">Subscribe to Engage Plans</p>
          <h1 className="text-4xl font-bold mb-1">US$72,00</h1>
          <p className="text-sm opacity-70">PER TAHUN</p>
        </div>

        <div className="space-y-4 mt-12">
          <div className="border-t border-primary-foreground/20 pt-4">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Engage Plan</p>
                <p className="text-xs opacity-70">Billed annually</p>
              </div>
              <div className="text-right">
                <p>US$72,00</p>
                <p className="text-xs opacity-70">US$72.00 per employee</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-4 flex justify-between text-sm">
            <span>Sub Total</span>
            <span>US$72,00</span>
          </div>
          <div className="border-t border-primary-foreground/20 pt-4 flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <span>Promo Code</span>
              <span className="text-[10px] bg-primary-foreground/20 px-2 py-0.5 rounded font-medium">INPUT CODE</span>
            </div>
            <span>$0</span>
          </div>
          <div className="border-t border-primary-foreground/20 pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>US$72,00</span>
          </div>
        </div>

        <p className="text-xs opacity-50 mt-auto pt-12">© 2025 HRDashboard. All rights reserved.</p>
      </div>

      {/* Right - Payment Form */}
      <div className="w-1/2 p-12 bg-background flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Pay with card</h2>
        <p className="text-sm text-muted-foreground mb-8">Email : contact@unpixel.com</p>

        <div className="space-y-5 max-w-md">
          <div className="space-y-2">
            <Label>Card Information <span className="text-destructive">*</span></Label>
            <Input placeholder="1234 1234 1234 1234" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="BB/TT" />
              <Input placeholder="CVC" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Name On Card <span className="text-destructive">*</span></Label>
            <Input placeholder="Input your full name" />
          </div>

          <div className="space-y-2">
            <Label>Address <span className="text-destructive">*</span></Label>
            <Select defaultValue="indonesia">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="indonesia">Indonesia</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Address" />
            <Select>
              <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="jakarta">Jakarta</SelectItem>
                <SelectItem value="bandung">Bandung</SelectItem>
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-3">
              <Select>
                <SelectTrigger><SelectValue placeholder="Province" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="jawa-barat">Jawa Barat</SelectItem>
                  <SelectItem value="dki">DKI Jakarta</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Code" />
            </div>
          </div>

          <Button className="w-full" size="lg">Subscribe</Button>
          <p className="text-xs text-muted-foreground text-center">
            By confirming your subscription, you authorize HRDashboard Inc. charge your card for this payment and future payments according to their terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;
