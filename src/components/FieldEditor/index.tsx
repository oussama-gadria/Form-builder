import React, { useEffect, useState } from 'react';

import { Box, InputProps, Stack } from '@chakra-ui/react';
import { FieldProps, useField } from '@formiz/core';
import {
  ContentState,
  EditorState,
  SelectionState,
  convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import useEditorStore from '@/ZustandStores/FieldEditorStore';
import { FormGroup, FormGroupProps } from '@/components/FormGroup';

export type FieldEditorProps = FieldProps &
  Omit<FormGroupProps, 'placeholder'> &
  Pick<InputProps, 'type' | 'placeholder'> & {
    size?: 'sm' | 'md' | 'lg';
    autoFocus?: boolean;
    initialHtml?: string;
    setEditorContent?: (content: string) => void;
  };

export const FieldEditor = ({
  setEditorContent,
  ...props
}: FieldEditorProps) => {
  const {
    errorMessage,
    id,
    isValid,
    isPristine,
    isSubmitted,
    resetKey,
    setValue,
    otherProps,
  } = useField(props);
  const { children, label, helper, initialHtml, ...rest } = otherProps as Omit<
    FieldEditorProps,
    keyof FieldProps
  >;
  const { required } = props;
  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && ((isTouched && !isPristine) || isSubmitted);

  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);

  const formGroupProps = {
    errorMessage,
    helper,
    id,
    isRequired: !!required,
    label,
    showError,
    ...rest,
  };
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    const contentBlock = htmlToDraft(initialHtml || '');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [initialHtml]);

  useEffect(() => {
    const contentBlock = htmlToDraft(initialHtml || '');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      let editorState = EditorState.createWithContent(contentState);
      // Get the current content and the last block
      const content = editorState.getCurrentContent();
      const lastBlock = content.getLastBlock();
      const lastKey = lastBlock.getKey();
      const length = lastBlock.getLength();

      // Create a selection state at the end of the last block
      const selectionState = new SelectionState({
        anchorKey: lastKey,
        anchorOffset: length,
        focusKey: lastKey,
        focusOffset: length,
      });

      // Set the editor state with the new selection state
      editorState = EditorState.forceSelection(editorState, selectionState);
      setEditorState(editorState);
    }
  }, [initialHtml]);

  const setEditorValue = useEditorStore((state) => state.setEditorValue);

  const setFieldEditorValue = (value: TODO) => {
    setEditorValue(value);
  };

  return (
    <Stack>
      <FormGroup justifyContent="center" {...formGroupProps}>
        <Box border="1px" borderColor="gray.200" w="fit-content" {...rest}>
          <Editor
            editorState={editorState}
            onEditorStateChange={(newEditorState) => {
              const contentState = newEditorState.getCurrentContent();
              const rawContent = convertToRaw(contentState);
              const htmlContent = draftToHtml(rawContent);
              const modifiedHtmlContent = htmlContent
                .replace(/ data-value="[^"]*"/g, '')
                .replace(/ href="[^"]*"/g, '')
                .replace(/<a /g, '<span ')
                .replace(/<\/a>/g, '</span>');
              props.name === 'descriptionField'
                ? setFieldEditorValue(modifiedHtmlContent)
                : setValue(modifiedHtmlContent);
              setEditorState(newEditorState);

              if (setEditorContent) {
                setEditorContent(modifiedHtmlContent);
              }
            }}
            mention={{
              separator: ' ',
              trigger: '@',
              suggestions: [
                { text: 'Nom', value: '[name]@', url: '' },
                { text: 'Passport', value: '[passportId]@' },
                { text: 'Code postal', value: '[zipCode]@' },
                { text: 'Adresse', value: '[address]@' },
                { text: 'Nationalité', value: '[nationality]@' },
                { text: 'Ville', value: '[city]@' },
                { text: 'Numéro tel', value: '[phoneNumber]@' },
                { text: 'Email', value: '[email]@' },
                { text: 'Banque', value: '[bank]@' },
                { text: 'Code Iban', value: '[iban]@' },
                { text: 'Code Swift', value: '[swift]@' },
                { text: 'Date de naissance', value: '[birthDate]@' },
                { text: 'Salaire', value: '[salary]@' },
                { text: 'Période', value: '[period]@' },
                { text: 'Début contrat', value: '[startDate]@' },
                { text: 'Fin contrat', value: '[endDate]@' },
              ],
            }}
            hashtag={{}}
          />
          {children}
        </Box>
      </FormGroup>
      {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
    </Stack>
  );
};
