import { Button } from '@chakra-ui/react';
import React from 'react';

const AddToCart = ({ disable }) => {
  return (
    <Button colorScheme="red" size="lg" w="100%" disabled={disable}>
      Add to Cart
    </Button>
  );
};

export default AddToCart;
