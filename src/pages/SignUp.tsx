import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/auth/PasswordInput";
import SocialButtons from "@/components/auth/SocialButtons";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-hr-teal rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-xl font-bold text-foreground">HRDashboard</span>
        </div>

        <div className="max-w-sm mx-auto w-full flex-1 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-foreground mb-1">Create an Account</h1>
          <p className="text-muted-foreground mb-8">Get started with HRDashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-hr-gray focus:border-hr-teal focus:ring-hr-teal"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Work Email</label>
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-hr-gray focus:border-hr-teal focus:ring-hr-teal"
              />
            </div>

            <PasswordInput
              placeholder="Create a password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full bg-hr-navy hover:bg-hr-navy/90 text-white font-semibold h-11"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <SocialButtons action="Sign up" />
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-hr-teal font-medium hover:underline">
            Login Here
          </Link>
        </p>
      </div>

      {/* Right - Dashboard preview */}
      <div className="hidden lg:flex lg:w-1/2 bg-hr-teal relative flex-col items-center justify-center p-12">
        <img
          src={dashboardPreview}
          alt="Dashboard preview"
          className="rounded-xl shadow-2xl max-w-full"
        />
        <p className="text-white/90 text-lg mt-8 text-center font-medium">
          Let's empower your employees today
        </p>
      </div>
    </div>
  );
};

export default SignUp;
