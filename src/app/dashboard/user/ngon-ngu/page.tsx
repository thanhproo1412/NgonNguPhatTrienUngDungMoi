"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  RadioGroup,
  Radio,
  Stack,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";

export default function NgonNguPage() {
  const [language, setLanguage] = useState("vi");
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: "Cập nhật thành công!",
      description: `Ngôn ngữ đã được đổi sang ${
        language === "vi" ? "Tiếng Việt" : language === "en" ? "English" : "日本語"
      }`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="700px" mx="auto" p={6}>
      <Heading size="lg" mb={2}>
        Ngôn ngữ
      </Heading>
      <Text color="gray.600" mb={6}>
        Chọn ngôn ngữ bạn muốn sử dụng trong ứng dụng. Thay đổi sẽ áp dụng ngay
        sau khi lưu.
      </Text>

      <Card shadow="md" borderRadius="xl">
        <CardHeader>
          <Heading size="md">Lựa chọn ngôn ngữ</Heading>
        </CardHeader>
        <Divider />
        <CardBody>
          <RadioGroup value={language} onChange={setLanguage}>
            <Stack spacing={4}>
              <Radio value="vi">Tiếng Việt</Radio>
              <Radio value="en">English</Radio>
              <Radio value="ja">日本語 (Japanese)</Radio>
              <Radio value="fr">Français</Radio>
              <Radio value="de">Deutsch</Radio>
            </Stack>
          </RadioGroup>

          <Button
            mt={6}
            colorScheme="blue"
            onClick={handleSave}
            borderRadius="full"
          >
            Lưu thay đổi
          </Button>
        </CardBody>
      </Card>
    </Box>
  );
}
