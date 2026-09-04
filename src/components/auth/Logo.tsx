import { Link } from "react-router-dom";

const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/sign-in" className={`flex items-center gap-2 ${className}`}>
    <div className="w-8 h-8 bg-hr-teal rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-lg">H</span>
    </div>
    <span className="text-xl font-bold text-foreground">HRDashboard</span>
  </Link>
);

export default Logo;
