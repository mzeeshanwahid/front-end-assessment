import {
  Box,
  Flex,
  Heading,
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
import data from '../../data.json';
import Loader from '../Loader';

const ProductPopup = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [sizes, setSizes] = useState();
  const [selectedSize, setSelectedSize] = useState('');
  const [selection, setSelection] = useState([]);
  const [disableAll, setDisableAll] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    let sizes = {};
    for (let size of data.solid[0].size) {
      const keys = Object.keys(size);
      sizes[`${keys[0]}`] = size[keys[0]];
    }
    setSizes(sizes);
  }, []);

  useEffect(() => {
    const selectFirstActive = () => {
      let active = '';
      for (let [key, value] of Object.entries(sizes)) {
        if (value.status === 'Active') {
          active = key;
          break;
        }
      }
      setSelectedSize(active);
    };

    if (sizes && Object.keys(sizes).length) {
      selectFirstActive();
    }
  }, [sizes]);

  useEffect(() => {
    if (selection && selection.length > 2) {
      const lastIndex = selection.length - 1;
      if (
        selection[lastIndex] === 'S' &&
        selection[lastIndex - 1] === 'XL' &&
        selection[lastIndex - 2] === 'S'
      ) {
        setDisableAll(true);
      }
    }
  }, [selection]);

  const onSizeSelect = (size, value) => {
    if (!disableAll && value.status === 'Active') {
      setSelectedSize(size);

      const newSelection = [...selection, size];
      setSelection(newSelection);
    }
  };

  const onModalClose = () => {
    if (disableAll) {
      setDisableAll(false);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onModalClose} size={['sm', 'lg', '5xl']}>
      <ModalOverlay />
      {loading ? (
        <ModalContent>
          <Loader />
        </ModalContent>
      ) : (
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {selectedSize && (
              <Box textAlign="right" pt={1} pr={10}>
                {sizes[selectedSize].variant_id}
              </Box>
            )}

            <Flex
              direction={{ base: 'column', md: 'column', lg: 'row' }}
              justify="space-between"
              gap={10}
              pb={5}
            >
              <Flex
                direction={{ base: 'column', md: 'column-reverse' }}
                justify="space-between"
                gap={5}
              >
                <Box display={{ base: 'flex', md: 'flex', lg: 'none' }}>
                  <ProductHeader
                    name={data.name}
                    description={data.description}
                    type={data.type}
                    price={selectedSize ? sizes[selectedSize].price : '0.00'}
                  />
                </Box>
                <ProductGallary images={data.solid[0].images} />
              </Flex>
              <Box mb={5}>
                <Box display={{ base: 'none', md: 'none', lg: 'flex' }} mb={5}>
                  <ProductHeader
                    name={data.name}
                    description={data.description}
                    type={data.type}
                    price={selectedSize ? sizes[selectedSize].price : '0.00'}
                  />
                </Box>
                <Heading as="h5" size="sm" mb={2}>
                  Size
                </Heading>
                <Flex
                  direction={{
                    base: 'column',
                    md: 'row',
                    lg: 'column',
                  }}
                  justify="space-between"
                  gap={5}
                  minH={{ lg: '250px' }}
                  alignItems="center"
                >
                  <ProductSizes
                    sizes={sizes}
                    selected={selectedSize}
                    onChange={onSizeSelect}
                    disableAll={disableAll}
                  />
                  <AddToCart disable={disableAll} />
                </Flex>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ProductPopup;
