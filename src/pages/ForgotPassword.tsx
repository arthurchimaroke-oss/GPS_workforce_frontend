import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/auth/Logo";
import CurvedBackground from "@/components/auth/CurvedBackground";
import { useAuth } from "@/components/context/authContext";

const ForgotPassword = () => {
  const {forgotPassword} = useAuth()
  const [email, setEmail] = useState("");
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    try{
      setLoading(true)
      e.preventDefault();
      await forgotPassword({email})
      navigate("/otp-verification");

    }
    catch(error){

    }
    finally{
      setLoading(false)
    }
  };

  return (
    <CurvedBackground>
      <div className="bg-card rounded-2xl shadow-lg p-8 space-y-6">
        <Logo className="justify-center" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Enter the email associated with your account and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Registered Email</label>
            <Input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-hr-gray focus:border-hr-teal focus:ring-hr-teal"
            />
          </div>

          <div className="space-y-3">
            <Button type="submit" className="w-full bg-hr-navy hover:bg-hr-navy/90 text-white font-semibold h-11"
            disabled = {loading}
            >
              {!loading ? "Send Reset Link" : "Sending reset link..."}
            </Button>
            <Button asChild variant="outline" className="w-full border-hr-navy text-hr-navy hover:bg-hr-navy hover:text-white h-11">
              <Link to="/sign-in">Back to Login</Link>
            </Button>
          </div>
        </form>
      </div>
    </CurvedBackground>
  );
};

export default ForgotPassword;
