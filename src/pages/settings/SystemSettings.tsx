import { useEffect, useMemo, useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import {
  Eye,
  Loader2,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
  CreditCard,
  Calendar,
  Package,
  AlertCircle,
  CheckCircle2,
  Clock,
  Building2,
  ShoppingCart,
  RefreshCw,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  organizationApi,
  subscriptionApi,
  type CompanyEntity,
  type CompanyUser,
  type EntityAdministrator,
  type MakeEntityAdministratorPayload,
  type UpdateEntityPayload,
  type PlatformModule,
  type CompanySubscription,
  type SubscriptionCheckoutPurpose,
  type SubscriptionCheckoutPayload,
} from "@/lib/api";
import { useAuth } from "@/components/context/authContext";
import { useNavigate } from "react-router-dom";

// ENTITY TYPES & HELPERS
type EntityForm = {
  entity_name: string;
  registration_number: string;
  tax_identifier: string;
  country: string;
  currency: string;
  state: string;
  city: string;
  address: string;
  email: string;
  phone: string;
};

const emptyForm: EntityForm = {
  entity_name: "",
  registration_number: "",
  tax_identifier: "",
  country: "",
  currency: "",
  state: "",
  city: "",
  address: "",
  email: "",
  phone: "",
};

const formToCreatePayload = (form: EntityForm) => ({
  entity_name: form.entity_name,
  registration_number: form.registration_number || undefined,
  tax_identifier: form.tax_identifier || undefined,
  country: form.country,
  currency: form.currency,
  state: form.state || undefined,
  city: form.city || undefined,
  address: form.address || undefined,
});

const formToUpdatePayload = (form: EntityForm): UpdateEntityPayload => ({
  entity_name: form.entity_name || undefined,
  registration_number: form.registration_number || undefined,
  tax_identifier: form.tax_identifier || undefined,
  country: form.country || undefined,
  currency: form.currency || undefined,
  state: form.state || undefined,
  city: form.city || undefined,
  address: form.address || undefined,
  email: form.email || undefined,
  phone: form.phone || undefined,
});

const entityToForm = (entity: CompanyEntity): EntityForm => ({
  entity_name: entity.entity_name ?? "",
  registration_number: entity.registration_number ?? "",
  tax_identifier: entity.tax_identifier ?? "",
  country: entity.country ?? "",
  currency: entity.currency ?? "",
  state: entity.state ?? "",
  city: entity.city ?? "",
  address: entity.address ?? "",
  email: entity.email ?? "",
  phone: entity.phone ?? "",
});

// SUBSCRIPTION TYPES
type AddModulesForm = {
  selectedModules: string[];
};

type IncreaseEmployeesForm = {
  additionalEmployees: number;
};

type RenewForm = {
  employeeCount: number;
  subscriptionMonths: number;
  selectedModules: string[];
};

type NewSubscriptionForm = {
  email: string;
  employeeCount: number;
  subscriptionMonths: number;
  selectedModules: string[];
};

// ============================================================
// PAYMENT PROVIDERS
// ============================================================
// Add new providers here as they're integrated on the backend.
// `available: false` providers still show in the picker (so users
// know they're coming) but can't be selected yet.
type PaymentProviderId = "flutterwave" | "paystack" | "stripe" | "paypal";

interface PaymentProviderOption {
  id: PaymentProviderId;
  name: string;
  description: string;
  available: boolean;
}

const PAYMENT_PROVIDERS: PaymentProviderOption[] = [
  {
    id: "flutterwave",
    name: "Flutterwave",
    description: "Cards, bank transfer, USSD & mobile money",
    available: true,
  },
  {
    id: "paystack",
    name: "Paystack",
    description: "Cards & bank transfer",
    available: false,
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "International cards",
    available: false,
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay with your PayPal balance",
    available: false,
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

const SystemSettings = () => {
  // Auth must be guarded the same way DashboardV1 guards it: `user` is
  // `null` until checkAuth resolves, so nothing may destructure fields off
  // it until both `isLoading` is false AND `user` is non-null.
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate("/sign-in", { replace: true });
    }
  }, [user, isAuthLoading, navigate]);

  // Safe to read now: falls back to null/"" while `user` is still loading,
  // and gets the real values once it resolves (component re-renders).
  const company_id = user?.company_id ?? null;
  const email = user?.email ?? "";

  // ============================================================
  // ENTITY STATE
  // ============================================================
  const [entities, setEntities] = useState<CompanyEntity[]>([]);
  const [companyUsers, setCompanyUsers] = useState<CompanyUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<EntityForm>(emptyForm);

  const [editingEntity, setEditingEntity] = useState<CompanyEntity | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [viewingEntity, setViewingEntity] = useState<CompanyEntity | null>(null);
  const [showView, setShowView] = useState(false);
  const [entityAdmins, setEntityAdmins] = useState<EntityAdministrator[]>([]);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);

  const [deletingEntity, setDeletingEntity] = useState<CompanyEntity | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteAction, setDeleteAction] = useState<"deactivate" | "transfer">("deactivate");
  const [deleteDestinationId, setDeleteDestinationId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [managingEntity, setManagingEntity] = useState<CompanyEntity | null>(null);
  const [showManageAdmins, setShowManageAdmins] = useState(false);
  const [makeAdminForm, setMakeAdminForm] = useState({ email: "", first_name: "", last_name: "" });
  const [isMakingAdmin, setIsMakingAdmin] = useState(false);
  const [adminSource, setAdminSource] = useState<"company" | "entity" | "manual">("company");
  const [entityUsers, setEntityUsers] = useState<CompanyUser[]>([]);
  const [isLoadingEntityUsers, setIsLoadingEntityUsers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ============================================================
  // SUBSCRIPTION STATE
  // ============================================================
  const [modules, setModules] = useState<PlatformModule[]>([]);
  const [subscription, setSubscription] = useState<CompanySubscription | null>(null);
  const [futureSubscription, setFutureSubscription] = useState<CompanySubscription | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const [showAddModules, setShowAddModules] = useState(false);
  const [addModulesForm, setAddModulesForm] = useState<AddModulesForm>({ selectedModules: [] });
  const [selectedModuleDetails, setSelectedModuleDetails] = useState<PlatformModule[]>([]);
  const [isLoadingSelectedModules, setIsLoadingSelectedModules] = useState(false);

  const [showIncreaseEmployees, setShowIncreaseEmployees] = useState(false);
  const [increaseEmployeesForm, setIncreaseEmployeesForm] = useState<IncreaseEmployeesForm>({
    additionalEmployees: 0,
  });

  const [showRenew, setShowRenew] = useState(false);
  const [renewForm, setRenewForm] = useState<RenewForm>({
    employeeCount: 0,
    subscriptionMonths: 12,
    selectedModules: [],
  });

  const [showNewSubscription, setShowNewSubscription] = useState(false);
  const [newSubscriptionForm, setNewSubscriptionForm] = useState<NewSubscriptionForm>({
    email: "",
    employeeCount: 0,
    subscriptionMonths: 12,
    selectedModules: [],
  });

  const [calculatedAmount, setCalculatedAmount] = useState<number | null>(null);
  const [calculateMessage, setCalculateMessage] = useState<string | null>(null);

  // Payment provider - chosen inline on each checkout modal, defaults to Flutterwave
  const [selectedProvider, setSelectedProvider] = useState<PaymentProviderId>("flutterwave");

  // ============================================================
  // ENTITY FUNCTIONS
  // ============================================================

  const updateForm = (field: keyof EntityForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const loadEntities = async () => {
    setIsLoading(true);
    try {
      const data = await organizationApi.getAllEntities();
      setEntities(Array.isArray(data.company_entities) ? data.company_entities : []);
    } catch (error) {
      toast({
        title: "Could not load entities",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCompanyUsers = async () => {
    try {
      const users = await organizationApi.getAllCompanyUsers();
      setCompanyUsers(Array.isArray(users) ? users : []);
    } catch (error) {
      toast({
        title: "Could not load company users",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  // ============================================================
  // SUBSCRIPTION FUNCTIONS
  // ============================================================

  const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  // Load modules - response has ONLY 'modules' (no 'status')
  const loadModules = async () => {
    try {
      const response = await subscriptionApi.getModules();
      if (response && response.modules && Array.isArray(response.modules)) {
        setModules(response.modules);
        const coreModules = response.modules.filter(m => m.is_core === true);
        if (coreModules.length > 0) {
          const coreIds = coreModules.map(m => m.id);
          setNewSubscriptionForm(f => ({
            ...f,
            selectedModules: coreIds,
          }));
          setRenewForm(f => ({
            ...f,
            selectedModules: coreIds,
          }));
        }
      } else {
        setModules([]);
      }
    } catch (error) {
      toast({
        title: "Could not load modules",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
      setModules([]);
    }
  };

  // Load subscription - response is the subscription object directly
  const loadSubscription = async () => {
    setIsLoadingSubscription(true);
    try {
      const response = await subscriptionApi.getCurrent();
      if (response && response.subscription_id) {
        console.log(response)
        setSubscription(response);
        // setFutureSubscription(response.future_subscription ?? null);
      } else {
        setSubscription(null);
        setFutureSubscription(null);
      }
    } catch (error) {
      setSubscription(null);
      setFutureSubscription(null);
    } finally {
      setIsLoadingSubscription(false);
    }
  };

  const loadAllSubscriptionData = async () => {
    await Promise.all([loadModules(), loadSubscription()]);
  };

  // ✅ FIXED: Calculate price - response has total_amount directly
  const calculatePrice = async (
    purpose: SubscriptionCheckoutPurpose,
    payload: any
  ) => {
    setIsCalculating(true);
    setCalculateMessage(null);
    console.log("Currently hewre")
    try {

      const response = purpose == "add_modules" ? await subscriptionApi.calculateAddModules({

          selected_modules: payload.selected_modules || [],
          // subscription_months: payload.subscription_months || 0,
        }) : purpose == "increase_employee_count" ? await subscriptionApi.calculateEmployeePrice({
          
          employee_count: payload.employee_count || 0,
        }) : await subscriptionApi.calculateRenewPrice({
          
          selected_modules: payload.selected_modules || [],
        subscription_months: payload.subscription_months || 0,
          employee_count: payload.employee_count || 0,
      })
      // const response = await subscriptionApi.calculate({
      // });

      console.log("📊 Calculate Response:", response);

      // ✅ FIX: Response has total_amount directly (no 'status' field)
      if (response && response.total_amount) {
        const amount = typeof response.total_amount === 'string'
          ? parseFloat(response.total_amount)
          : response.total_amount;
        setCalculatedAmount(amount);

        if (response.message) {
          setCalculateMessage(response.message);
        }

        if (response.subscription_months_left !== undefined) {
          console.log(`📅 Months left: ${response.subscription_months_left}`);
        }
      } else {
        toast({
          title: "Could not calculate price",
          description: "Invalid response from server.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Could not calculate price",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  // ✅ Fetch selected module details
  const fetchSelectedModuleDetails = async (moduleIds: string[]) => {
    if (moduleIds.length === 0) {
      setSelectedModuleDetails([]);
      return;
    }

    setIsLoadingSelectedModules(true);
    try {
      // Filter from local modules list
      const details = modules.filter(m => moduleIds.includes(m.id));
      setSelectedModuleDetails(details);
    } catch (error) {
      console.error("Error fetching selected module details:", error);
      const details = modules.filter(m => moduleIds.includes(m.id));
      setSelectedModuleDetails(details);
    } finally {
      setIsLoadingSelectedModules(false);
    }
  };

  const createCheckout = async (payload: SubscriptionCheckoutPayload) => {
    setIsCheckout(true);
    try {
      const response = await subscriptionApi.checkout(payload);
      if (response.payment_link) {
        window.location.href = response.payment_link;
      } else {
        toast({
          title: "Checkout failed",
          description: response.message || "Unable to create checkout session.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckout(false);
    }
  };

  // ============================================================
  // PAYMENT PROVIDER HELPERS
  // ============================================================

  const isProviderAvailable = (id: PaymentProviderId) =>
    PAYMENT_PROVIDERS.find((p) => p.id === id)?.available ?? false;

  const getProviderName = (id: PaymentProviderId) =>
    PAYMENT_PROVIDERS.find((p) => p.id === id)?.name ?? "This provider";

  // ============================================================
  // SUBSCRIPTION ACTION HANDLERS
  // ============================================================

  // New Subscription - company_id = null
  const handleNewSubscription = async () => {
    const form = newSubscriptionForm;
    if (!form.email || form.employeeCount <= 0 || form.subscriptionMonths <= 0 || form.selectedModules.length === 0) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields and select at least one module.",
        variant: "destructive",
      });
      return;
    }

    if (!isProviderAvailable(selectedProvider)) {
      toast({
        title: `${getProviderName(selectedProvider)} is coming soon`,
        description: "This payment provider isn't live yet. Please choose a different one.",
        variant: "destructive",
      });
      return;
    }

    await createCheckout({
      purpose: "new_subscription",
      company_id: null,
      email: form.email,
      employee_count: form.employeeCount,
      subscription_months: form.subscriptionMonths,
      selected_modules: form.selectedModules,
      payment_provider: selectedProvider,
    });
  };

  // Add Modules - employee_count = 0, subscription_months = 0
  const handleAddModules = async () => {
    if (!subscription || addModulesForm.selectedModules.length === 0) {
      toast({
        title: "No modules selected",
        description: "Please select at least one module to add.",
        variant: "destructive",
      });
      return;
    }

    if (!company_id) {
      toast({
        title: "Checkout failed",
        description: "Could not determine which company this subscription belongs to.",
        variant: "destructive",
      });
      return;
    }

    if (!isProviderAvailable(selectedProvider)) {
      toast({
        title: `${getProviderName(selectedProvider)} is coming soon`,
        description: "This payment provider isn't live yet. Please choose a different one.",
        variant: "destructive",
      });
      return;
    }

    await createCheckout({
      purpose: "add_modules",
      company_id,
      email,
      employee_count: 0,
      subscription_months: 0,
      selected_modules: addModulesForm.selectedModules,
      payment_provider: selectedProvider,
    });
  };

  // Increase Employees - employee_count = additional employees
  const handleIncreaseEmployees = async () => {
    if (increaseEmployeesForm.additionalEmployees <= 0) {
      toast({
        title: "Invalid count",
        description: "Please enter a valid number of additional employees.",
        variant: "destructive",
      });
      return;
    }

    if (!company_id) {
      toast({
        title: "Checkout failed",
        description: "Could not determine which company this subscription belongs to.",
        variant: "destructive",
      });
      return;
    }

    if (!isProviderAvailable(selectedProvider)) {
      toast({
        title: `${getProviderName(selectedProvider)} is coming soon`,
        description: "This payment provider isn't live yet. Please choose a different one.",
        variant: "destructive",
      });
      return;
    }

    await createCheckout({
      purpose: "increase_employee_count",
      company_id,
      email,
      employee_count: increaseEmployeesForm.additionalEmployees,
      subscription_months: 0,
      selected_modules: [],
      payment_provider: selectedProvider,
    });
  };

  // Renew - employee_count = total desired count
  const handleRenew = async () => {
    const form = renewForm;
    if (form.employeeCount <= 0 || form.subscriptionMonths <= 0 || form.selectedModules.length === 0) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields and select at least one module.",
        variant: "destructive",
      });
      return;
    }

    if (hasFutureSubscription()) {
      toast({
        title: "Renewal already scheduled",
        description: "A future subscription already exists for this company.",
        variant: "destructive",
      });
      return;
    }

    if (!company_id) {
      toast({
        title: "Checkout failed",
        description: "Could not determine which company this subscription belongs to.",
        variant: "destructive",
      });
      return;
    }

    if (!isProviderAvailable(selectedProvider)) {
      toast({
        title: `${getProviderName(selectedProvider)} is coming soon`,
        description: "This payment provider isn't live yet. Please choose a different one.",
        variant: "destructive",
      });
      return;
    }

    await createCheckout({
      purpose: "renew_subscription",
      company_id,
      email,
      employee_count: form.employeeCount,
      subscription_months: form.subscriptionMonths,
      selected_modules: form.selectedModules,
      payment_provider: selectedProvider,
    });
  };

  // ============================================================
  // EFFECTS
  // ============================================================

  useEffect(() => {
    loadEntities();
    loadCompanyUsers();
    loadAllSubscriptionData();
  }, []);

  useEffect(() => {
    if (showRenew && renewForm.employeeCount > 0 && renewForm.selectedModules.length > 0) {
      calculatePrice("renew_subscription", {
        employee_count: renewForm.employeeCount,
        subscription_months: renewForm.subscriptionMonths,
        selected_modules: renewForm.selectedModules,
      });
    }
  }, [renewForm, showRenew]);

  useEffect(() => {
    if (showNewSubscription &&
      newSubscriptionForm.employeeCount > 0 &&
      newSubscriptionForm.selectedModules.length > 0) {
      calculatePrice("new_subscription", {
        employee_count: newSubscriptionForm.employeeCount,
        subscription_months: newSubscriptionForm.subscriptionMonths,
        selected_modules: newSubscriptionForm.selectedModules,
      });
    }
  }, [newSubscriptionForm, showNewSubscription]);

  // Live estimate for adding modules
  useEffect(() => {
    if (showAddModules && addModulesForm.selectedModules.length > 0) {
      calculatePrice("add_modules", {
        employee_count: 0,
        subscription_months: 0,
        selected_modules: addModulesForm.selectedModules,
      });
    }
  }, [addModulesForm, showAddModules]);

  // Live estimate for increasing employee count
  useEffect(() => {
    if (showIncreaseEmployees && increaseEmployeesForm.additionalEmployees > 0) {
      calculatePrice("increase_employee_count", {
        employee_count: increaseEmployeesForm.additionalEmployees,
        subscription_months: 0,
        selected_modules: [],
      });
    }
  }, [increaseEmployeesForm, showIncreaseEmployees]);

  // Clear selected module details when dialog closes
  useEffect(() => {
    if (!showAddModules) {
      setSelectedModuleDetails([]);
      setCalculateMessage(null);
    }
  }, [showAddModules]);

  // ============================================================
  // ENTITY HANDLERS
  // ============================================================

  const openCreate = () => {
    setForm(emptyForm);
    setShowCreate(true);
  };

  const handleCreate = async () => {
    if (!form.entity_name || !form.country || !form.currency) {
      toast({
        title: "Missing fields",
        description: "Entity name, country, and currency are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await organizationApi.createEntity(formToCreatePayload(form));
      setShowCreate(false);
      await loadEntities();
      toast({ title: "Entity created", description: "The entity has been added." });
    } catch (error) {
      toast({
        title: "Could not create entity",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const openEdit = (entity: CompanyEntity) => {
    setEditingEntity(entity);
    setForm(entityToForm(entity));
    setShowEdit(true);
  };

  const handleUpdate = async () => {
    if (!editingEntity) return;

    setIsUpdating(true);
    try {
      await organizationApi.updateEntity(editingEntity.id, formToUpdatePayload(form));
      setShowEdit(false);
      await loadEntities();
      toast({ title: "Entity updated", description: "Changes have been saved." });
    } catch (error) {
      toast({
        title: "Could not update entity",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const openView = async (entity: CompanyEntity) => {
    setViewingEntity(entity);
    setShowView(true);
    setIsLoadingAdmins(true);
    try {
      const admins = await organizationApi.getEntityAdministrators(entity.id);
      setEntityAdmins(Array.isArray(admins) ? admins : []);
    } catch {
      setEntityAdmins([]);
    } finally {
      setIsLoadingAdmins(false);
    }
  };

  const openDelete = (entity: CompanyEntity) => {
    setDeletingEntity(entity);
    setDeleteAction("deactivate");
    setDeleteDestinationId("");
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (!deletingEntity) return;
    if (deleteAction === "transfer" && !deleteDestinationId) {
      toast({
        title: "Missing destination",
        description: "Select a destination entity for transferring employees.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);
    try {
      await organizationApi.deleteEntity(
        deletingEntity.id,
        deleteAction === "transfer"
          ? { action: "transfer", destination_entity_id: deleteDestinationId }
          : { action: "deactivate" },
      );
      setShowDelete(false);
      await loadEntities();
      toast({ title: "Entity deleted", description: "The entity has been removed." });
    } catch (error) {
      toast({
        title: "Could not delete entity",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const openManageAdmins = async (entity: CompanyEntity) => {
    setManagingEntity(entity);
    setMakeAdminForm({ email: "", first_name: "", last_name: "" });
    setAdminSource("company");
    setSearchQuery("");
    setShowManageAdmins(true);
    setIsLoadingAdmins(true);

    try {
      const admins = await organizationApi.getEntityAdministrators(entity.id);
      setEntityAdmins(Array.isArray(admins) ? admins : []);
    } catch {
      setEntityAdmins([]);
    } finally {
      setIsLoadingAdmins(false);
    }

    setIsLoadingEntityUsers(true);
    try {
      const users = await organizationApi.getEntityUsers(entity.id);
      setEntityUsers(Array.isArray(users) ? users : []);
    } catch {
      setEntityUsers([]);
    } finally {
      setIsLoadingEntityUsers(false);
    }
  };

  const handleMakeAdmin = async () => {
    if (!managingEntity) return;

    let payload: MakeEntityAdministratorPayload;
    if (adminSource === "manual") {
      if (!makeAdminForm.email) {
        toast({
          title: "Missing email",
          description: "Email is required to assign an entity administrator.",
          variant: "destructive",
        });
        return;
      }
      payload = {
        email: makeAdminForm.email,
        first_name: makeAdminForm.first_name || undefined,
        last_name: makeAdminForm.last_name || undefined,
      };
    } else {
      const sourceUsers = adminSource === "company" ? companyUsers : entityUsers;
      const selected = sourceUsers.find((u) => u.email === makeAdminForm.email);
      if (!selected) {
        toast({
          title: "No user selected",
          description: "Select a user to assign as an entity administrator.",
          variant: "destructive",
        });
        return;
      }
      payload = {
        email: selected.email,
        first_name: selected.first_name ?? undefined,
        last_name: selected.last_name ?? undefined,
      };
    }

    setIsMakingAdmin(true);
    try {
      await organizationApi.makeEntityAdministrator(managingEntity.id, payload);
      const admins = await organizationApi.getEntityAdministrators(managingEntity.id);
      setEntityAdmins(Array.isArray(admins) ? admins : []);
      setMakeAdminForm({ email: "", first_name: "", last_name: "" });
      await loadCompanyUsers();
      toast({ title: "Administrator assigned", description: "The user is now an entity administrator." });
    } catch (error) {
      toast({
        title: "Could not assign administrator",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMakingAdmin(false);
    }
  };

  const selectAdminUser = (user: CompanyUser) => {
    setMakeAdminForm({
      email: user.email,
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
    });
  };

  const activeUserList = useMemo(() => {
    const sourceUsers = adminSource === "company" ? companyUsers : entityUsers;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return sourceUsers;
    return sourceUsers.filter((u) =>
      [u.email, u.first_name, u.last_name]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [adminSource, companyUsers, entityUsers, searchQuery]);

  const removeAdmin = async (admin: EntityAdministrator) => {
    if (!managingEntity) return;
    const adminEmail = admin.email;
    const targetId = userEmailToId.get(adminEmail);
    if (!targetId) {
      toast({
        title: "Cannot remove administrator",
        description: "A matching user id was not found for this administrator.",
        variant: "destructive",
      });
      return;
    }

    try {
      await organizationApi.removeEntityAdministrators(managingEntity.id, {
        user_ids: [targetId],
      });
      const admins = await organizationApi.getEntityAdministrators(managingEntity.id);
      setEntityAdmins(Array.isArray(admins) ? admins : []);
      toast({ title: "Administrator removed", description: "The administrator has been removed." });
    } catch (error) {
      toast({
        title: "Could not remove administrator",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const destinationOptions = useMemo(
    () => entities.filter((e) => e.id !== deletingEntity?.id),
    [entities, deletingEntity?.id],
  );

  const userEmailToId = useMemo(() => {
    const map = new Map<string, string>();
    [...companyUsers, ...entityUsers].forEach((u) => map.set(u.email, u.id));
    return map;
  }, [companyUsers, entityUsers]);

  // ============================================================
  // SUBSCRIPTION UI HELPERS
  // ============================================================

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-500"><CheckCircle2 className="mr-1 h-3 w-3" /> Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>;
      case "expired":
        return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" /> Expired</Badge>;
      default:
        return <Badge variant="secondary">{status || "Unknown"}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Filter out core modules and already subscribed modules
  const getAvailableModules = () => {
    if (!subscription) return modules;
    const subscribedModuleIds = new Set(subscription.modules?.map((m) => m.module_id) || []);
    return modules.filter((m) => {
      if (m.is_core === true) return false;
      if (subscribedModuleIds.has(m.id)) return false;
      return true;
    });
  };

  const hasFutureSubscription = () => {
    if (!subscription) return false;
    return !!futureSubscription;
  };

  const openAddModules = () => {
    setAddModulesForm({ selectedModules: [] });
    setSelectedModuleDetails([]);
    setCalculatedAmount(null);
    setCalculateMessage(null);
    setSelectedProvider("flutterwave");
    setShowAddModules(true);
  };

  const closeAddModules = (open: boolean) => {
    setShowAddModules(open);
    if (!open) {
      setCalculatedAmount(null);
      setSelectedModuleDetails([]);
      setCalculateMessage(null);
    }
  };

  const openIncreaseEmployees = () => {
    setIncreaseEmployeesForm({ additionalEmployees: 0 });
    setCalculatedAmount(null);
    setCalculateMessage(null);
    setSelectedProvider("flutterwave");
    setShowIncreaseEmployees(true);
  };

  const closeIncreaseEmployees = (open: boolean) => {
    setShowIncreaseEmployees(open);
    if (!open) {
      setCalculatedAmount(null);
      setCalculateMessage(null);
    }
  };

  const openRenew = () => {
    setCalculatedAmount(null);
    setCalculateMessage(null);
    setSelectedProvider("flutterwave");
    setShowRenew(true);
  };

  const closeRenew = (open: boolean) => {
    setShowRenew(open);
    if (!open) {
      setCalculatedAmount(null);
      setCalculateMessage(null);
    }
  };

  const openNewSubscription = () => {
    setCalculatedAmount(null);
    setCalculateMessage(null);
    setSelectedProvider("flutterwave");
    setShowNewSubscription(true);
  };

  const closeNewSubscription = (open: boolean) => {
    setShowNewSubscription(open);
    if (!open) {
      setCalculatedAmount(null);
      setCalculateMessage(null);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  // Still checking auth status
  if (isAuthLoading) {
    return (
      <SidebarLayout>
        <div className="flex items-center justify-center gap-2 rounded-3xl border border-border bg-card p-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </div>
      </SidebarLayout>
    );
  }

  // Redirect is in progress
  if (!user) {
    return null;
  }

  return (
    <SidebarLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              System Settings
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Manage entities, administrators, and subscriptions.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              System administration lives above the entity layer. Create and remove legal entities,
              delegate entity administrators, control company-level structure, and manage subscription
              & billing for your organization.
            </p>
          </div>
        </div>

        {/* TABS */}
        <Tabs defaultValue="entities" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="entities" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Entities
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Subscription & Billing
            </TabsTrigger>
          </TabsList>

          {/* ENTITIES TAB */}
          <TabsContent value="entities" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">Total entities</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{entities.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">Company users</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{companyUsers.length}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={openCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Create Entity
              </Button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center gap-2 rounded-3xl border border-border bg-card p-12 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading entities...
              </div>
            ) : entities.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-sm text-muted-foreground">
                No entities yet. Create one to get started.
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Administrators</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entities.map((entity) => (
                      <TableRow key={entity.id}>
                        <TableCell className="font-medium">{entity.entity_name}</TableCell>
                        <TableCell>{entity.registration_number || "—"}</TableCell>
                        <TableCell>{entity.country || "—"}</TableCell>
                        <TableCell>{entity.currency || "—"}</TableCell>
                        <TableCell>{entity.administrator_count ?? "—"}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon" title="View details" onClick={() => openView(entity)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Manage administrators" onClick={() => openManageAdmins(entity)}>
                            <UserPlus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Edit" onClick={() => openEdit(entity)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete" onClick={() => openDelete(entity)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* SUBSCRIPTION TAB */}
          <TabsContent value="subscription" className="space-y-6">
            {isLoadingSubscription ? (
              <div className="flex items-center justify-center gap-2 rounded-3xl border border-border bg-card p-12 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading subscription details...
              </div>
            ) : !subscription ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    No Active Subscription
                  </CardTitle>
                  <CardDescription>
                    Your organization doesn't have an active subscription. Set up your first subscription
                    to start using platform modules and services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={openNewSubscription}>
                    <Plus className="mr-2 h-4 w-4" />
                    Set Up Subscription
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Current Subscription Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Current Subscription
                        </CardTitle>
                        <CardDescription>
                          Your organization's active subscription details
                        </CardDescription>
                      </div>
                      {getStatusBadge(subscription.subscription_status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Employees</p>
                        <p className="text-lg font-semibold flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {subscription.subscribed_employee_count || 0}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="text-lg font-semibold flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {subscription.subscription_months || 0} months
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Price</p>
                        <p className="text-lg font-semibold flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          ${parseFloat(subscription.total_price || '0').toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Expires</p>
                      <p className="text-sm font-medium">
                        {formatDate(subscription.expires_at)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Active Modules</p>
                      <div className="flex flex-wrap gap-2">
                        {subscription.modules && subscription.modules.length > 0 ? (
                          subscription.modules.map((module) => (
                            <Badge key={module.module_id} variant="secondary" className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              {module.module_name}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No modules active</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={openAddModules}
                        disabled={getAvailableModules().length === 0}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Module
                      </Button>
                      <Button
                        variant="outline"
                        onClick={openIncreaseEmployees}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Increase Employees
                      </Button>
                      <Button
                        onClick={openRenew}
                        disabled={hasFutureSubscription()}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        {hasFutureSubscription() ? "Renewal Scheduled" : "Renew Subscription"}
                      </Button>
                    </div>

                    {hasFutureSubscription() && (
                      <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 p-3">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          A future subscription is already scheduled. You can only renew once.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {futureSubscription && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Upcoming Subscription
                      </CardTitle>
                      <CardDescription>
                        This subscription will start when your current one expires
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Starts</p>
                          <p className="text-lg font-semibold">{formatDate(futureSubscription.starts_at)}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Employees</p>
                          <p className="text-lg font-semibold flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {futureSubscription.subscribed_employee_count || 0}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Duration</p>
                          <p className="text-lg font-semibold flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {futureSubscription.subscription_months || 0} months
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Modules</p>
                        <div className="flex flex-wrap gap-2">
                          {futureSubscription.modules && futureSubscription.modules.length > 0 ? (
                            futureSubscription.modules.map((module) => (
                              <Badge key={module.module_id} variant="secondary" className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                {module.module_name}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">No modules selected</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* CREATE ENTITY SHEET */}
        <Sheet open={showCreate} onOpenChange={setShowCreate}>
          <SheetContent className="w-full sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Create Entity</SheetTitle>
              <SheetDescription>Register a new legal entity for this company.</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label>Entity Name</Label>
                <Input value={form.entity_name} onChange={(e) => updateForm("entity_name", e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Registration Number</Label>
                  <Input value={form.registration_number} onChange={(e) => updateForm("registration_number", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Tax Identifier</Label>
                  <Input value={form.tax_identifier} onChange={(e) => updateForm("tax_identifier", e.target.value)} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input value={form.country} onChange={(e) => updateForm("country", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Input value={form.currency} onChange={(e) => updateForm("currency", e.target.value)} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>State / Region</Label>
                  <Input value={form.state} onChange={(e) => updateForm("state", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={form.city} onChange={(e) => updateForm("city", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input value={form.address} onChange={(e) => updateForm("address", e.target.value)} />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button className="flex-1" onClick={handleCreate} disabled={isSaving}>
                  {isSaving ? "Creating..." : "Create Entity"}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* EDIT ENTITY SHEET */}
        <Sheet open={showEdit} onOpenChange={setShowEdit}>
          <SheetContent className="w-full sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Edit Entity</SheetTitle>
              <SheetDescription>Update details for {editingEntity?.entity_name}.</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label>Entity Name</Label>
                <Input value={form.entity_name} onChange={(e) => updateForm("entity_name", e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Registration Number</Label>
                  <Input value={form.registration_number} onChange={(e) => updateForm("registration_number", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Tax Identifier</Label>
                  <Input value={form.tax_identifier} onChange={(e) => updateForm("tax_identifier", e.target.value)} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input value={form.country} onChange={(e) => updateForm("country", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Input value={form.currency} onChange={(e) => updateForm("currency", e.target.value)} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>State / Region</Label>
                  <Input value={form.state} onChange={(e) => updateForm("state", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={form.city} onChange={(e) => updateForm("city", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input value={form.address} onChange={(e) => updateForm("address", e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={form.email} onChange={(e) => updateForm("email", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowEdit(false)}>Cancel</Button>
                <Button className="flex-1" onClick={handleUpdate} disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update Entity"}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* VIEW ENTITY SHEET */}
        <Sheet open={showView} onOpenChange={setShowView}>
          <SheetContent className="w-full sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Entity Details</SheetTitle>
              <SheetDescription>Information for {viewingEntity?.entity_name}.</SheetDescription>
            </SheetHeader>
            {viewingEntity && (
              <div className="mt-6 space-y-5">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">{viewingEntity.entity_name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Registration</Label>
                    <p className="font-medium">{viewingEntity.registration_number || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Tax ID</Label>
                    <p className="font-medium">{viewingEntity.tax_identifier || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Country</Label>
                    <p className="font-medium">{viewingEntity.country || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Currency</Label>
                    <p className="font-medium">{viewingEntity.currency || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Location</Label>
                    <p className="font-medium">
                      {[viewingEntity.city, viewingEntity.state].filter(Boolean).join(", ") || "—"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{viewingEntity.email || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{viewingEntity.phone || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Address</Label>
                    <p className="font-medium">{viewingEntity.address || "—"}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold">Administrators</p>
                  {isLoadingAdmins ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                    </div>
                  ) : entityAdmins.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No administrators assigned.</p>
                  ) : (
                    <ul className="space-y-2">
                      {entityAdmins.map((admin, index) => (
                        <li key={`${admin.email}-${index}`} className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {[admin.first_name, admin.last_name].filter(Boolean).join(" ") || admin.email}
                          </span>
                          <span className="text-muted-foreground">{admin.email}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* DELETE ENTITY DIALOG */}
        <Dialog open={showDelete} onOpenChange={setShowDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Entity</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>{deletingEntity?.entity_name}</strong>? This cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>What to do with employees?</Label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="radio" checked={deleteAction === "deactivate"} onChange={() => setDeleteAction("deactivate")} />
                    <span>Deactivate employees</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="radio" checked={deleteAction === "transfer"} onChange={() => setDeleteAction("transfer")} />
                    <span>Transfer employees</span>
                  </label>
                </div>
              </div>
              {deleteAction === "transfer" && (
                <div className="space-y-2">
                  <Label>Destination Entity</Label>
                  <select
                    value={deleteDestinationId}
                    onChange={(e) => setDeleteDestinationId(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select an entity</option>
                    {destinationOptions.map((entity) => (
                      <option key={entity.id} value={entity.id}>{entity.entity_name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDelete(false)} disabled={isDeleting}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting || (deleteAction === "transfer" && !deleteDestinationId)}>
                {isDeleting ? "Deleting..." : "Delete Entity"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* MANAGE ADMINISTRATORS SHEET */}
        <Sheet open={showManageAdmins} onOpenChange={setShowManageAdmins}>
          <SheetContent className="w-full sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Entity Administrators</SheetTitle>
              <SheetDescription>Manage administrators for {managingEntity?.entity_name}.</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-border bg-background p-4">
                <p className="mb-3 text-sm font-semibold">Add administrator</p>

                <div className="mb-4 grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAdminSource("company");
                      setSearchQuery("");
                      setMakeAdminForm({ email: "", first_name: "", last_name: "" });
                    }}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${adminSource === "company"
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    Company users
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminSource("entity");
                      setSearchQuery("");
                      setMakeAdminForm({ email: "", first_name: "", last_name: "" });
                    }}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${adminSource === "entity"
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    Entity users
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminSource("manual");
                      setSearchQuery("");
                      setMakeAdminForm({ email: "", first_name: "", last_name: "" });
                    }}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${adminSource === "manual"
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    Manual entry
                  </button>
                </div>

                {adminSource === "manual" ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={makeAdminForm.email}
                        onChange={(e) => setMakeAdminForm((c) => ({ ...c, email: e.target.value }))}
                        placeholder="admin@example.com"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input
                          value={makeAdminForm.first_name}
                          onChange={(e) => setMakeAdminForm((c) => ({ ...c, first_name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input
                          value={makeAdminForm.last_name}
                          onChange={(e) => setMakeAdminForm((c) => ({ ...c, last_name: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={handleMakeAdmin} disabled={isMakingAdmin}>
                      {isMakingAdmin ? "Assigning..." : "Assign Administrator"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search users by name or email..."
                        className="pr-10"
                      />
                      <Users className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    <div className="max-h-56 space-y-1 overflow-y-auto rounded-lg border border-border p-1">
                      {adminSource === "entity" && isLoadingEntityUsers ? (
                        <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" /> Loading entity users...
                        </div>
                      ) : activeUserList.length === 0 ? (
                        <p className="px-3 py-2 text-sm text-muted-foreground">No users found.</p>
                      ) : (
                        activeUserList.map((user) => {
                          const isSelected = user.email === makeAdminForm.email;
                          return (
                            <button
                              key={user.id}
                              type="button"
                              onClick={() => selectAdminUser(user)}
                              className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${isSelected
                                ? "bg-primary/10 text-foreground"
                                : "hover:bg-muted"
                                }`}
                            >
                              <span className="font-medium">
                                {[user.first_name, user.last_name].filter(Boolean).join(" ") || "Unnamed user"}
                              </span>
                              <span className="block text-xs text-muted-foreground">{user.email}</span>
                            </button>
                          );
                        })
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-xs text-muted-foreground">
                        {makeAdminForm.email
                          ? `Selected: ${makeAdminForm.email}`
                          : "Select a user to assign as administrator."}
                      </p>
                      <Button onClick={handleMakeAdmin} disabled={isMakingAdmin || !makeAdminForm.email}>
                        {isMakingAdmin ? "Assigning..." : "Assign"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Current administrators</p>
                {isLoadingAdmins ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                  </div>
                ) : entityAdmins.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No administrators assigned.</p>
                ) : (
                  <ul className="space-y-2">
                    {entityAdmins.map((admin, index) => (
                      <li key={`${admin.email}-${index}`} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                        <div>
                          <p className="text-sm font-medium">
                            {[admin.first_name, admin.last_name].filter(Boolean).join(" ") || admin.email}
                          </p>
                          <p className="text-xs text-muted-foreground">{admin.email}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={!userEmailToId.has(admin.email)}
                          onClick={() => removeAdmin(admin)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* NEW SUBSCRIPTION DIALOG */}
        <Dialog open={showNewSubscription} onOpenChange={closeNewSubscription}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Set Up Subscription
              </DialogTitle>
              <DialogDescription>
                Choose your modules, employee count, and subscription duration.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Admin Email</Label>
                <Input
                  type="email"
                  value={newSubscriptionForm.email}
                  onChange={(e) => setNewSubscriptionForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Number of Employees</Label>
                <Input
                  type="number"
                  min={1}
                  value={newSubscriptionForm.employeeCount || ""}
                  onChange={(e) => setNewSubscriptionForm((f) => ({ ...f, employeeCount: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter employee count"
                />
              </div>

              <div className="space-y-2">
                <Label>Subscription Duration (months)</Label>
                <select
                  value={newSubscriptionForm.subscriptionMonths}
                  onChange={(e) => setNewSubscriptionForm((f) => ({ ...f, subscriptionMonths: parseInt(e.target.value) }))}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value={3}>3 months</option>
                  <option value={6}>6 months</option>
                  <option value={12}>12 months</option>
                  <option value={24}>24 months</option>
                </select>
              </div>

              {/* Modules Selection - Core modules disabled and shown as required */}
              <div className="space-y-2">
                <Label>Select Modules</Label>
                <div className="grid gap-2 max-h-48 overflow-y-auto border rounded-lg p-2">
                  {modules.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">Loading modules...</p>
                  ) : (
                    modules.map((module) => (
                      <label
                        key={module.id}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                      >
                        <Checkbox
                          checked={newSubscriptionForm.selectedModules.includes(module.id)}
                          onCheckedChange={(checked) => {
                            setNewSubscriptionForm((f) => ({
                              ...f,
                              selectedModules: checked
                                ? [...f.selectedModules, module.id]
                                : f.selectedModules.filter((id) => id !== module.id),
                            }));
                          }}
                          disabled={module.is_core}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium">{module.name}</p>
                            {module.is_core && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                                Required (Core)
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {module.code}
                            </Badge>
                          </div>
                          {module.description && (
                            <p className="text-xs text-muted-foreground mt-1">{module.description}</p>
                          )}
                          <p className="text-xs font-medium text-primary mt-1">
                            ${formatPrice(module.base_price)} per month
                          </p>
                        </div>
                      </label>
                    ))
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Core modules are required and included by default. They cannot be deselected.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Payment Provider</Label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as PaymentProviderId)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {PAYMENT_PROVIDERS.map((provider) => (
                    <option key={provider.id} value={provider.id} disabled={!provider.available}>
                      {provider.name}
                      {!provider.available ? " (Coming soon)" : ""}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  {PAYMENT_PROVIDERS.find((p) => p.id === selectedProvider)?.description}
                </p>
              </div>

              {calculatedAmount !== null && (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    ${calculatedAmount.toLocaleString()}
                  </p>
                  {calculateMessage && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      {calculateMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => closeNewSubscription(false)}>Cancel</Button>
              <Button onClick={handleNewSubscription} disabled={isCheckout || isCalculating}>
                {isCheckout ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Proceed to Payment
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ADD MODULES DIALOG - Core modules are hidden */}
        <Dialog open={showAddModules} onOpenChange={closeAddModules}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Modules
              </DialogTitle>
              <DialogDescription>
                Select additional modules to add to your current subscription.
                Core modules are already included by default and cannot be added.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Current Modules */}
              <div className="space-y-2">
                <Label>Current Modules</Label>
                <div className="flex flex-wrap gap-2">
                  {subscription?.modules?.map((m) => (
                    <Badge key={m.module_id} variant="secondary">
                      {m.module_name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Available Modules */}
              <div className="space-y-2">
                <Label>Available Modules</Label>
                <div className="grid gap-2 max-h-48 overflow-y-auto border rounded-lg p-2">
                  {getAvailableModules().length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">
                      No modules available to add. All non-core modules are already subscribed.
                    </p>
                  ) : (
                    getAvailableModules().map((module) => (
                      <label
                        key={module.id}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                      >
                        <Checkbox
                          checked={addModulesForm.selectedModules.includes(module.id)}
                          onCheckedChange={(checked) => {
                            const newSelection = checked
                              ? [...addModulesForm.selectedModules, module.id]
                              : addModulesForm.selectedModules.filter((id) => id !== module.id);
                            setAddModulesForm((f) => ({
                              ...f,
                              selectedModules: newSelection,
                            }));
                            fetchSelectedModuleDetails(newSelection);
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium">{module.name}</p>
                            <Badge variant="outline" className="text-xs">
                              {module.code}
                            </Badge>
                          </div>
                          {module.description && (
                            <p className="text-xs text-muted-foreground mt-1">{module.description}</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Base price: ${formatPrice(module.base_price)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Will be prorated for remaining subscription period
                          </p>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* ✅ Selected Modules Summary */}
              {addModulesForm.selectedModules.length > 0 && (
                <div className="space-y-2 border-t pt-4">
                  <Label className="font-semibold">Selected Modules Summary</Label>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-2">
                    {isLoadingSelectedModules ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading module details...
                      </div>
                    ) : (
                      selectedModuleDetails.map((module) => (
                        <div key={module.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="font-medium">{module.name}</span>
                            <span className="text-muted-foreground">({module.code})</span>
                          </div>
                          <span className="font-medium text-primary">
                            ${formatPrice(module.base_price)}
                          </span>
                        </div>
                      ))
                    )}

                    {/* Total calculation */}
                    {!isLoadingSelectedModules && selectedModuleDetails.length > 0 && (
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-medium">Total Base Price</span>
                        <span className="font-bold text-primary">
                          ${selectedModuleDetails.reduce((sum, m) => sum + parseFloat(String(m.base_price)), 0).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {subscription && (
                <div className="rounded-lg bg-muted p-3 text-sm">
                  <p className="text-muted-foreground">
                    Remaining subscription period: {formatDate(subscription.expires_at)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Modules will be prorated based on the remaining days.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Payment Provider</Label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as PaymentProviderId)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {PAYMENT_PROVIDERS.map((provider) => (
                    <option key={provider.id} value={provider.id} disabled={!provider.available}>
                      {provider.name}
                      {!provider.available ? " (Coming soon)" : ""}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  {PAYMENT_PROVIDERS.find((p) => p.id === selectedProvider)?.description}
                </p>
              </div>

              {calculatedAmount !== null && (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="text-sm text-muted-foreground">Prorated Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    ${calculatedAmount.toLocaleString()}
                  </p>
                  {calculateMessage && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      {calculateMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => closeAddModules(false)}>Cancel</Button>
              <Button
                onClick={handleAddModules}
                disabled={isCheckout || addModulesForm.selectedModules.length === 0}
              >
                {isCheckout ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Proceed to payment
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* INCREASE EMPLOYEES DIALOG */}
        <Dialog open={showIncreaseEmployees} onOpenChange={closeIncreaseEmployees}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Increase Employee Count
              </DialogTitle>
              <DialogDescription>
                Add additional employees to your current subscription.
                The additional employee count will be added to your current subscription.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Current Employees</Label>
                <p className="text-lg font-semibold">
                  {subscription?.subscribed_employee_count || 0}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Additional Employees to Add</Label>
                <Input
                  type="number"
                  min={1}
                  value={increaseEmployeesForm.additionalEmployees || ""}
                  onChange={(e) => setIncreaseEmployeesForm((f) => ({
                    ...f,
                    additionalEmployees: parseInt(e.target.value) || 0,
                  }))}
                  placeholder="Enter additional employees"
                />
                <p className="text-xs text-muted-foreground">
                  This will add to your current count. Total will be:{" "}
                  {(subscription?.subscribed_employee_count || 0) + increaseEmployeesForm.additionalEmployees}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Payment Provider</Label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as PaymentProviderId)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {PAYMENT_PROVIDERS.map((provider) => (
                    <option key={provider.id} value={provider.id} disabled={!provider.available}>
                      {provider.name}
                      {!provider.available ? " (Coming soon)" : ""}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  {PAYMENT_PROVIDERS.find((p) => p.id === selectedProvider)?.description}
                </p>
              </div>

              {calculatedAmount !== null && (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="text-sm text-muted-foreground">Estimated Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    ${calculatedAmount.toLocaleString()}
                  </p>
                  {calculateMessage && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      {calculateMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => closeIncreaseEmployees(false)}>Cancel</Button>
              <Button
                onClick={handleIncreaseEmployees}
                disabled={isCheckout || increaseEmployeesForm.additionalEmployees <= 0}
              >
                {isCheckout ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Proceed to payment
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* RENEW SUBSCRIPTION DIALOG */}
        <Dialog open={showRenew} onOpenChange={closeRenew}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Renew Subscription
              </DialogTitle>
              <DialogDescription>
                Configure your next subscription period. This will start after your current subscription expires.
                {hasFutureSubscription() && (
                  <span className="block text-yellow-600 mt-1">
                    ⚠️ A future subscription is already scheduled. You can only have one future subscription.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {subscription && (
                <div className="rounded-lg bg-muted p-3 space-y-1">
                  <p className="text-sm font-medium">Current Subscription</p>
                  <p className="text-sm text-muted-foreground">
                    Employees: {subscription.subscribed_employee_count} |
                    Expires: {formatDate(subscription.expires_at)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Modules: {subscription.modules?.map(m => m.module_name).join(", ") || "None"}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Employee Count for Next Period</Label>
                <Input
                  type="number"
                  min={1}
                  value={renewForm.employeeCount || ""}
                  onChange={(e) => setRenewForm((f) => ({ ...f, employeeCount: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter employee count"
                />
                <p className="text-xs text-muted-foreground">
                  Total employees for your next subscription period
                </p>
              </div>

              <div className="space-y-2">
                <Label>Subscription Duration (months)</Label>
                <select
                  value={renewForm.subscriptionMonths}
                  onChange={(e) => setRenewForm((f) => ({ ...f, subscriptionMonths: parseInt(e.target.value) }))}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value={3}>3 months</option>
                  <option value={6}>6 months</option>
                  <option value={12}>12 months</option>
                  <option value={24}>24 months</option>
                </select>
              </div>

              {/* Modules Selection - Core modules disabled and shown as required */}
              <div className="space-y-2">
                <Label>Select Modules for Next Period</Label>
                <div className="grid gap-2 max-h-48 overflow-y-auto border rounded-lg p-2">
                  {modules.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">Loading modules...</p>
                  ) : (
                    modules.map((module) => (
                      <label
                        key={module.id}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                      >
                        <Checkbox
                          checked={renewForm.selectedModules.includes(module.id)}
                          onCheckedChange={(checked) => {
                            setRenewForm((f) => ({
                              ...f,
                              selectedModules: checked
                                ? [...f.selectedModules, module.id]
                                : f.selectedModules.filter((id) => id !== module.id),
                            }));
                          }}
                          disabled={module.is_core}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium">{module.name}</p>
                            {module.is_core && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                                Required (Core)
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {module.code}
                            </Badge>
                          </div>
                          {module.description && (
                            <p className="text-xs text-muted-foreground mt-1">{module.description}</p>
                          )}
                          <p className="text-xs font-medium text-primary mt-1">
                            ${formatPrice(module.base_price)} per month
                          </p>
                        </div>
                      </label>
                    ))
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Core modules are required and included by default. They cannot be deselected.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Payment Provider</Label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as PaymentProviderId)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {PAYMENT_PROVIDERS.map((provider) => (
                    <option key={provider.id} value={provider.id} disabled={!provider.available}>
                      {provider.name}
                      {!provider.available ? " (Coming soon)" : ""}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  {PAYMENT_PROVIDERS.find((p) => p.id === selectedProvider)?.description}
                </p>
              </div>

              {calculatedAmount !== null && (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="text-sm text-muted-foreground">Total Amount for Next Period</p>
                  <p className="text-2xl font-bold text-primary">
                    ${calculatedAmount.toLocaleString()}
                  </p>
                  {calculateMessage && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      {calculateMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => closeRenew(false)}>Cancel</Button>
              <Button
                onClick={handleRenew}
                disabled={isCheckout || isCalculating || hasFutureSubscription()}
              >
                {isCheckout ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : hasFutureSubscription() ? (
                  <>
                    <Info className="mr-2 h-4 w-4" />
                    Renewal Already Scheduled
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Proceed to Payment
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </SidebarLayout>
  );
};

export default SystemSettings;
