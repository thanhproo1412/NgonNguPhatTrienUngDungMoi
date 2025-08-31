'use client'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { MdOutlineEmail } from 'react-icons/md'
import { BsGithub, BsLinkedin, BsFacebook } from 'react-icons/bs'
import { useState, useCallback } from 'react'

export default function SupportPage() {
  const toast = useToast()
  const bg = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  // state để lưu form input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      if (!formData.name || !formData.email || !formData.message) {
        toast({
          title: 'Thiếu thông tin',
          description: 'Vui lòng điền đầy đủ tất cả các trường.',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        })
        return
      }

      toast({
        title: 'Gửi thành công',
        description: 'Chúng tôi đã nhận được yêu cầu hỗ trợ của bạn.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })

      // reset form
      setFormData({ name: '', email: '', message: '' })
    },
    [formData, toast]
  )

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bg} px={4} py={10}>
      <Box maxW="lg" w="full" bg={cardBg} boxShadow="xl" rounded="2xl" p={8}>
        <VStack spacing={4} align="stretch">
          <Heading fontSize={{ base: '2xl', md: '3xl' }} textAlign="center" mb={4}>
            Liên hệ Hỗ Trợ
          </Heading>
          <Text color="gray.500" textAlign="center">
            Gặp vấn đề? Gửi yêu cầu của bạn cho chúng tôi, đội ngũ sẽ phản hồi sớm nhất.
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Họ tên</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ tên của bạn"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdOutlineEmail />
                  </InputLeftElement>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Nội dung yêu cầu</FormLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mô tả vấn đề hoặc câu hỏi của bạn..."
                  rows={5}
                />
              </FormControl>

              <Button
                colorScheme="teal"
                size="lg"
                type="submit"
                rounded="xl"
                shadow="md"
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              >
                Gửi yêu cầu
              </Button>
            </Stack>
          </form>

          <Flex justify="center" mt={6} gap={4}>
            <Tooltip label="Facebook">
              <IconButton
                as="a"
                href="http://fb.com/thanhproo1412"
                target="_blank"
                aria-label="Facebook"
                icon={<BsFacebook />}
                variant="ghost"
              />
            </Tooltip>
            <Tooltip label="LinkedIn">
              <IconButton
                as="a"
                href="https://www.linkedin.com/in/nguyen-sy-hai-thanh-035557166/"
                target="_blank"
                aria-label="LinkedIn"
                icon={<BsLinkedin />}
                variant="ghost"
              />
            </Tooltip>
            <Tooltip label="Github">
              <IconButton
                as="a"
                href="https://github.com/thanhproo1412/NgonNguPhatTrienUngDungMoi"
                target="_blank"
                aria-label="Github"
                icon={<BsGithub />}
                variant="ghost"
              />
            </Tooltip>
          </Flex>

          <Text fontSize="sm" color="gray.400" textAlign="center">
            Hoặc liên hệ qua email: thanhproo1412@gmail.com
          </Text>
        </VStack>
      </Box>
    </Flex>
  )
}
