"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardView() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <h1>Dashboard View</h1>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
