import { FC, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';

export const AuthenticatedRouteGuard: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();


  return <></>;
};
