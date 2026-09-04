import { useState } from "react";
import SettingsLayout from "./SettingsLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, UsersRound } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { organizationApi } from "@/lib/api";
import { sampleRoles, type OrganizationRole } from "./organizationData";
import { toast } from "@/components/ui/use-toast";

const JobTitlesSettings = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [roles, setRoles] = useState<OrganizationRole[]>(sampleRoles);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const filteredRoles = roles.filter((role) => {
    const query = searchQuery.trim().toLowerCase();
    return !query || role.name.toLowerCase().includes(query) || role.description.toLowerCase().includes(query);
  });

  const handleCreateRole = async () => {
    if (!roleName.trim()) {
      toast({ title: "Role name required", description: "Provide a role name before creating the role.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      await organizationApi.createRole({ roleName: roleName.trim(), description: roleDescription.trim() || undefined });
      setRoles((current) => [
        {
          id: `role-${Date.now()}`,
          name: roleName.trim(),
          description: roleDescription.trim() || "Custom role",
          memberCount: 0,
        },
        ...current,
      ]);
      setRoleName("");
      setRoleDescription("");
      setShowAdd(false);
      toast({ title: "Role created", description: "The role is ready for permission assignment." });
    } catch (error) {
      toast({
        title: "Could not create role",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsLayout activeTab="/settings/job-titles">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <UsersRound className="h-3.5 w-3.5" />
              Roles
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Create reusable roles before assigning permissions.</h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Roles group permissions together so administrators can assign access cleanly without managing raw permissions user by user.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search roles" className="w-56 pr-10" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <Button onClick={() => setShowAdd(true)}>
              <Plus className="w-4 h-4 mr-2" /> Create Role
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Roles available</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{roles.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">System roles</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{roles.filter((role) => role.isSystem).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Assigned members</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{roles.reduce((total, role) => total + role.memberCount, 0)}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Roles listing</CardTitle>
            <CardDescription>Use concise role names tied to operational responsibilities.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium text-foreground">{role.name}</TableCell>
                    <TableCell className="max-w-md text-sm text-muted-foreground">{role.description}</TableCell>
                    <TableCell className="text-muted-foreground">{role.memberCount}</TableCell>
                    <TableCell>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${role.isSystem ? "bg-sky-100 text-sky-700" : "bg-muted text-foreground"}`}>
                        {role.isSystem ? "System role" : "Custom role"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Sheet open={showAdd} onOpenChange={setShowAdd}>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader><SheetTitle>Create Role</SheetTitle></SheetHeader>
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label>Role Name <span className="text-destructive">*</span></Label>
                <Input value={roleName} onChange={(event) => setRoleName(event.target.value)} placeholder="e.g. Payroll Officer" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={roleDescription} onChange={(event) => setRoleDescription(event.target.value)} placeholder="What should this role own?" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
                <Button className="flex-1" onClick={handleCreateRole} disabled={isSaving}>{isSaving ? "Creating..." : "Create"}</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </SettingsLayout>
  );
};

export default JobTitlesSettings;
