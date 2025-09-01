"use client";

import {
  Box,
  Heading,
  Text,
  Avatar,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  useToast,
  SimpleGrid,
  Switch,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { useState } from "react";

export default function QuanLyTaiKhoanPage() {
  const toast = useToast();
  const [form, setForm] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    password: "",
    darkMode: true,
    twoFactor: false,
  });

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    toast({
      title: "Cập nhật thành công",
      description: "Thông tin tài khoản của bạn đã được lưu.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6} maxW="5xl" mx="auto">
      <Heading size="lg" mb={6}>
        Quản Lý Tài Khoản
      </Heading>

      {/* Thông tin tài khoản */}
      <Card mb={6} shadow="md" borderRadius="2xl">
        <CardBody>
          <HStack spacing={6}>
            <Avatar size="xl" name={form.name} />
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold" fontSize="xl">
                {form.name}
              </Text>
              <Text color="gray.600">{form.email}</Text>
              <Text fontSize="sm" color="gray.500">
                Vai trò: Quản trị viên
              </Text>
            </VStack>
          </HStack>
        </CardBody>
      </Card>

      {/* Form chỉnh sửa */}
      <Card shadow="md" borderRadius="2xl">
        <CardHeader>
          <Heading size="md">Chỉnh Sửa Thông Tin</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Họ và tên</FormLabel>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nhập họ tên"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Nhập email"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Mật khẩu mới</FormLabel>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Để trống nếu không đổi mật khẩu"
              />
            </FormControl>

            <Divider />

            {/* Tuỳ chọn bảo mật & hiển thị */}
            <SimpleGrid columns={[1, 2]} spacing={6}>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Chế độ tối</FormLabel>
                <Switch
                  name="darkMode"
                  isChecked={form.darkMode}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Xác thực hai bước</FormLabel>
                <Switch
                  name="twoFactor"
                  isChecked={form.twoFactor}
                  onChange={handleChange}
                />
              </FormControl>
            </SimpleGrid>

            <Button colorScheme="teal" onClick={handleSave}>
              Lưu Thay Đổi
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
