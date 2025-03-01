"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";

import { Loader } from "lucide-react";

import useValidateAuth from "@/hooks/auth/useValidateAuth";

import GlobalTypes from "@/types/globals";

interface AuthValidatorProps extends GlobalTypes.BaseWrapperProps {
  globalRoute?: boolean;
}

const AuthValidator = ({ globalRoute = false, children }: AuthValidatorProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutateAsync: validateAuthAsync, isPending: isValidationPending, error: authError } = useValidateAuth();

  React.useEffect(() => {
    validateAuthAsync()
      .then((authState) => {
        if (!authState.isSuccess || !(authState.data && authState.data.isAuthenticated) || authError) {
          return router.push("/auth/login");
        }
        if (globalRoute) {
          return router.push("/app");
        }
      })
      .catch(() => router.replace("/auth/login"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (isValidationPending) {
    return (
      <div className="w-dvw h-dvh flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-1">
          <Loader className="w-6 h-6 min-h-6 min-w-6 animate-spin" />
          <span className="text-sm text-muted-foreground">Checking your session...</span>
        </div>
      </div>
    );
  }
  return children;
};

export default AuthValidator;
