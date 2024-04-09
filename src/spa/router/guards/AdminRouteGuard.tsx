import { FC } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';

export const AdminRouteGuard: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {

  return <ErrorBoundary>{children}</ErrorBoundary>;
};
