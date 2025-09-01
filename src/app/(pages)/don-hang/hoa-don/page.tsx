import {
    Box,
    Container,
    Heading,
    Text,
    Divider,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    Spacer,
    Stack,
    Badge,
  } from "@chakra-ui/react";
  
  export default function HoaDonPage() {
    const invoice = {
      id: "HD-2025-001",
      date: "2025-09-01",
      customer: {
        name: "Nguyễn Văn A",
        phone: "0123 456 789",
        email: "nguyenvana@example.com",
        address: "123 Lý Thường Kiệt, Hà Nội",
      },
      items: [
        { name: "Sản phẩm A", quantity: 2, price: 150000 },
        { name: "Sản phẩm B", quantity: 1, price: 200000 },
        { name: "Sản phẩm C", quantity: 3, price: 120000 },
      ],
      taxRate: 0.08,
      status: "Đã thanh toán",
    };
  
    const subtotal = invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const tax = subtotal * invoice.taxRate;
    const total = subtotal + tax;
  
    return (
      <Container maxW="4xl" py={10}>
        <Box bg="white" boxShadow="md" rounded="2xl" p={8}>
          <Flex alignItems="center" mb={6}>
            <Heading size="lg">Hóa Đơn Điện Tử</Heading>
            <Spacer />
            <Badge colorScheme="green" fontSize="md" px={4} py={1} rounded="md">
              {invoice.status}
            </Badge>
          </Flex>
  
          {/* Invoice Info */}
          <Stack spacing={1} mb={4}>
            <Text fontWeight="bold">Mã hóa đơn: {invoice.id}</Text>
            <Text>Ngày lập: {invoice.date}</Text>
          </Stack>
  
          <Divider my={4} />
  
          {/* Customer Info */}
          <Heading size="md" mb={2}>
            Thông tin khách hàng
          </Heading>
          <Stack spacing={1} mb={6}>
            <Text><b>Khách hàng:</b> {invoice.customer.name}</Text>
            <Text><b>Số điện thoại:</b> {invoice.customer.phone}</Text>
            <Text><b>Email:</b> {invoice.customer.email}</Text>
            <Text><b>Địa chỉ:</b> {invoice.customer.address}</Text>
          </Stack>
  
          {/* Product Table */}
          <Heading size="md" mb={2}>
            Chi tiết sản phẩm
          </Heading>
          <TableContainer mb={6}>
            <Table variant="simple" size="md">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Sản phẩm</Th>
                  <Th isNumeric>Số lượng</Th>
                  <Th isNumeric>Đơn giá</Th>
                  <Th isNumeric>Thành tiền</Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoice.items.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td isNumeric>{item.quantity}</Td>
                    <Td isNumeric>{item.price.toLocaleString()} đ</Td>
                    <Td isNumeric>
                      {(item.price * item.quantity).toLocaleString()} đ
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
  
          {/* Summary */}
          <Box textAlign="right">
            <Text>Tạm tính: {subtotal.toLocaleString()} đ</Text>
            <Text>Thuế (8%): {tax.toLocaleString()} đ</Text>
            <Divider my={2} />
            <Text fontSize="xl" fontWeight="bold" color="blue.600">
              Tổng cộng: {total.toLocaleString()} đ
            </Text>
          </Box>
        </Box>
      </Container>
    );
  }
  