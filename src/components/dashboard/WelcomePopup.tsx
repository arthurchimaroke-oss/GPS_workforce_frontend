import { useState } from "react";
import { X } from "lucide-react";

interface WelcomePopupProps {
  onClose: () => void;
}

const WelcomePopup = ({ onClose }: WelcomePopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-xl">
        {/* Celebration illustration */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-hr-teal flex items-center justify-center relative">
            <span className="text-white text-4xl">✳</span>
            {/* Confetti dots */}
            <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-blue-400" />
            <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-yellow-400" />
            <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded bg-pink-400 rotate-45" />
            <div className="absolute top-0 -right-3 w-2 h-2 rounded bg-hr-teal/50 rotate-12" />
            <div className="absolute -bottom-2 right-2 w-3 h-1 rounded bg-orange-400 -rotate-12" />
            <div className="absolute top-4 -left-4 w-1.5 h-1.5 rounded-full bg-green-300" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome to HRDashboard!
        </h2>
        <p className="text-hr-text-light mb-6">
          Enjoy the convenience of managing your company's employees!
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-lg bg-hr-navy text-white font-medium hover:opacity-90 transition-opacity"
        >
          Let's Go!
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
