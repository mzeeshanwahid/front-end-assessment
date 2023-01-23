import { Flex, Img, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';

const ProductGallary = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Flex direction="column" gap={2}>
        <Img
          src={images[index]}
          alt="avatar"
          loading="eager"
          objectFit="cover"
          width={{ md: '100%', lg: '80%' }}
        />
        <Stack direction="row" mt={5} overflowX="auto">
          {images.map((image, imgIndex) => (
            <Img
              boxSize={['50px', '80px']}
              objectFit="cover"
              src={image}
              alt={`thumb_${imgIndex + 1}`}
              key={`thumb_${imgIndex + 1}`}
              loading="lazy"
              onClick={e => setIndex(imgIndex)}
              border={imgIndex === index ? '2px' : 'none'}
              borderColor="gray.400"
            />
          ))}
        </Stack>
      </Flex>
    </>
  );
};

export default ProductGallary;
