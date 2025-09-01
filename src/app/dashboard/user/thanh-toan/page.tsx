"use client";

import { useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  GridItem,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const Step1ThongTinKhachHang = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="4">
        Thông tin khách hàng
      </Heading>

      <Flex gap={4}>
        <FormControl>
          <FormLabel fontWeight="medium">Họ</FormLabel>
          <Input placeholder="Nhập họ" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="medium">Tên</FormLabel>
          <Input placeholder="Nhập tên" />
        </FormControl>
      </Flex>

      <FormControl mt="4">
        <FormLabel fontWeight="medium">Email</FormLabel>
        <Input type="email" placeholder="email@example.com" />
        <FormHelperText>Chúng tôi sẽ gửi hóa đơn qua email này.</FormHelperText>
      </FormControl>

      <FormControl mt="4">
        <FormLabel fontWeight="medium">Mật khẩu tài khoản</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Tạo mật khẩu"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Ẩn" : "Hiện"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

const Step2ThongTinThanhToan = () => {
  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="4">
        Thông tin thanh toán
      </Heading>

      <SimpleGrid columns={[1, 2]} spacing={4}>
        <FormControl>
          <FormLabel fontWeight="medium">Phương thức thanh toán</FormLabel>
          <Select placeholder="Chọn phương thức">
            <option value="credit">Thẻ tín dụng</option>
            <option value="momo">Ví MoMo</option>
            <option value="bank">Chuyển khoản ngân hàng</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="medium">Mã giảm giá</FormLabel>
          <Input placeholder="Nhập mã (nếu có)" />
        </FormControl>
      </SimpleGrid>

      <FormControl mt="4">
        <FormLabel fontWeight="medium">Địa chỉ giao hàng</FormLabel>
        <Textarea placeholder="Nhập địa chỉ đầy đủ" />
      </FormControl>

      <SimpleGrid columns={[1, 2]} spacing={4} mt="4">
        <FormControl>
          <FormLabel fontWeight="medium">Tỉnh / Thành phố</FormLabel>
          <Input placeholder="Ví dụ: Hà Nội" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="medium">Mã bưu điện</FormLabel>
          <Input placeholder="100000" />
        </FormControl>
      </SimpleGrid>
    </>
  );
};

const Step3XacNhan = () => {
  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="4">
        Xác nhận & Thanh toán
      </Heading>
      <Box p={4} borderWidth="1px" rounded="md" shadow="sm">
        <Heading size="sm" mb={2}>
          Đơn hàng
        </Heading>
        <Box fontSize="sm">
          - Sản phẩm: Gói Premium x 1
          <br />
          - Giá: 499.000đ
          <br />
          - Thuế VAT: 10%
          <br />
          - Tổng thanh toán: <strong>548.900đ</strong>
        </Box>
      </Box>
      <FormControl mt="4">
        <FormLabel fontWeight="medium">Ghi chú đơn hàng</FormLabel>
        <Textarea placeholder="Ghi chú (nếu có)" />
      </FormControl>
    </>
  );
};

export default function ThanhToanPage() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="md"
      maxWidth={800}
      p={6}
      m="20px auto"
      as="form"
    >
      <Progress
        hasStripe
        value={progress}
        mb="5%"
        mx="5%"
        isAnimated
        colorScheme="blue"
      />

      {step === 1 ? (
        <Step1ThongTinKhachHang />
      ) : step === 2 ? (
        <Step2ThongTinThanhToan />
      ) : (
        <Step3XacNhan />
      )}

      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            <Button
              onClick={() => {
                setStep(step - 1);
                setProgress(progress - 33.33);
              }}
              isDisabled={step === 1}
              colorScheme="gray"
              variant="outline"
              w="7rem"
              mr="5%"
            >
              Quay lại
            </Button>
            <Button
              w="7rem"
              isDisabled={step === 3}
              onClick={() => {
                setStep(step + 1);
                if (step === 3) {
                  setProgress(100);
                } else {
                  setProgress(progress + 33.33);
                }
              }}
              colorScheme="blue"
              variant="solid"
            >
              Tiếp tục
            </Button>
          </Flex>
          {step === 3 ? (
            <Button
              w="7rem"
              colorScheme="green"
              variant="solid"
              onClick={() =>
                toast({
                  title: "Thanh toán thành công!",
                  description: "Đơn hàng của bạn đã được xử lý.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                })
              }
            >
              Thanh toán
            </Button>
          ) : null}
        </Flex>
      </ButtonGroup>
    </Box>
  );
}
