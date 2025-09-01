"use client";

import {
  Box,
  Heading,
  Text,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Divider,
  Button,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

export default function TrungTamThongBao() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Đơn hàng #12345 đã được giao",
      content: "Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đã được giao thành công.",
      type: "success",
      time: "10 phút trước",
    },
    {
      id: 2,
      title: "Cập nhật hệ thống",
      content:
        "Chúng tôi sẽ bảo trì hệ thống vào lúc 23:00 hôm nay. Dịch vụ có thể bị gián đoạn.",
      type: "warning",
      time: "1 giờ trước",
    },
    {
      id: 3,
      title: "Thanh toán chưa hoàn tất",
      content:
        "Bạn còn 1 hóa đơn chưa thanh toán. Vui lòng hoàn tất trước ngày 05/09/2025.",
      type: "error",
      time: "Hôm qua",
    },
  ]);

  const badgeColor: Record<string, string> = {
    success: "green",
    warning: "yellow",
    error: "red",
  };

  const bg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box p={6} bg={bg} minH="100vh">
      <Heading size="lg" mb={6}>
        Trung tâm thông báo
      </Heading>

      <VStack align="stretch" spacing={4}>
        {notifications.map((n) => (
          <Card key={n.id} shadow="md" borderRadius="xl">
            <CardHeader pb={0}>
              <HStack justify="space-between">
                <Heading size="md">{n.title}</Heading>
                <Badge colorScheme={badgeColor[n.type]}>{n.type}</Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text fontSize="md">{n.content}</Text>
              <Divider my={3} />
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500">
                  {n.time}
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="blue"
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.filter((item) => item.id !== n.id)
                    )
                  }
                >
                  Đánh dấu đã đọc
                </Button>
              </HStack>
            </CardBody>
          </Card>
        ))}

        {notifications.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500">
              🎉 Bạn đã xem hết tất cả thông báo!
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
