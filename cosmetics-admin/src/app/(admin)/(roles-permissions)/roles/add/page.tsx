"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Role from "@/components/RolesPermissions/Role";

export default function Page() {
  return (
    <ProtectedRoute>
      <Role />
    </ProtectedRoute>
  );
}
3;
