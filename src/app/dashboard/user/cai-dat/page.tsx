"use client";

import { 
  Box, Heading, Text, Flex, Avatar, Button, Input, 
  FormControl, FormLabel, Switch, Divider, VStack, Select 
} from "@chakra-ui/react";

export default function CaiDatPage() {
  return (
    <Box p={8} maxW="4xl" mx="auto">
      {/* Header */}
      <Heading size="lg" mb={6} textAlign="center">
        Cài đặt tài khoản
      </Heading>

      {/* Hồ sơ cá nhân */}
      <Box bg="white" p={6} borderRadius="xl" shadow="md" mb={6}>
        <Flex align="center" gap={6}>
          <Avatar size="xl" name="Nguyen Van A" src="/avatar.png" />
          <VStack align="flex-start" spacing={3} flex="1">
            <FormControl>
              <FormLabel>Họ và tên</FormLabel>
              <Input placeholder="Nhập họ và tên" defaultValue="Nguyen Van A" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Nhập email" defaultValue="user@email.com" />
            </FormControl>
            <FormControl>
              <FormLabel>Số điện thoại</FormLabel>
              <Input placeholder="Nhập số điện thoại" defaultValue="0123456789" />
            </FormControl>
          </VStack>
        </Flex>
        <Flex justify="flex-end" mt={4}>
          <Button colorScheme="blue">Lưu thay đổi</Button>
        </Flex>
      </Box>

      {/* Bảo mật */}
      <Box bg="white" p={6} borderRadius="xl" shadow="md" mb={6}>
        <Heading size="md" mb={4}>Bảo mật</Heading>
        <VStack spacing={4} align="stretch">
          <Button colorScheme="blue" variant="outline" size="sm">
            Đổi mật khẩu
          </Button>
          <Button colorScheme="red" variant="outline" size="sm">
            Đăng xuất khỏi tất cả thiết bị
          </Button>
        </VStack>
      </Box>

      {/* Giao diện & Ngôn ngữ */}
      <Box bg="white" p={6} borderRadius="xl" shadow="md" mb={6}>
        <Heading size="md" mb={4}>Tùy chọn hiển thị</Heading>
        <VStack align="stretch" spacing={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0" flex="1">Chế độ tối</FormLabel>
            <Switch colorScheme="blue" />
          </FormControl>
          <FormControl>
            <FormLabel>Ngôn ngữ</FormLabel>
            <Select defaultValue="vi">
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </Select>
          </FormControl>
        </VStack>
      </Box>

      {/* Thông báo */}
      <Box bg="white" p={6} borderRadius="xl" shadow="md">
        <Heading size="md" mb={4}>Thông báo</Heading>
        <VStack align="stretch" spacing={3}>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0" flex="1">Nhận thông báo qua email</FormLabel>
            <Switch colorScheme="blue" defaultChecked />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0" flex="1">Thông báo khi có đơn hàng mới</FormLabel>
            <Switch colorScheme="blue" />
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
}
