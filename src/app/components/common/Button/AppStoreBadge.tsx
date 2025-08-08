import { Button, Icon, Text, Box } from "@chakra-ui/react";
import { FaApple } from "react-icons/fa";
import React from "react";

interface AppStoreBadgeProps {
    url?: string; // Optional prop for the App Store link
}



const AppStoreBadge: React.FC<AppStoreBadgeProps> = ({ url = "https://apps.apple.com/" }) => {
    return (
        <Button
            as="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            bg="black"
            color="white"
            px={4}
            py={2}
            borderRadius="md"
            _hover={{ bg: "gray.800" }}
        >
            <Icon as={FaApple} boxSize={5} mr={2} />
            <Box textAlign="left">
                <Text fontSize="xs" lineHeight="none">
                    Download on the
                </Text>
                <Text fontSize="lg" fontWeight="bold" lineHeight="none">
                    App Store
                </Text>
            </Box>
        </Button>
    );
};

export default AppStoreBadge;
