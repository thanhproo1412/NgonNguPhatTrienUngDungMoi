import { Box, Image } from '@chakra-ui/react';

function ZoomImage({ src, alt }: { src: string; alt: string }) {
    return (
        <Box
            overflow="hidden"
            rounded="lg"
            position="relative"
            _hover={{
                cursor: "pointer",
            }}
            w="full" // Optional: set the width of the image container
        >
            <Image
                src={src}
                alt={alt}
                transition="transform 0.3s ease-in-out"
                _hover={{
                    transform: "scale(1.2)", // Zoom effect
                }}
                objectFit="cover"
                w="full"
                h="full" // Ensure it scales consistently
            />
        </Box>
    );
}

export default ZoomImage;
