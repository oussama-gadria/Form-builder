import React from 'react';

import { Text } from '@chakra-ui/react';

export const Logo = () => {
  return (
    <Text as={'b'} fontSize={{ base: 'sm', sm: 'lg', md: '2xl' }}>
      MecaFix
    </Text>
  );
};
