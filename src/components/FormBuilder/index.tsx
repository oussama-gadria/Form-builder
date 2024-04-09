import React,{ useState } from 'react';

import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { FormBuilderProvider } from './FormBuilderContext';
import { FieldEditor } from './_patials/FieldEditor';
import { FieldViewer } from './_patials/FieldViewer';

export const FormBuilder = () => {
  const { t } = useTranslation(['formBuilder']);
  const [isDisplayFormEditor, setIsDisplayFormEditor] = useState(false);

  return (
    <FormBuilderProvider>
     <Heading
        as="h1"
        size="2xl"
        py={10}
        color="black.500"
        fontWeight="bold"
        textAlign="center"
        mt={5}
      >
        Build Your Unique Form 
      </Heading>
       <Button
          color={'green'}
          mb={3}
          alignSelf="flex-end"
          onClick={() => setIsDisplayFormEditor(!isDisplayFormEditor)}
        >
          {t('formBuilder:EditTheForm')}
        </Button>
      <Stack
        spacing="8"
        direction={{ base: 'column', md: 'row' }}
        w="full"
        bg="gray.100"
        p="4"
        borderRadius="8"
        boxShadow="md"
      >
        {isDisplayFormEditor && (
          <Stack flex="4">
            <FieldEditor />
          </Stack>
        )}
        <Stack flex={!isDisplayFormEditor ? '12' : '8'}>
          <FieldViewer />
          
        </Stack>
      </Stack>
      <Text color="gray.500" fontSize="md" textAlign="center" my='4px' >
            Build with ❤ by Oussama Gadria
          </Text>
    </FormBuilderProvider>
  );
};
