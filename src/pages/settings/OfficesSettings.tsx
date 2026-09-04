import { useEffect, useState } from "react";
import SettingsLayout from "./SettingsLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { organizationApi } from "@/lib/api";
import { type OrganizationEntity } from "./organizationData";
import { Loader2, MapPin, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// ---------- Types ----------
interface RawEntity {
  id: string;
  entity_name: string;
  registration_number: string;
  tax_identifier?: string | null;
  country: string;
  currency: string;
  state?: string | null;
  city?: string | null;
  address?: string | null;
  email?: string | null;
}

const mapRawEntity = (raw: RawEntity): OrganizationEntity => ({
  id: raw.id,
  name: raw.entity_name,
  registrationNumber: raw.registration_number,
  taxIdentifier: raw.tax_identifier || undefined,
  country: raw.country,
  currency: raw.currency,
  state: raw.state || undefined,
  city: raw.city || undefined,
  address: raw.address || undefined,
  // email: raw.email || undefined,
  employees: 0,
});

// Form shape matches UpdateEntityPayload + create
interface EntityForm {
  entity_name: string;
  registration_number: string;
  tax_identifier?: string;
  country: string;
  currency: string;
  state?: string;
  city?: string;
  address?: string;
  email?: string;
}

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
};

// Employee delete action types (as per your API)
export type DeleteEmployeeAction =
  | { action: "transfer"; destination_entity_id: string }
  | { action: "deactivate" };

export interface EmployeeDeleteAction {
  employee_action: DeleteEmployeeAction;
}

