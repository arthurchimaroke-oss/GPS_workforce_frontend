
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const PayrollDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/payroll")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ChevronLeft className="w-5 h-5" />
        <h1 className="text-2xl font-bold">Detail Payroll</h1>
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
            PC
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Pristia Candra</h2>
            <p className="text-sm text-gray-600">3D Designer</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Total Compensation</p>
          <p className="text-xl font-bold">$3,729.00</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Salary</p>
          <p className="text-xl font-bold">$3,500.00</p>
        </div>
      </div>
    </div>
  );
};

export default PayrollDetail;
