"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

export default function DashboardView() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <h1>Dashboard View</h1>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
