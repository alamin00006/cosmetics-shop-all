"use client";

import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-background">
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  //         <p className="text-muted-foreground">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   // Redirect to login page with return URL
  //   return <Navigate to="/auth" state={{ from: location }} replace />;
  // }

  return <>{children}</>;
};
