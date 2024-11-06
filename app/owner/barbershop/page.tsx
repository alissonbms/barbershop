"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardProtected = () => {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status]);

  if (status === "authenticated") {
    return <div>Criar sua barbearia</div>;
  }
  return <h1>Loading...</h1>;
};
export default DashboardProtected;
