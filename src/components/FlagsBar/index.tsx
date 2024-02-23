import React, { FC } from 'react';

import { HStack, Image } from '@chakra-ui/react';

import { Flag } from './Flag.types';

interface flagsProps {
  flags: Flag[];
  onFlagClick: (id: string) => void;
}
export const FlagsBar: FC<flagsProps> = ({ flags, onFlagClick }) => {
  const handleFlagClick = (flag: Flag) => {
    onFlagClick(flag.id); // Appeler la fonction de rappel avec l'id du drapeau
  };
  return (
    <HStack mb={6}>
      {flags.map((flag, i) => (
        <Image
          id={flag.id}
          key={i}
          src={flag.flag}
          alt={flag.name}
          onClick={() => handleFlagClick(flag)}
          style={{ cursor: 'pointer' }}
          title={flag.name}
        />
      ))}
    </HStack>
  );
};
