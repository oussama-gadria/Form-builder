import React, { FC, useEffect, useState } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import '@/config';
import theme from '@/theme';

import { AVAILABLE_LANGUAGES } from './constants/i18n';

const queryClient = new QueryClient();

const useMocksServer = () => {
  const [isLoadingMocks, setIsLoadingMocks] = useState(
    !process.env.NEXT_PUBLIC_API_BASE_URL
  );

  return { isLoadingMocks };
};

export const Providers: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const { isLoadingMocks } = useMocksServer();

  return (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider
          theme={{
            ...theme,
            direction:
              AVAILABLE_LANGUAGES.find(({ key }) => key === i18n.language)
                ?.dir ?? 'ltr',
          }}
        >
          {!isLoadingMocks && children}
        </ChakraProvider>
    </QueryClientProvider>
  );
};
