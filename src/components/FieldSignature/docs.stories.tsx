import React from 'react';

import { Box, Button, Stack } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';

import { FieldSignature } from './index';

export default {
  title: 'Fields/FieldSignature',
};

export const Default = () => (
  <Formiz onSubmit={console.log} autoForm>
    <Stack spacing={4}>
      <FieldSignature
        name="demo-username"
        label="Username"
        placeholder="Placeholder"
        helper="This is an helper"
        required="Username is required"
      />

      <Box>
        <Button type="submit">Submit</Button>
      </Box>
    </Stack>
  </Formiz>
);
