'use client'

import {
    Box,
    Heading,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    Wrap,
    WrapItem,
    useColorModeValue,
    Container,
    VStack,
    Button,
    SimpleGrid,
    Icon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaChartLine, FaWarehouse, FaCheckCircle, FaArrowRight } from 'react-icons/fa'

interface Props {
    marginTop?: number
    tags: string[]
}

const MotionBox = motion(Box)

const ItemTags = ({ marginTop = 0, tags }: Props) => (
    <HStack spacing={2} marginTop={marginTop}>
        {tags.map((tag) => (
            <Tag size={'md'} variant="solid" colorScheme="blue" key={tag}>
                {tag}
            </Tag>
        ))}
    </HStack>
)

const HomePage = () => {
    return (
        <Container maxW={'7xl'} p="12">
            {/* Hero Section */}
            <VStack spacing={6} textAlign="center" py={10}>
                <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} color="blue.500">
                    Quản lý vật tư thông minh & hiện đại
                </Heading>
                <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')} maxW="2xl">
                    Tự động hóa quản lý kho, giảm thiểu thất thoát và tối ưu hiệu suất vận hành.
                    Phù hợp cho doanh nghiệp vừa & nhỏ, dễ sử dụng, triển khai nhanh chóng.
                </Text>
                <Button
                    colorScheme="blue"
                    size="lg"
                    rightIcon={<FaArrowRight />}
                    onClick={() => (window.location.href = '/vat-tu')}
                >
                    Bắt đầu quản lý ngay
                </Button>
            </VStack>

            {/* Section giới thiệu + hình ảnh */}
            <Box
                mt={10}
                display="flex"
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems="center"
                gap={8}
            >
                <Box flex="1" position="relative">
                    <MotionBox
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            borderRadius="2xl"
                            boxShadow="2xl"
                            src="https://blog.dktcdn.net/files/kho-hang-3.jpg"
                            alt="Quản lý kho"
                            objectFit="cover"
                        />
                    </MotionBox>
                </Box>
                <VStack align="flex-start" flex="1" spacing={5}>
                    <ItemTags tags={['Kho vật tư', 'Báo cáo tự động', 'Tối ưu chi phí']} />
                    <Heading fontSize="2xl">Quản lý nhập – xuất vật tư hiệu quả</Heading>
                    <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.200')}>
                        Hệ thống hỗ trợ bạn theo dõi tồn kho, nhập xuất và cập nhật dữ liệu vật tư nhanh chóng.
                        Tiết kiệm thời gian, giảm sai sót, tối ưu quy trình quản lý kho của bạn.
                    </Text>
                    <Button colorScheme="blue" variant="outline" onClick={() => (window.location.href = '/bao-cao')}>
                        Xem báo cáo kho
                    </Button>
                </VStack>
            </Box>

            {/* Danh sách vật tư mới */}
            <Heading as="h2" mt={16} color="blue.500" textAlign="center">
                Vật tư mới cập nhật
            </Heading>
            <Divider my={4} />
            <Wrap spacing="30px" justify="center" mt={5}>
                {[
                    { name: "Xi măng PCB40", img: "https://ximangxuanthanh.vn//upload/tin-bai/3-nhan-xi-mang-pooclang-hon-hop-pcb40.png", tags: ["Xây dựng", "Tồn kho: 120 bao"] },
                    { name: "Thép cuộn D10", img: "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=600&q=80", tags: ["Kết cấu", "Tồn kho: 85 cuộn"] },
                    { name: "Sơn chống thấm", img: "https://www.paintmart.vn/image/catalog/2021/son-chong-tham-co-mau-hay-khong-01.jpg", tags: ["Hoàn thiện", "Tồn kho: 40 thùng"] },
                ].map((item, index) => (
                    <WrapItem key={index} width={{ base: '100%', sm: '45%', md: '30%' }}>
                        <MotionBox
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            borderWidth="1px"
                            borderRadius="2xl"
                            overflow="hidden"
                            boxShadow="md"
                            p={4}
                            bg={useColorModeValue('white', 'gray.800')}
                        >
                            <Image
                                borderRadius="lg"
                                src={item.img}
                                alt={item.name}
                                objectFit="cover"
                                width="100%"
                                height="200px"
                            />
                            <ItemTags tags={item.tags} marginTop={3} />
                            <Heading fontSize="xl" mt={2}>
                                {item.name}
                            </Heading>
                        </MotionBox>
                    </WrapItem>
                ))}
            </Wrap>

            {/* Lợi ích hệ thống */}
            <VStack pt={20} spacing={10}>
                <Heading as="h2" color="blue.500">
                    Tại sao nên dùng hệ thống?
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                    {[
                        { icon: FaWarehouse, title: 'Theo dõi tồn kho', desc: 'Cập nhật chính xác số lượng vật tư theo thời gian thực.' },
                        { icon: FaChartLine, title: 'Báo cáo trực quan', desc: 'Tạo báo cáo nhập – xuất, thống kê nhanh chóng, dễ hiểu.' },
                        { icon: FaCheckCircle, title: 'Giảm sai sót', desc: 'Hạn chế nhầm lẫn thủ công, tối ưu quy trình làm việc.' },
                    ].map((feature, index) => (
                        <VStack key={index} p={6} borderRadius="2xl" boxShadow="lg" bg={useColorModeValue('gray.50', 'gray.700')}>
                            <Icon as={feature.icon} boxSize={10} color="blue.400" />
                            <Heading fontSize="lg">{feature.title}</Heading>
                            <Text color={useColorModeValue('gray.600', 'gray.300')} textAlign="center">
                                {feature.desc}
                            </Text>
                        </VStack>
                    ))}
                </SimpleGrid>
            </VStack>

            {/* CTA cuối trang */}
            <VStack mt={20} textAlign="center" spacing={4}>
                <Heading fontSize="2xl">Bắt đầu ngay hôm nay</Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')} maxW="xl">
                    Đừng để quản lý vật tư trở thành nỗi đau đầu. Hãy dùng hệ thống để tiết kiệm thời gian & chi phí.
                </Text>
                <Button colorScheme="blue" size="lg" rightIcon={<FaArrowRight />} onClick={() => (window.location.href = '/signup')}>
                    Đăng ký sử dụng miễn phí
                </Button>
            </VStack>
        </Container>
    )
}

export default HomePage
