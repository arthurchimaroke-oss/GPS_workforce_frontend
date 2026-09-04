import { useState } from "react";
import SettingsLayout from "./SettingsLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, Lock, MoreHorizontal, Search, UserPlus } from "lucide-react";
import { defaultRolePermissions, permissionGroups, sampleRoles, sampleUsers, type OrganizationRole, type OrganizationUser } from "./organizationData";
import { organizationApi } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

interface PermissionSettingsProps {
  activeTab?: string;
}

const PermissionSettings = ({ activeTab }: PermissionSettingsProps) => {
  const [roles] = useState<OrganizationRole[]>(sampleRoles);
  const [users, setUsers] = useState<OrganizationUser[]>(sampleUsers);
  const [selectedRole, setSelectedRole] = useState<string | null>(sampleRoles[0]?.id ?? null);
  const [showNewRole, setShowNewRole] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>(defaultRolePermissions);
  const [assignRoleId, setAssignRoleId] = useState(sampleRoles[0]?.id ?? "");
  const [assignUserId, setAssignUserId] = useState(sampleUsers[0]?.id ?? "");
  const [isSavingPermissions, setIsSavingPermissions] = useState(false);
  const [isAssigningRole, setIsAssigningRole] = useState(false);

  const selectedRoleRecord = roles.find((role) => role.id === selectedRole) ?? null;
  const roleMembers = users.filter((user) => user.roleIds.includes(selectedRole ?? ""));

  const togglePermission = (roleId: string, permissionId: string) => {
    setSelectedPermissions((current) => {
      const rolePermissions = current[roleId] ?? [];
      const nextPermissions = rolePermissions.includes(permissionId)
        ? rolePermissions.filter((id) => id !== permissionId)
        : [...rolePermissions, permissionId];
      return { ...current, [roleId]: nextPermissions };
    });
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) {
      return;
    }

    setIsSavingPermissions(true);
    try {
      await organizationApi.assignRolePermissions({
        roleId: selectedRole,
        permissions: selectedPermissions[selectedRole] ?? [],
      });
      toast({ title: "Permissions saved", description: "The selected role has been updated." });
    } catch (error) {
      toast({
        title: "Could not save permissions",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingPermissions(false);
    }
  };

  const handleAssignRole = async () => {
    if (!assignRoleId || !assignUserId) {
      return;
    }

    setIsAssigningRole(true);
    try {
      await organizationApi.assignUserRole({ userId: assignUserId, roleId: assignRoleId });
      setUsers((current) => current.map((user) => {
        if (user.id !== assignUserId || user.roleIds.includes(assignRoleId)) {
          return user;
        }
        return { ...user, roleIds: [...user.roleIds, assignRoleId] };
      }));
      toast({ title: "Role assigned", description: "The selected user now has the assigned role." });
    } catch (error) {
      toast({
        title: "Could not assign role",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAssigningRole(false);
    }
  };

  if (!selectedRole) {
    return (
      <SettingsLayout activeTab="/settings/permission">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Roles</h2>
              <p className="text-sm text-muted-foreground">Choose a role before grouping permissions or assigning the role to users.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card
                key={role.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-foreground">{role.name}</h3>
                      {role.isSystem && (
                        <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-medium">SYSTEM</span>
                      )}
                    </div>
                    {!role.isSystem && (
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Sheet open={showNewRole} onOpenChange={setShowNewRole}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Role</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label>Role Name <span className="text-destructive">*</span></Label>
                  <Input placeholder="Role name" defaultValue="RND" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="Input description role" />
                </div>
              </div>
              <div className="flex gap-3 mt-auto pt-8">
                <Button variant="outline" className="flex-1" onClick={() => setShowNewRole(false)}>Cancel</Button>
                <Button className="flex-1" onClick={() => setShowNewRole(false)}>Create</Button>
              </div>
            </SheetContent>
          </Sheet>

          <Button className="mt-4" onClick={() => setShowNewRole(true)}>Add New Role</Button>
        </div>
      </SettingsLayout>
    );
  }

  return (
    <SettingsLayout activeTab="/settings/permission">
      <div className="space-y-6">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">{selectedRoleRecord?.name}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Group readable permissions by business module, then assign the role to users after the role definition is complete.</p>
            </div>
            <div className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
              Active permissions: <span className="font-semibold text-foreground">{(selectedPermissions[selectedRole] ?? []).length}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setSelectedRole(null)} className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-foreground">{selectedRoleRecord?.name}</h2>
              {selectedRoleRecord?.isSystem && <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-medium">SYSTEM</span>}
            </div>
            <p className="text-sm text-muted-foreground">{selectedRoleRecord?.description}</p>
          </div>
        </div>

        <Tabs defaultValue="permission">
          <TabsList>
            <TabsTrigger value="permission">Permission</TabsTrigger>
            <TabsTrigger value="member">Member</TabsTrigger>
          </TabsList>

          <TabsContent value="permission" className="mt-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-foreground">Users with this role can access grouped organization capabilities</p>
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All employees</SelectItem>
                    <SelectItem value="department">Same department</SelectItem>
                    <SelectItem value="team">Same team</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <div className="mt-4 space-y-4">
              {permissionGroups.map((group) => (
                <Card key={group.module}>
                  <CardHeader>
                    <CardTitle className="text-base">{group.module}</CardTitle>
                    <CardDescription>Readable business permissions instead of raw internal codes.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {group.permissions.map((permission) => {
                      const checked = (selectedPermissions[selectedRole] ?? []).includes(permission.id);
                      return (
                        <label key={permission.id} className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-background p-4">
                          <div>
                            <p className="font-medium text-foreground">{permission.label}</p>
                            <p className="text-sm text-muted-foreground">{permission.description}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => togglePermission(selectedRole, permission.id)}
                            className="mt-1 h-4 w-4 rounded border-border"
                          />
                        </label>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-end">
                <Button onClick={handleSavePermissions} disabled={isSavingPermissions}>
                  {isSavingPermissions ? "Saving..." : "Save Permissions"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="member" className="mt-4">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <Card>
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Users with this role</CardTitle>
                    <CardDescription>Role membership is reusable and can expand to multi-role users later.</CardDescription>
                  </div>
                  <div className="relative w-full sm:w-56">
                    <Input placeholder="Search Member" className="pr-10" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roleMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium text-foreground">{member.firstName} {member.lastName}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{member.email}</TableCell>
                          <TableCell>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${member.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                              {member.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assign Role</CardTitle>
                  <CardDescription>Attach an existing role to an existing user after the permission set is ready.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>User</Label>
                    <Select value={assignUserId} onValueChange={setAssignUserId}>
                      <SelectTrigger><SelectValue placeholder="Select user" /></SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>{user.firstName} {user.lastName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select value={assignRoleId} onValueChange={setAssignRoleId}>
                      <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={handleAssignRole} disabled={isAssigningRole}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {isAssigningRole ? "Assigning..." : "Assign Role"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SettingsLayout>
  );
};

export default PermissionSettings;
