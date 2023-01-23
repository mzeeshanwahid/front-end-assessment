import { Center, Flex } from '@chakra-ui/react';
import React from 'react';

const ProductSizes = ({ sizes, selected }) => {
  return (
    <Flex justify="space-between" w="100%" gap={2}>
      {Object.entries(sizes).map(([size, value]) => (
        <Center
          key={size}
          p={2}
          w="50px"
          bg={value.status === "Inactive" ? 'gray.200' : selected === size ? 'gray.700' : 'white'}
          color={selected === size ? 'white' : 'grey.500'}
          outline={value.status === "Inactive" ? "2px dashed gray" : "2px solid black"}
          boxSizing='border-box'
          cursor={value.status === "Inactive" ? "not-allowed" : "pointer"}
          disabled={value.status === "Inactive"}
        >
          {size}
        </Center>
      ))}
    </Flex>
  );
};

export default ProductSizes;
