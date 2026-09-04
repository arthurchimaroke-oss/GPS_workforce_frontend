import { useState } from "react";
import SettingsLayout from "./SettingsLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { organizationApi } from "@/lib/api";
import { permissionGroups, sampleEntities, sampleRoles, sampleUsers, type OrganizationUser } from "./organizationData";
import { Mail, Plus, Search, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const DepartmentSettings = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<OrganizationUser[]>(sampleUsers);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isEmployee: false,
    jobTitle: "",
    entityIds: [] as string[],
  });

  const entityNameById = Object.fromEntries(sampleEntities.map((entity) => [entity.id, entity.name]));
  const roleNameById = Object.fromEntries(sampleRoles.map((role) => [role.id, role.name]));

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    return !query || fullName.includes(query) || user.email.toLowerCase().includes(query);
  });

  const toggleEntity = (entityId: string) => {
    setForm((current) => ({
      ...current,
      entityIds: current.entityIds.includes(entityId)
        ? current.entityIds.filter((id) => id !== entityId)
        : [...current.entityIds, entityId],
    }));
  };

  const handleCreateUser = async () => {
    if (!form.firstName || !form.lastName || !form.email || form.entityIds.length === 0) {
      toast({
        title: "Missing fields",
        description: "First name, last name, email, and at least one entity are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await organizationApi.createUser(form);
      setUsers((current) => [
        {
          id: `user-${Date.now()}`,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phoneNumber: form.phoneNumber,
          isEmployee: form.isEmployee,
          jobTitle: form.isEmployee ? form.jobTitle : undefined,
          entityIds: form.entityIds,
          roleIds: [],
          status: "Invited",
        },
        ...current,
      ]);
      setShowAdd(false);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        isEmployee: false,
        jobTitle: "",
        entityIds: [],
      });
      toast({
        title: "User created successfully",
        description: "Invitation email sent and entity membership recorded.",
        /*className: "bg-red"*/
      });
    } catch (error) {
      toast({
        title: "Could not create user",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsLayout activeTab="/settings/department">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              Users
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Invite platform users and attach entity access.</h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              This creates login-capable users, not just employees. A single request can create the company user, attach entity memberships, optionally create employee records, and send the invitation email.
            </p>
          </div>
          <Button onClick={() => setShowAdd(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Total users</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{users.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Employee-linked users</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{users.filter((user) => user.isEmployee).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Available permission groups</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{permissionGroups.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Organization users</CardTitle>
              <CardDescription>Assign users to one or many entities before role assignment.</CardDescription>
            </div>
            <div className="relative w-full sm:w-72">
              <Input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search users" className="pr-10" />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Entities</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.isEmployee ? user.jobTitle || "Employee" : "External user"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {user.entityIds.map((entityId) => (
                          <span key={entityId} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">{entityNameById[entityId] || entityId}</span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {user.roleIds.length > 0 ? user.roleIds.map((roleId) => (
                          <span key={roleId} className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-800">{roleNameById[roleId] || roleId}</span>
                        )) : <span className="text-sm text-muted-foreground">No role yet</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {user.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Sheet open={showAdd} onOpenChange={setShowAdd}>
          <SheetContent className="w-full sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Invite User</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input value={form.firstName} onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input value={form.lastName} onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input value={form.phoneNumber} onChange={(event) => setForm((current) => ({ ...current, phoneNumber: event.target.value }))} />
                </div>
              </div>

              <Card className="border-dashed">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-foreground">Is this user also an employee?</p>
                    <p className="text-sm text-muted-foreground">If yes, GPS can create employee records inside each selected entity.</p>
                  </div>
                  <label className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <input
                      type="checkbox"
                      checked={form.isEmployee}
                      onChange={(event) => setForm((current) => ({ ...current, isEmployee: event.target.checked }))}
                      className="h-4 w-4 rounded border-border"
                    />
                    Yes
                  </label>
                </CardContent>
              </Card>

              {form.isEmployee && (
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input value={form.jobTitle} onChange={(event) => setForm((current) => ({ ...current, jobTitle: event.target.value }))} placeholder="HR Manager" />
                </div>
              )}

              <div className="space-y-3">
                <Label>Assign To Entities</Label>
                <div className="grid gap-3">
                  {sampleEntities.map((entity) => (
                    <label key={entity.id} className="flex items-start justify-between rounded-2xl border border-border bg-background p-4">
                      <div>
                        <p className="font-medium text-foreground">{entity.name}</p>
                        <p className="text-sm text-muted-foreground">{entity.country} · {entity.currency}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={form.entityIds.includes(entity.id)}
                        onChange={() => toggleEntity(entity.id)}
                        className="mt-1 h-4 w-4 rounded border-border"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                The backend handles creating the company user, attaching entity membership, optionally creating employee records, and sending the invitation email from one request.
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
                <Button className="flex-1" onClick={handleCreateUser} disabled={isSaving}>
                  <Mail className="mr-2 h-4 w-4" />
                  {isSaving ? "Inviting..." : "Create User"}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </SettingsLayout>
  );
};

export default DepartmentSettings;
