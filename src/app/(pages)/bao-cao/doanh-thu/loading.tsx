import { Box, SkeletonText, SkeletonCircle } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Box padding="6" boxShadow="lg" bg="white" borderRadius="md">
            <SkeletonCircle size="10" mb="4" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
    );
}
