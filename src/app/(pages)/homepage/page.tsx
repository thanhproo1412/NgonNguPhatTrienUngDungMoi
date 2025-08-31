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
    SpaceProps,
    useColorModeValue,
    Container,
    VStack,
    Button,
} from '@chakra-ui/react'

interface Props {
    marginTop?: number
    tags: string[]
}

const ItemTags = ({ marginTop = 0, tags }: Props) => (
    <HStack spacing={2} marginTop={marginTop}>
        {tags.map((tag) => (
            <Tag size={'md'} variant="solid" colorScheme="green" key={tag}>
                {tag}
            </Tag>
        ))}
    </HStack>
)

const HomePage = () => {
    return (
        <Container maxW={'7xl'} p="12">
            {/* Tiêu đề trang */}
            <Heading as="h1" textAlign="center" color="green.600">
                Quản lý vật tư thông minh
            </Heading>

            {/* Phần giới thiệu */}
            <Box
                marginTop={{ base: '4', sm: '8' }}
                display="flex"
                flexDirection={{ base: 'column', sm: 'row' }}
                justifyContent="space-between">
                <Box
                    display="flex"
                    flex="1"
                    marginRight="3"
                    position="relative"
                    alignItems="center">
                    <Box
                        width={{ base: '100%', sm: '85%' }}
                        zIndex="2"
                        marginLeft={{ base: '0', sm: '5%' }}
                        marginTop="5%">
                        <Image
                            borderRadius="lg"
                            src="https://images.unsplash.com/photo-1581091215367-59ab6cfc63c2?auto=format&fit=crop&w=800&q=80"
                            alt="Quản lý vật tư"
                            objectFit="cover"
                        />
                    </Box>
                    <Box zIndex="1" width="100%" position="absolute" height="100%">
                        <Box
                            bgGradient={useColorModeValue(
                                'radial(green.600 1px, transparent 1px)',
                                'radial(green.300 1px, transparent 1px)',
                            )}
                            backgroundSize="20px 20px"
                            opacity="0.4"
                            height="100%"
                        />
                    </Box>
                </Box>

                <Box
                    display="flex"
                    flex="1"
                    flexDirection="column"
                    justifyContent="center"
                    marginTop={{ base: '3', sm: '0' }}>
                    <ItemTags tags={['Kho vật tư', 'Theo dõi', 'Tối ưu']} />
                    <Heading marginTop="1" fontSize="2xl">
                        <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            Quản lý nhập – xuất vật tư hiệu quả
                        </Text>
                    </Heading>
                    <Text
                        as="p"
                        marginTop="3"
                        color={useColorModeValue('gray.700', 'gray.200')}
                        fontSize="lg">
                        Hệ thống hỗ trợ bạn theo dõi tồn kho, nhập xuất và cập nhật dữ liệu vật tư nhanh chóng.
                        Tiết kiệm thời gian, giảm sai sót, tối ưu quy trình quản lý kho của bạn.
                    </Text>
                    <Button
                        colorScheme="green"
                        alignSelf="flex-start"
                        mt={4}
                        onClick={() => window.location.href = "/vat-tu"}>
                        Xem danh sách vật tư
                    </Button>
                </Box>
            </Box>

            {/* Danh sách vật tư mới */}
            <Heading as="h2" marginTop="10" color="green.700">
                Vật tư mới cập nhật
            </Heading>
            <Divider marginTop="3" />
            <Wrap spacing="30px" marginTop="5">
                {[
                    { name: "Xi măng PCB40", img: "https://images.unsplash.com/photo-1625745426820-028e8d76f4c8?auto=format&fit=crop&w=600&q=80", tags: ["Xây dựng", "Tồn kho: 120 bao"] },
                    { name: "Thép cuộn D10", img: "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=600&q=80", tags: ["Kết cấu", "Tồn kho: 85 cuộn"] },
                    { name: "Sơn chống thấm", img: "https://images.unsplash.com/photo-1606836591695-4b33dbf1d5e4?auto=format&fit=crop&w=600&q=80", tags: ["Hoàn thiện", "Tồn kho: 40 thùng"] },
                ].map((item, index) => (
                    <WrapItem key={index} width={{ base: '100%', sm: '45%', md: '30%' }}>
                        <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                            <Image
                                borderRadius="lg"
                                src={item.img}
                                alt={item.name}
                                objectFit="cover"
                                width="100%"
                                height="200px"
                            />
                            <ItemTags tags={item.tags} marginTop={3} />
                            <Heading fontSize="xl" marginTop="2">
                                {item.name}
                            </Heading>
                        </Box>
                    </WrapItem>
                ))}
            </Wrap>

            {/* Phần giới thiệu bổ sung */}
            <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
                <Heading as="h2" color="green.700">Tại sao nên dùng hệ thống?</Heading>
                <Text as="p" fontSize="lg">
                    ✔ Quản lý tồn kho chính xác theo thời gian thực  
                    ✔ Hỗ trợ nhập – xuất nhanh chóng, báo cáo tự động  
                    ✔ Giảm rủi ro thất thoát vật tư  
                    ✔ Phù hợp cho doanh nghiệp vừa và nhỏ
                </Text>
            </VStack>
        </Container>
    )
}

export default HomePage
