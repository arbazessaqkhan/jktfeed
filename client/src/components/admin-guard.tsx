import { useEffect } from "react";
import { useLocation } from "wouter";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [, navigate] = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}