// ---------- Component ----------
const OfficesSettings = () => {
  const [entities, setEntities] = useState<OrganizationEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create
  const [showCreate, setShowCreate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<EntityForm>(emptyForm);

  // Edit
  const [editingEntity, setEditingEntity] = useState<OrganizationEntity | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // View
  const [viewingEntity, setViewingEntity] = useState<OrganizationEntity | null>(null);
  const [showView, setShowView] = useState(false);

  // Delete
  const [deletingEntity, setDeletingEntity] = useState<OrganizationEntity | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteAction, setDeleteAction] = useState<DeleteEmployeeAction['action']>('deactivate');
  const [deleteDestinationId, setDeleteDestinationId] = useState<string>('');

  // ---------- Load ----------
  useEffect(() => {
    let isMounted = true;

    const loadEntities = async () => {
      setIsLoading(true);
      try {
        const response = await organizationApi.getAllEntities();
        const data = response as { company_entities: RawEntity[] };
        const raw = Array.isArray(data.company_entities) ? data.company_entities : [];
        if (isMounted) {
          setEntities(raw.map(mapRawEntity));
        }
      } catch (error) {
        if (isMounted) {
          toast({
            title: "Could not load entities",
            description: error instanceof Error ? error.message : "Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadEntities();

    return () => {
      isMounted = false;
    };
  }, []);

  // ---------- Form helpers ----------
  const updateForm = (field: keyof EntityForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => setForm(emptyForm);

  // ---------- Create ----------
  const handleCreateEntity = async () => {
    if (!form.entity_name || !form.registration_number || !form.country || !form.currency) {
      toast({
        title: "Missing fields",
        description: "Entity name, registration number, country, and currency are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await organizationApi.createEntity(form);
      // Optimistic update
      const newEntity: OrganizationEntity = {
        id: `entity-${Date.now()}`,
        name: form.entity_name,
        registrationNumber: form.registration_number,
        taxIdentifier: form.tax_identifier || undefined,
        country: form.country,
        currency: form.currency,
        state: form.state || undefined,
        city: form.city || undefined,
        address: form.address || undefined,
        // email: form.email || undefined,
        employees: 0,
      };
      setEntities((prev) => [newEntity, ...prev]);
      setShowCreate(false);
      resetForm();
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

  // ---------- Update ----------
  const openEditSheet = (entity: OrganizationEntity) => {
    setEditingEntity(entity);
    setForm({
      entity_name: entity.name,
      registration_number: entity.registrationNumber,
      tax_identifier: entity.taxIdentifier || "",
      country: entity.country,
      currency: entity.currency,
      state: entity.state || "",
      city: entity.city || "",
      address: entity.address || "",
      // email: entity.email || "",
    });
    setShowEdit(true);
  };

  const handleUpdateEntity = async () => {
    if (!editingEntity) return;
    if (!form.entity_name || !form.registration_number || !form.country || !form.currency) {
      toast({
        title: "Missing fields",
        description: "Entity name, registration number, country, and currency are required.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      await organizationApi.updateEntity(editingEntity.id, {
        entity_name: form.entity_name,
        registration_number: form.registration_number,
        tax_identifier: form.tax_identifier || undefined,
        country: form.country,
        currency: form.currency,
        state: form.state || undefined,
        city: form.city || undefined,
        address: form.address || undefined,
        // email: form.email || undefined,
      });
      // Update local state
      setEntities((prev) =>
        prev.map((e) =>
          e.id === editingEntity.id
            ? {
              ...e,
              name: form.entity_name,
              registrationNumber: form.registration_number,
              taxIdentifier: form.tax_identifier || undefined,
              country: form.country,
              currency: form.currency,
              state: form.state || undefined,
              city: form.city || undefined,
              address: form.address || undefined,
              email: form.email || undefined,
            }
            : e
        )
      );
      setShowEdit(false);
      setEditingEntity(null);
      resetForm();
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

  // ---------- Delete ----------
  const confirmDelete = (entity: OrganizationEntity) => {
    setDeletingEntity(entity);
    setDeleteAction('deactivate');
    setDeleteDestinationId('');
    setShowDeleteDialog(true);
  };

  const handleDeleteEntity = async () => {
    if (!deletingEntity) return;

    if (deleteAction === 'transfer' && !deleteDestinationId) {
      toast({
        title: "Missing destination",
        description: "Please select a destination entity for transferring employees.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);
    try {
      const payload: DeleteEmployeeAction =

        deleteAction === 'transfer'
          ? { action: 'transfer', destination_entity_id: deleteDestinationId }
          : { action: 'deactivate' }


      await organizationApi.deleteEntity(deletingEntity.id, payload);
      setEntities((prev) => prev.filter((e) => e.id !== deletingEntity.id));
      toast({ title: "Entity deleted", description: "The entity has been removed." });
    } catch (error) {
      toast({
        title: "Could not delete entity",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      setDeletingEntity(null);
    }
  };

  // ---------- Render ----------
  return (
    <SettingsLayout activeTab="/settings/offices">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Entities
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Create and maintain legal entities.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Each entity becomes an operating perimeter for employee records, payroll, attendance, leave, and future access control.
            </p>
          </div>
          <Button onClick={() => setShowCreate(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Entity
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Total entities</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {entities.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Total employees across entities</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {entities.reduce((total, e) => total + e.employees, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* List / Table */}
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
          <div className="rounded-3xl border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entities.map((entity) => (
                  <TableRow key={entity.id}>
                    <TableCell className="font-medium">{entity.name}</TableCell>
                    <TableCell>{entity.registrationNumber}</TableCell>
                    <TableCell>{entity.country}</TableCell>
                    <TableCell>{entity.currency}</TableCell>
                    <TableCell>
                      {[entity.city, entity.state].filter(Boolean).join(", ") || "—"}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="View details"
                        onClick={() => {
                          setViewingEntity(entity);
                          setShowView(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Edit"
                        onClick={() => openEditSheet(entity)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete"
                        onClick={() => confirmDelete(entity)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* ---------- CREATE SHEET ---------- */}
        <Sheet open={showCreate} onOpenChange={setShowCreate}>
          <SheetContent className="w-full sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Create Entity</SheetTitle>
              <SheetDescription>
                Fill in the details to register a new legal entity.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Entity Name</Label>
                  <Input
                    value={form.entity_name}
                    onChange={(e) => updateForm("entity_name", e.target.value)}
                    placeholder="Omni Ghana Ltd"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Registration Number</Label>
                  <Input
                    value={form.registration_number}
                    onChange={(e) => updateForm("registration_number", e.target.value)}
                    placeholder="RC-123456"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tax Identifier</Label>
                  <Input
                    value={form.tax_identifier}
                    onChange={(e) => updateForm("tax_identifier", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    value={form.country}
                    onChange={(e) => updateForm("country", e.target.value)}
                    placeholder="Ghana"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Input
                    value={form.currency}
                    onChange={(e) => updateForm("currency", e.target.value)}
                    placeholder="GHS"
                  />
                </div>
                <div className="space-y-2">
                  <Label>State or Region</Label>
                  <Input
                    value={form.state}
                    onChange={(e) => updateForm("state", e.target.value)}
                    placeholder="Greater Accra"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={form.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                    placeholder="Accra"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    placeholder="Business district address"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email (optional)</Label>
                <Input
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="contact@entity.com"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleCreateEntity}
                  disabled={isSaving}
                >
                  {isSaving ? "Creating..." : "Create Entity"}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* ---------- EDIT SHEET ---------- */}
        <Sheet open={showEdit} onOpenChange={setShowEdit}>
          <SheetContent className="w-full sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Edit Entity</SheetTitle>
              <SheetDescription>
                Update the details for {editingEntity?.name}.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Entity Name</Label>
                  <Input
                    value={form.entity_name}
                    onChange={(e) => updateForm("entity_name", e.target.value)}
                    placeholder="Omni Ghana Ltd"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Registration Number</Label>
                  <Input
                    value={form.registration_number}
                    onChange={(e) => updateForm("registration_number", e.target.value)}
                    placeholder="RC-123456"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tax Identifier</Label>
                  <Input
                    value={form.tax_identifier}
                    onChange={(e) => updateForm("tax_identifier", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    value={form.country}
                    onChange={(e) => updateForm("country", e.target.value)}
                    placeholder="Ghana"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Input
                    value={form.currency}
                    onChange={(e) => updateForm("currency", e.target.value)}
                    placeholder="GHS"
                  />
                </div>
                <div className="space-y-2">
                  <Label>State or Region</Label>
                  <Input
                    value={form.state}
                    onChange={(e) => updateForm("state", e.target.value)}
                    placeholder="Greater Accra"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={form.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                    placeholder="Accra"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    placeholder="Business district address"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email (optional)</Label>
                <Input
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="contact@entity.com"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleUpdateEntity}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Entity"}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* ---------- VIEW SHEET ---------- */}
        <Sheet open={showView} onOpenChange={setShowView}>
          <SheetContent className="w-full sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Entity Details</SheetTitle>
              <SheetDescription>
                Full information for {viewingEntity?.name}.
              </SheetDescription>
            </SheetHeader>
            {viewingEntity && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">{viewingEntity.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Registration</Label>
                    <p className="font-medium">{viewingEntity.registrationNumber}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Tax ID</Label>
                    <p className="font-medium">{viewingEntity.taxIdentifier || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Country</Label>
                    <p className="font-medium">{viewingEntity.country}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Currency</Label>
                    <p className="font-medium">{viewingEntity.currency}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Location</Label>
                    <p className="font-medium">
                      {[viewingEntity.city, viewingEntity.state].filter(Boolean).join(", ") || "—"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Address</Label>
                    <p className="font-medium">
                      {viewingEntity.address || "No address provided"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Email</Label>

                  </div>
                </div>
                <SheetFooter>
                  <Button variant="outline" onClick={() => setShowView(false)}>
                    Close
                  </Button>
                </SheetFooter>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* ---------- DELETE CONFIRMATION DIALOG ---------- */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Entity</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>{deletingEntity?.name}</strong>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>What to do with employees?</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="deactivate"
                      checked={deleteAction === 'deactivate'}
                      onChange={() => setDeleteAction('deactivate')}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="deactivate">Deactivate employees</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="transfer"
                      checked={deleteAction === 'transfer'}
                      onChange={() => setDeleteAction('transfer')}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="transfer">Transfer employees</Label>
                  </div>
                </div>
              </div>

              {deleteAction === 'transfer' && (
                <div className="space-y-2">
                  <Label>Destination Entity</Label>
                  <select
                    value={deleteDestinationId}
                    onChange={(e) => setDeleteDestinationId(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select an entity</option>
                    {entities
                      .filter((e) => e.id !== deletingEntity?.id)
                      .map((entity) => (
                        <option key={entity.id} value={entity.id}>
                          {entity.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteEntity}
                disabled={
                  isDeleting ||
                  (deleteAction === 'transfer' && !deleteDestinationId)
                }
              >
                {isDeleting ? "Deleting..." : "Delete Entity"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SettingsLayout>
  );
};

export default OfficesSettings;