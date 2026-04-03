import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "@/old-pages/Index";

export default function Page() {
  return (
    // <ProtectedRoute requiredPermissions={["dashboard"]}>
    <Index />
    // </ProtectedRoute>
  );
}
