"use client";

import { Box, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ForbiddenPage() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, gray.50, gray.100)"
      px={6}
    >
      <VStack
        as={motion.div}
        spacing={6}
        p={10}
        borderRadius="2xl"
        bg="white"
        boxShadow="xl"
        textAlign="center"
        maxW="lg"
        w="full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Hình minh hoạ */}
        <Image
          src="https://www.canhcam.vn/assets/images/uploaded/Loi-403-la-gi/Lo%CC%82%CC%83i-403-La%CC%80-Gi%CC%80-03.webp"
          alt="403 Forbidden"
          boxSize="200px"
        />

        {/* Tiêu đề */}
        <Heading as="h1" size="2xl" color="red.500">
          403
        </Heading>

        {/* Nội dung */}
        <Text fontSize="lg" color="gray.600">
          Bạn không có quyền truy cập trang này.
        </Text>

        {/* Nút quay về */}
        <Button
          as={Link}
          href="/"
          colorScheme="red"
          size="lg"
          rounded="xl"
          px={8}
        >
          Về trang chủ
        </Button>
      </VStack>
    </Box>
  );
}
