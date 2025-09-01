"use client"; // 👈 Thêm dòng này ở đầu file

import {
  Box,
  Heading,
  Text,
  VStack,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function HoTroTroGiup() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Gửi thành công",
      description: "Chúng tôi đã nhận được yêu cầu hỗ trợ của bạn.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setFormData({ email: "", message: "" });
  };

  return (
    <Box maxW="3xl" mx="auto" p={6}>
      <Heading size="lg" mb={4}>
        Hỗ trợ / Trợ giúp
      </Heading>
      <Text mb={6}>
        Nếu bạn gặp sự cố hoặc có câu hỏi, vui lòng liên hệ với chúng tôi bằng biểu mẫu bên dưới.
      </Text>
      <Card>
        <CardHeader>
          <Heading size="md">Gửi yêu cầu hỗ trợ</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Nội dung</FormLabel>
                <Textarea
                  placeholder="Mô tả vấn đề bạn đang gặp"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" alignSelf="flex-start">
                Gửi
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}
