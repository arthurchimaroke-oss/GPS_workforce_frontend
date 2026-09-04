import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExpenseCreate = () => {
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <div className="space-y-6 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>

        <div>
          <h1 className="text-2xl font-bold text-foreground">New Expense Claim</h1>
          <p className="text-muted-foreground text-sm mt-1">Submit a new expense for approval</p>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Expense Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="meals">Meals & Entertainment</SelectItem>
                    <SelectItem value="software">Software & Subscriptions</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="office">Office Supplies</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <Input type="number" placeholder="0.00" className="pl-7" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date of Expense</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe the expense..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Receipt / Attachment</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <Receipt className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Drag and drop your receipt here, or</p>
                <Button variant="outline" size="sm" className="mt-2"><Upload className="w-4 h-4 mr-2" /> Browse Files</Button>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG, PDF up to 5MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button>Submit Expense</Button>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ExpenseCreate;
