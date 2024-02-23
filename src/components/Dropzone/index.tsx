import React from 'react';

import {
  Button,
  Center,
  CenterProps,
  HStack,
  Icon,
  Square,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiUploadCloud } from 'react-icons/fi';

interface DropzoneProps extends CenterProps {
  onClick: () => TODO;
}

export const Dropzone = (props: DropzoneProps) => {
  const { t } = useTranslation(['common']);
  return (
    <Center
      borderWidth="1px"
      borderRadius="lg"
      px="6"
      py="4"
      bg={useColorModeValue('white', 'gray.800')}
      {...props}
    >
      <VStack spacing="3">
        <Square size="10" bg="bg-subtle" borderRadius="lg">
          <Icon as={FiUploadCloud} boxSize="5" color="muted" />
        </Square>
        <VStack spacing="1">
          <HStack spacing="1" whiteSpace="nowrap">
            <Button variant="link" colorScheme="blue" size="sm">
              {t('common:use.clickToDownload')}
            </Button>
          </HStack>
          <Text fontSize="xs" color="muted">
            {"PNG, JPG ou GIF jusqu'à 2 Mo"}
          </Text>
        </VStack>
      </VStack>
    </Center>
  );
};
