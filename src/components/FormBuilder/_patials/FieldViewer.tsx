import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';

import { useFormBuilderContext } from '../FormBuilderContext';
import { FieldFormViewer } from './FieldFormViewer';
import { useToastSuccess } from '@/components/Toast';

export const FieldViewer = () => {
  const { inputs } = useFormBuilderContext();
  const form = useForm();
  const successToast = useToastSuccess();
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Json data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as="pre" fontSize="sm">
              {JSON.stringify(inputs, null, 2)}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack borderRadius={6} bg="gray.50" boxShadow="md" p="4">
        {inputs.length && <Formiz connect={form} autoForm>
          {inputs.map((input) => (
            <FieldFormViewer key={input.id} input={input} />
          ))}
          <Button
            onClick={() => successToast({ title: "Enregistrer avec succées" })}
            colorScheme="whatsapp"
            size={'sm'}
            px={'4'}
          >
            Save
          </Button>
          <Button
            onClick={onOpen}
            colorScheme="red"
            size={'sm'}
            px={'4'}
            mx={'2'}
          >
            [{'...'}]
          </Button>
        </Formiz>}
        {
          !inputs.length && <Text>The form has not yet been completed to date. If you wish to build your own form, please click on the &apos;Edit Form&apos; button</Text>
        }
      </Stack>
    </>

  );
};
