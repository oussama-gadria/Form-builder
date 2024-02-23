import { FC } from 'react';

import {
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
} from '@chakra-ui/react';
import { useForm } from '@formiz/core';
import { FiTrash2 } from 'react-icons/fi';

import { FieldHidden } from '@/components/FieldHidden';
import { Icon } from '@/components/Icons';

import { SelectOptionsEditer } from './SelectOptionsEditer';

const SelectBuilderEditor = () => {
  const form = useForm();

  const {
    setFieldsValues,
    values: { options = [] },
  } = form;

  return (
    <>
      <FieldHidden name="options" />
      <Popover placement="left-start" >
        <PopoverTrigger>
          <Button>Add options</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <SelectOptionsEditer
              updateForm={setFieldsValues}
              optionsFormValues={options}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            {!!options?.length && (
              <Tr>
                <Th>value</Th>
                <Th>key</Th>
                <Th>Delete</Th>
              </Tr>
            )}
            {options?.map((option: TODO, index: number) => (
              <Tr key={index}>
                <Td>{option.value}</Td>
                <Td>{option.label}</Td>
                <Td>
                  <IconButton
                    aria-label="close"
                    colorScheme="error"
                    icon={<Icon icon={FiTrash2} />}
                    onClick={() => {
                      setFieldsValues({
                        options: options.filter(
                          (item: TODO, i: number) => i !== index
                        ),
                      });
                    }}
                    size="xs"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const FieldPropsSelectorMap: {
  [key: string]: FC | null;
} = {
  FieldSelect: SelectBuilderEditor,
  FieldInput: () => <></>,
  FieldCheckboxes: SelectBuilderEditor,
  FieldImage64bit: () => <></>,
  FieldRadios: SelectBuilderEditor,
  FieldTextarea: () => <></>,
  FieldDayPicker: () => <></>,
  FieldEditor: () => <></>,
};

interface FieldPropsSelectorProps {
  type: string;
}

export const FieldPropsSelector: FC<FieldPropsSelectorProps> = ({ type }) => {
  const PropsSelector = (
    FieldPropsSelectorMap as { [key: string]: FC | null }
  )[type] || null;
  return PropsSelector ? <PropsSelector /> : null;
};