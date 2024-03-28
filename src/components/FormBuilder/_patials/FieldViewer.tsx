import { Button, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';

import { useFormBuilderContext } from '../FormBuilderContext';
import { FieldFormViewer } from './FieldFormViewer';

export const FieldViewer = () => {
  const { inputs } = useFormBuilderContext();
  const form = useForm();

  return (
    <Stack borderRadius={6} bg="gray.50" boxShadow="md" p="4">
      <Formiz connect={form} autoForm>
        {inputs.map((input) => (
          <FieldFormViewer key={input.id} input={input} />
        ))}
        <Button
          onClick={()=>console.log('-------',inputs)}
          colorScheme="whatsapp"
          size={'xs'}
          px={'4'}
        >
          Save
        </Button>
      </Formiz>
    </Stack>
  );
};
