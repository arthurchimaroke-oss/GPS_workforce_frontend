import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/auth/Logo";
import CurvedBackground from "@/components/auth/CurvedBackground";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  return (
    <CurvedBackground>
      <div className="bg-card rounded-2xl shadow-lg p-8 space-y-6">
        <Logo className="justify-center" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Email Reset</h1>
          <h6 className="text-base text-foreground">An email has been sent to your email, if email exists</h6>


        </div>


      </div>
    </CurvedBackground>
  );
};

export default OtpVerification;
