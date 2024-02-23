import { FC } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useAccount } from '@/spa/account/account.service';

export const SuperAdminRouteGuard: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { isSuperAdmin, isLoading } = useAccount();

  if (isLoading) {
    return null;
  }

  if (!isSuperAdmin) {
    return <ErrorPage errorCode={403} />;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};
