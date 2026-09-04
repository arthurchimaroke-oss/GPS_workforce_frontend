const CurvedBackground = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
    {/* Decorative curved lines */}
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04]"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
    >
      <path d="M0 300 Q 360 150 720 300 T 1440 300" stroke="hsl(var(--hr-teal))" strokeWidth="2" fill="none" />
      <path d="M0 400 Q 360 250 720 400 T 1440 400" stroke="hsl(var(--hr-teal))" strokeWidth="2" fill="none" />
      <path d="M0 500 Q 360 350 720 500 T 1440 500" stroke="hsl(var(--hr-teal))" strokeWidth="2" fill="none" />
      <path d="M0 600 Q 360 450 720 600 T 1440 600" stroke="hsl(var(--hr-navy))" strokeWidth="1.5" fill="none" />
      <path d="M0 200 Q 360 50 720 200 T 1440 200" stroke="hsl(var(--hr-navy))" strokeWidth="1.5" fill="none" />
    </svg>
    <div className="relative z-10 w-full max-w-md">{children}</div>
  </div>
);

export default CurvedBackground;
