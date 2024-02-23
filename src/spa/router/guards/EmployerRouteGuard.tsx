import { FC } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useAccount } from '@/spa/account/account.service';

export const EmployerRouteGuard: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { isLoading } = useAccount();

  if (isLoading) {
    return null;
  }

 

  return <ErrorBoundary>{children}</ErrorBoundary>;
};
