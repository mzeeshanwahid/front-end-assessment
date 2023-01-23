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

    return () => {
      setLoading(true);
    };
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
          {selectedSize && (
            <Box textAlign="right" mt={10} pr={5}>
              {sizes[selectedSize].variant_id}
            </Box>
          )}
          <ModalBody>
            <ProductHeader
              name={data.name}
              description={data.description}
              type={data.type}
              price={selectedSize ? sizes[selectedSize].price : '0.00'}
            />
            <Box mt={10}>
              <ProductGallary images={data.solid[0].images} />
            </Box>

            <Box mt={4}>
              <ProductSizes
                sizes={sizes}
                selected={selectedSize}
                onChange={onSizeSelect}
                disableAll={disableAll}
              />
            </Box>

            <Box mt={5} mb={5}>
              <AddToCart disable={disableAll} />
            </Box>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ProductPopup;
