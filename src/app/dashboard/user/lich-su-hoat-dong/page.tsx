import { Box, Heading, Text, VStack, HStack, Badge, Divider } from "@chakra-ui/react";

export default function LichSuHoatDongPage() {
  const activities = [
    {
      id: 1,
      time: "2025-09-01 10:15",
      action: "Đăng nhập từ trình duyệt Chrome (Windows)",
      status: "Thành công",
    },
    {
      id: 2,
      time: "2025-09-01 09:00",
      action: "Thay đổi mật khẩu",
      status: "Hoàn tất",
    },
    {
      id: 3,
      time: "2025-08-31 22:30",
      action: "Cập nhật thông tin tài khoản",
      status: "Hoàn tất",
    },
    {
      id: 4,
      time: "2025-08-31 20:00",
      action: "Đăng xuất khỏi hệ thống",
      status: "Hoàn tất",
    },
  ];

  return (
    <Box p={6} maxW="900px" mx="auto">
      <Heading size="lg" mb={6} textAlign="center">
        Lịch Sử Hoạt Động
      </Heading>

      <VStack spacing={4} align="stretch">
        {activities.map((activity, index) => (
          <Box
            key={activity.id}
            p={4}
            borderWidth="1px"
            borderRadius="xl"
            shadow="sm"
            _hover={{ shadow: "md", transform: "scale(1.01)", transition: "0.2s" }}
          >
            <HStack justify="space-between">
              <Text fontWeight="bold">{activity.action}</Text>
              <Badge colorScheme={activity.status === "Thành công" ? "green" : "blue"}>
                {activity.status}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.500" mt={1}>
              {activity.time}
            </Text>
          </Box>
        ))}
      </VStack>

      <Divider my={6} />

      <Text textAlign="center" fontSize="sm" color="gray.500">
        Bạn có thể kiểm tra toàn bộ lịch sử hoạt động của mình trong 30 ngày gần nhất để đảm bảo an toàn tài khoản.
      </Text>
    </Box>
  );
}
