'use client'
import { Box, Center, Container, Wrap, WrapItem, useDisclosure, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react'

export const ImageBox = () => {
  return (
    <Box mt='66px' pt='100px'>
      <ImageBoxs imgList={imgList} />
    </Box>
  );
};


export const ImageBoxs = ({ imgList }: ImageBoxsProps) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box >
      <Box paddingTop='16px'>
        <Container
          maxW='container.sm'
          minH={'600px'}
          background={'white'}
          padding={'0'}
          border={'solid 0px yellow'}
          borderRadius='8px'
          paddingBottom='12px'
          boxShadow="lg">
          <Wrap spacing='16px' justify='center'>
            {imgList.map((image, index) => (
              <BoxImage key={index} img={image.img ? String(image.img) : 'path/to/placeholder-image.jpg'} />
            ))}

          </Wrap>

        </Container >
      </Box >



    </Box>
  );
};

export const BoxImage = ({ img }: BoxImageProps) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

  return (
    <WrapItem w='40%' h='50%' >
      <Center>
        <Image
          cursor={'pointer'}
          onClick={onOpen}
          boxSize='100%'
          src={img}
          alt='Image of the post'
        />
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'>
          <ModalOverlay />
          <ModalContent h='80%'>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                boxSize='100%'
                w='100%'
                inset='calc(0% + 0px) calc(0% + 0px) calc(33.3333% + 1.01px)'
                src={img}
                alt='Image of the post' />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>
    </WrapItem>
  )
}

interface BoxImageProps {
  img: string;
}

interface ImageProps {
  img?: string | URL | undefined;
}

interface ImageBoxsProps {
  imgList: ImageProps[];
}

const imgList: Array<ImageProps> = [
  {
    img: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg',
  },
  {
    img: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg',
  },
  {
    img: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg',
  },
  {
    img: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg',
  },
  {
    img: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg',
  },
];
