import { Button, Icon, Text, Box } from "@chakra-ui/react";
import { FaGooglePlay } from "react-icons/fa";
import React from "react";

interface PlayStoreBadgeProps {
    url?: string; // Optional prop for the Play Store link
}

const PlayStoreBadge: React.FC<PlayStoreBadgeProps> = ({ url = "https://play.google.com/store" }) => {
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
            <Icon as={FaGooglePlay} boxSize={5} mr={2} />
            <Box textAlign="left">
                <Text fontSize="xs" lineHeight="none">
                    Get it on
                </Text>
                <Text fontSize="lg" fontWeight="bold" lineHeight="none">
                    Google Play
                </Text>
            </Box>
        </Button>
    );
};

export default PlayStoreBadge;
