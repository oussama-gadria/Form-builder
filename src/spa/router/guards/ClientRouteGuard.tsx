import { FC } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useAccount } from '@/spa/account/account.service';

export const ClientRouteGuard: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { isClient, isLoading } = useAccount();

  if (isLoading) {
    return null;
  }

  if (!isClient) {
    return <ErrorPage errorCode={403} />;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};
