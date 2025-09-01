'use client'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  HStack,
  useDisclosure,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronRightIcon,
  SearchIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons'
import styles from './css/NavBar.module.css'
import { FiBell, FiChevronDown } from 'react-icons/fi'
import { useAuthUser } from '../../../hooks/useAuthUser'

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

interface UserData {
  name: string
  role: string
  avatar: string
}

export default function WithSubnavigation(): JSX.Element | null {
  const { isOpen, onToggle } = useDisclosure()
  const { user, setUser, loading } = useAuthUser()

  // ✅ Call useColorModeValue outside JSX
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'white')

  if (loading) return null

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  return (
    <Box pos="fixed" top="0" w="100%" bg={bg} borderBottomWidth="1px" borderColor={borderColor} zIndex="2000">
      <Flex
        maxW="container.xl"
        mx="auto"
        w="100%"
        color={textColor}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        align="center"
        justify="space-between"
      >
        {/* Mobile menu button */}
        <Flex flex={{ base: '0 0 auto', md: '0 0 auto' }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>

        <Flex flex="1" justify="center" display={{ base: 'none', md: 'flex' }}>
          <DesktopNav />
        </Flex>

        {/* Right section */}
        <Stack flex="0 0 auto" direction="row" spacing={4} align="center">
          <Show above="lg">
            <InputGroup className={styles['my-search']} w="250px">
              <Input placeholder="Search..." />
              <InputRightElement>
                <IconButton icon={<SearchIcon />} size="sm" variant="ghost" aria-label="Search" />
              </InputRightElement>
            </InputGroup>
          </Show>

          {!user ? (
            <>
              <Button as="a" fontSize="sm" variant="link" href="/logIn">
                Log In
              </Button>
              <Button
                as="a"
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="#1E42DD"
                href="/signUp"
                _hover={{ bg: 'pink.300' }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <HStack spacing={{ base: '0', md: '6' }}>
              <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
              <Flex alignItems="center">
                <UserMenu user={user} handleLogout={handleLogout} />
              </Flex>
            </HStack>
          )}
        </Stack>
      </Flex>

      {/* Mobile nav collapse */}
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const UserMenu: React.FC<{ user: UserData; handleLogout: () => void }> = ({ user, handleLogout }) => {
  const menuBg = useColorModeValue('white', 'gray.900')
  const menuBorder = useColorModeValue('gray.200', 'gray.700')
  return (
    <Menu>
      <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
        <HStack>
          <Avatar size="sm" src={user.avatar} />
          <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
            <Text fontSize="sm">{user.name}</Text>
            <Text fontSize="xs" color="gray.600">
              {user.role}
            </Text>
          </VStack>
          <Box display={{ base: 'none', md: 'flex' }}>
            <FiChevronDown />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList bg={menuBg} borderColor={menuBorder}>
        {user.role === 'admin' && <MenuItem as="a" href="/dashboard">Dashboard</MenuItem>}
        <MenuItem>Hồ sơ cá nhân</MenuItem>
        <MenuItem>Cài đặt</MenuItem>
        <MenuItem>Trung tâm thông báo</MenuItem>
        <MenuItem>Lịch sử hoạt động</MenuItem>
        <MenuItem>Quản lý tài khoản</MenuItem>
        <MenuItem>Hỗ trợ / Trợ giúp</MenuItem>
        <MenuItem>Thanh toán</MenuItem>
        <MenuItem>Ngôn ngữ</MenuItem>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </MenuList>
    </Menu>
  )
}

const DesktopNav: React.FC = () => {
  const popoverBg = useColorModeValue('white', 'gray.800')
  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((nav: NavItem) => (
        <Box key={nav.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={nav.href ?? '#'}
                fontSize="sm"
                fontWeight={500}
                color="#1E2132"
                display="flex"
                alignItems="center"
                _hover={{ bg: '#F2F4F5', borderRadius: '4px' }}
              >
                {nav.label}
                {nav.children && <Icon as={ChevronRightIcon} w={5} h={5} ml={1} />}
              </Box>
            </PopoverTrigger>
            {nav.children && (
              <PopoverContent border={0} boxShadow="xl" bg={popoverBg} p={4} rounded="xl" minW="sm">
                <Stack>
                  {nav.children.map((child: NavItem) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav: React.FC<NavItem> = ({ label, href = '#', subLabel, children }) => {
  const popoverBg = useColorModeValue('white', 'gray.800')
  return (
    <Popover trigger="hover" placement="right-start">
      <PopoverTrigger>
        <Box as="a" href={href} p={2} fontWeight={500} color="#1E2132" _hover={{ color: 'pink.400', textDecoration: 'none' }}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight={500}>{label}</Text>
              {subLabel && <Text fontSize="sm">{subLabel}</Text>}
            </Box>
            {children && <Icon as={ChevronRightIcon} w={5} h={5} />}
          </Flex>
        </Box>
      </PopoverTrigger>
      {children && (
        <PopoverContent border={0} boxShadow="xl" bg={popoverBg} p={4} rounded="xl" minW="sm">
          {children.map((child: NavItem) => (
            <DesktopSubNav key={child.label} {...child} />
          ))}
        </PopoverContent>
      )}
    </Popover>
  )
}

const MobileNav: React.FC = () => {
  const mobileBg = useColorModeValue('white', 'gray.800')
  return (
    <Stack bg={mobileBg} p={4} display={{ md: 'none' }}>
      <Image boxSize="50px" src="https://bit.ly/dan-abramov" alt="Logo" />
      {NAV_ITEMS.map((nav: NavItem) => (
        <MobileNavItem key={nav.label} {...nav} />
      ))}
    </Stack>
  )
}

const MobileNavItem: React.FC<NavItem> = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as="a"
        href={href ?? '#'}
        justify="space-between"
        align="center"
        onClick={children ? onToggle : undefined}
      >
        <Text fontWeight={600} color={textColor}>
          {label}
        </Text>
        {children && <Icon as={ChevronDownIcon} w={6} h={6} transform={isOpen ? 'rotate(180deg)' : ''} />}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack pl={4} borderLeft="1px solid" borderColor={borderColor} align="start">
          {children && children.map((child: NavItem) => <MobileNavItem key={child.label} {...child} />)}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Trang Chủ', href: '/homepage' },
  {
    label: 'Vật tư',
    href: '/vat-tu',
    children: [
      { label: 'Danh sách hàng hóa', href: '/vat-tu/danh-sach' },
      // { label: 'Loại hàng', href: '/vat-tu/loai-hang' },
      // { label: 'Đơn vị tính', href: '/vat-tu/don-vi-tinh' },
    ],
  },
  {
    label: 'Đơn hàng',
    href: '/don-hang',
    children: [
      { label: 'Phiếu xuất', href: '/don-hang/phieu-xuat' },
      { label: 'Chi tiết xuất', href: '/don-hang/chi-tiet-xuat' },
      { label: 'Hóa đơn', href: '/don-hang/hoa-don' },
      // { label: 'Tạo phiếu xuất mới', href: '/don-hang/tao' },
    ],
  },
  {
    label: 'Báo cáo',
    href: '/bao-cao',
    children: [
      { label: 'Tồn kho', href: '/bao-cao/ton-kho' },
      { label: 'Nhập hàng', href: '/bao-cao/nhap-hang' },
      { label: 'Xuất hàng', href: '/bao-cao/xuat-hang' },
      // { label: 'Doanh thu', href: '/bao-cao/doanh-thu' },
    ],
  },
  {
    label: 'Hỗ trợ',
    href: '/ho-tro',
  },
]
