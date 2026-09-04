import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import CurvedBackground from "@/components/auth/CurvedBackground";

const PasswordSuccess = () => (
  <CurvedBackground>
    <div className="bg-card rounded-2xl shadow-lg p-8 space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-hr-teal/10 flex items-center justify-center relative">
          <CheckCircle2 className="w-12 h-12 text-hr-teal" />
          {/* Confetti dots */}
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400" />
          <span className="absolute -top-2 left-3 w-1.5 h-1.5 rounded-full bg-hr-teal" />
          <span className="absolute top-0 -left-2 w-2 h-2 rounded-full bg-blue-400" />
          <span className="absolute -bottom-1 -right-2 w-1.5 h-1.5 rounded-full bg-pink-400" />
          <span className="absolute -bottom-2 left-1 w-2 h-2 rounded-full bg-orange-400" />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground">You successfully changed your password</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Please remember to keep your password safe and secure
        </p>
      </div>

      <Button asChild className="w-full bg-hr-navy hover:bg-hr-navy/90 text-white font-semibold h-11">
        <Link to="/sign-in">Back to Login</Link>
      </Button>
    </div>
  </CurvedBackground>
);

export default PasswordSuccess;
