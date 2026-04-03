"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Users from "@/components/users/Users";

export default function Page() {
  return (
    <ProtectedRoute requiredPermissions={["user_create"]}>
      <Users />
    </ProtectedRoute>
  );
}
