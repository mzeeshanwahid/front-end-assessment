import { AddIcon, MinusIcon, RepeatIcon } from '@chakra-ui/icons';
import { Flex, Img, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

const ProductGallary = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Flex
        direction={{ base: 'column', md: 'column', lg: 'row-reverse' }}
        gap={2}
      >
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <Flex direction="row-reverse" gap={2}>
              <Flex direction="column" w="10px" gap={2}>
                <AddIcon boxSize={5} onClick={() => zoomIn()} cursor="pointer" bg="gray.200" p="5px" />
                <MinusIcon boxSize={5} onClick={() => zoomOut()} cursor="pointer" bg="gray.200" p="5px" />
                <RepeatIcon boxSize={5} onClick={() => resetTransform()} cursor="pointer" bg="gray.200" p="5px" />
              </Flex>
              <TransformComponent flex={1}>
                <Img
                  src={images[index]}
                  alt="avatar"
                  loading="eager"
                  objectFit="cover"
                  width={{ md: '100%', lg: '80%' }}
                />
              </TransformComponent>
            </Flex>
          )}
        </TransformWrapper>
        <Stack
          direction={{ md: 'row', lg: 'column' }}
          overflowX="auto"
          minW={['50px', '80px']}
        >
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
