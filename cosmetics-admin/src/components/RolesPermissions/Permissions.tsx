"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Shield } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetPermissionsGroupedQuery,
  useSetRolePermissionsMutation,
} from "@/redux/api/rbacApi";
import { useNavigate } from "@/lib/utils/router";
import { useGetRoleQuery } from "@/redux/api/roleApi";

type UiPermission = {
  id: number;
  label: string;
  checked: boolean;
};

type UiSection = {
  title: string;
  permissions: UiPermission[];
};

const Permissions = ({ roleId }: { roleId: number }) => {
  const navigate = useNavigate();

  const {
    data: roleRes,
    isLoading: roleLoading,
    isError: roleError,
  } = useGetRoleQuery(roleId as any);

  const {
    data: groupedRes,
    isLoading: permLoading,
    isError: permError,
  } = useGetPermissionsGroupedQuery();

  const [setRolePermissions, { isLoading: saving }] =
    useSetRolePermissionsMutation();

  const [activeTab, setActiveTab] = useState("permissions");
  const [sections, setSections] = useState<UiSection[]>([]);

  // Normalize API shapes
  const roleData: any = (roleRes as any)?.data ?? roleRes;
  const groupedRaw: any = (groupedRes as any)?.data ?? groupedRes;

  /**
   *  Role's allowed permission ids
   * Your rolePermissions array contains: { allowed, permissionId, permission { id, ... } }
   */
  const rolePermissionIdSet = useMemo(() => {
    const ids: number[] =
      roleData?.rolePermissions
        ?.filter((rp: any) => rp?.allowed === true)
        ?.map((rp: any) => Number(rp.permission?.id ?? rp.permissionId)) ??
      roleData?.permissions?.map((p: any) => Number(p.id)) ??
      [];
    return new Set(ids);
  }, [roleData]);

  const grouped = useMemo(() => {
    if (!groupedRaw) return null;

    // already grouped object
    if (!Array.isArray(groupedRaw) && typeof groupedRaw === "object") {
      return groupedRaw;
    }

    // fallback: array -> group by group field
    if (Array.isArray(groupedRaw)) {
      return groupedRaw.reduce((acc: any, p: any) => {
        const key = p?.group || "General";
        acc[key] = acc[key] || [];
        acc[key].push(p);
        return acc;
      }, {});
    }

    return null;
  }, [groupedRaw]);

  // Build UI sections
  useEffect(() => {
    if (!grouped) return;

    const nextSections: UiSection[] = Object.entries(grouped).map(
      ([moduleName, perms]: any) => ({
        title: String(moduleName || "General"),
        permissions: (perms ?? []).map((p: any) => {
          const id = Number(p.id);
          return {
            id,
            label: p.name || p.key,
            checked: rolePermissionIdSet.has(id),
          };
        }),
      }),
    );

    setSections(nextSections);
  }, [grouped, rolePermissionIdSet]);

  // ---------- Checkbox state helpers (with indeterminate) ----------

  const totalPerms = useMemo(
    () => sections.reduce((sum, s) => sum + s.permissions.length, 0),
    [sections],
  );

  const totalChecked = useMemo(
    () =>
      sections.reduce(
        (sum, s) => sum + s.permissions.filter((p) => p.checked).length,
        0,
      ),
    [sections],
  );

  const selectAllState: boolean | "indeterminate" =
    totalPerms === 0
      ? false
      : totalChecked === 0
        ? false
        : totalChecked === totalPerms
          ? true
          : "indeterminate";

  const isSectionState = (section: UiSection): boolean | "indeterminate" => {
    const total = section.permissions.length;
    const checked = section.permissions.filter((p) => p.checked).length;

    if (total === 0) return false;
    if (checked === 0) return false;
    if (checked === total) return true;
    return "indeterminate";
  };

  // ---------- Handlers ----------

  const handleSelectAll = (checked: boolean) => {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        permissions: section.permissions.map((p) => ({ ...p, checked })),
      })),
    );
  };

  const handleSelectSection = (sectionIndex: number, checked: boolean) => {
    setSections((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              permissions: section.permissions.map((p) => ({ ...p, checked })),
            }
          : section,
      ),
    );
  };

  const handlePermissionChange = (
    sectionIndex: number,
    permissionId: number,
    checked: boolean,
  ) => {
    setSections((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              permissions: section.permissions.map((p) =>
                p.id === permissionId ? { ...p, checked } : p,
              ),
            }
          : section,
      ),
    );
  };

  const handleUpdatePermissions = async () => {
    const permissionIds = sections
      .flatMap((s) => s.permissions)
      .filter((p) => p.checked)
      .map((p) => p.id);

    if (permissionIds.length === 0) {
      toast.error("Please select at least one permission");
      return;
    }

    const tId = toast.loading("Updating permissions...");
    try {
      await setRolePermissions({ roleId, permissionIds }).unwrap();
      toast.dismiss(tId);
      toast.success("Permissions updated successfully");
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.data?.errors?.join?.(", ") ||
        err?.error ||
        "Failed to update permissions";
      toast.dismiss(tId);
      toast.error(msg);
      console.error(err);
    }
  };

  const pageLoading = roleLoading || permLoading;
  const pageError = roleError || permError;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">Permissions</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 mb-6">
          <TabsTrigger
            value="roles"
            onClick={() => navigate("/roles/add")}
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-4 py-3 text-sm gap-2"
          >
            <Users className="w-4 h-4" />
            ROLES
          </TabsTrigger>

          <TabsTrigger
            value="permissions"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-4 py-3 text-sm gap-2"
          >
            <Shield className="w-4 h-4" />
            PERMISSIONS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="permissions" className="mt-0 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-lg font-semibold">
              Update -{" "}
              <span className="text-primary">{roleData?.name ?? "Role"}</span> -
              Permissions
            </h2>

            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={selectAllState}
                onCheckedChange={(val) => handleSelectAll(Boolean(val))}
                disabled={pageLoading || sections.length === 0}
              />
              <label
                htmlFor="select-all"
                className="text-sm font-medium cursor-pointer"
              >
                Select All
              </label>
            </div>
          </div>

          {pageLoading && (
            <div className="text-sm text-muted-foreground">Loading...</div>
          )}

          {pageError && (
            <div className="text-sm text-red-600">
              Failed to load permissions/role data.
            </div>
          )}

          {!pageLoading && !pageError && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sections.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                    <h3 className="font-semibold text-primary">
                      {section.title}
                    </h3>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`section-${sectionIndex}`}
                        checked={isSectionState(section)}
                        onCheckedChange={(val) =>
                          handleSelectSection(sectionIndex, Boolean(val))
                        }
                      />
                      <label
                        htmlFor={`section-${sectionIndex}`}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Select Section
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {section.permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          id={`perm-${permission.id}`}
                          checked={permission.checked}
                          onCheckedChange={(val) =>
                            handlePermissionChange(
                              sectionIndex,
                              permission.id,
                              Boolean(val),
                            )
                          }
                        />
                        <label
                          htmlFor={`perm-${permission.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4">
            <Button
              onClick={handleUpdatePermissions}
              size="lg"
              disabled={pageLoading || saving || sections.length === 0}
            >
              {saving ? "Updating..." : "Update Permissions"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Permissions;
