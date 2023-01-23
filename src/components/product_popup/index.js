import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AddToCart from './AddToCart';
import ProductGallary from './Gallary';
import ProductHeader from './Header';
import ProductSizes from './Sizes';
import data from "../../data.json";

const ProductPopup = ({ isOpen, onClose }) => {
  const [sizes, setSizes] = useState();

  useEffect(() => {
    let sizes = {};
    for (let size of data.solid[0].size) {
      const keys = Object.keys(size);
      sizes[`${keys[0]}`] = size[keys[0]];
    }
    setSizes(sizes);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={['sm', 'lg', '5xl']}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <ProductHeader
            name={data.name}
            description={data.description}
            type={data.type}
            price="17.00"
          />
          <Box mt={10}>
            <ProductGallary images={data.solid[0].images} />
          </Box>

          <Box mt={4}>
            <ProductSizes sizes={sizes} selected="XL" />
          </Box>

          <Box mt={5} mb={5}>
            <AddToCart />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductPopup;
