import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const ProductHeader = ({ name, description, type, price }) => {
  return (
    <Box maxW="32rem">
      <Heading as="h2" size="2xl" mb={2}>
        {name.toUpperCase()}
      </Heading>
      <Text fontSize="md" casing="uppercase">
        <b>{description}</b>
      </Text>
      <Text fontSize="md">{type}</Text>
      <Heading as="h5" size="md" mt={2}>
        ${price}
      </Heading>
    </Box>
  );
};

export default ProductHeader;
