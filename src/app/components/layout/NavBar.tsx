'use client'
import {
    Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, Popover, PopoverTrigger,
    PopoverContent, useColorModeValue, HStack, useDisclosure, Image, Input, InputGroup,
    InputRightElement, Show, Avatar, Menu, MenuButton, MenuDivider, MenuItem, MenuList, VStack
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronRightIcon, SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'
// import { useEffect, useState } from 'react';
import styles from './css/NavBar.module.css'
import { FiBell, FiChevronDown, } from 'react-icons/fi'
import { useAuthUser } from '../../../hooks/useAuthUser';


export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure()
    const { user, setUser, loading } = useAuthUser()

    if (loading) return null

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        setUser(null)
    }
    return (
        <Box
            pos="fixed"
            top="0"
            w="100%"
            bg={useColorModeValue('white', 'gray.800')}
            borderBottomWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            zIndex="2000"
        >
            <Flex
                maxW="container.xl"
                mx="auto"
                w="100%"
                color={useColorModeValue('gray.600', 'white')}
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
                                <IconButton
                                    icon={<SearchIcon />}
                                    size="sm"
                                    variant="ghost"
                                    aria-label="Search"
                                />
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
                                <Menu>
                                    <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                                        <HStack>
                                            <Avatar size="sm" src={user.avatar} />
                                            <VStack
                                                display={{ base: 'none', md: 'flex' }}
                                                alignItems="flex-start"
                                                spacing="1px"
                                                ml="2"
                                            >
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
                                    <MenuList
                                        bg={useColorModeValue('white', 'gray.900')}
                                        borderColor={useColorModeValue('gray.200', 'gray.700')}
                                    >
                                        <MenuItem>Profile</MenuItem>
                                        <MenuItem>Settings</MenuItem>
                                        <MenuItem>Billing</MenuItem>
                                        <MenuDivider />
                                        <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                                    </MenuList>
                                </Menu>
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
    );

}
const DesktopNav = () => {
    const popoverBg = useColorModeValue('white', 'gray.800');
    return (
        <Stack direction="row" spacing={4}>
            {NAV_ITEMS.map((nav) => (
                <Box key={nav.label}>
                    <Popover trigger="hover" placement="bottom-start">
                        <PopoverTrigger>
                            <Box as="a" p={2} href={nav.href ?? '#'} fontSize="sm" fontWeight={500} color="#1E2132"
                                display="flex" alignItems="center" _hover={{ bg: '#F2F4F5', borderRadius: '4px' }}>
                                {nav.label}
                                {nav.children && <Icon as={ChevronRightIcon} w={5} h={5} ml={1} />}
                            </Box>
                        </PopoverTrigger>
                        {nav.children && (
                            <PopoverContent border={0} boxShadow="xl" bg={popoverBg} p={4} rounded="xl" minW="sm">
                                <Stack>
                                    {nav.children.map((child) => <DesktopSubNav key={child.label} {...child} />)}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href = "#", subLabel, children }: NavItem) => {
    const popoverBg = useColorModeValue('white', 'gray.800');
    return (
        <Popover trigger="hover" placement="right-start">
            <PopoverTrigger>
                <Box as="a" href={href} p={2} fontWeight={500} color="#1E2132"
                    _hover={{ color: 'pink.400', textDecoration: 'none' }}>
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
                    {children.map((child) => <DesktopSubNav key={child.label} {...child} />)}
                </PopoverContent>
            )}
        </Popover>
    );
};

const MobileNav = () => (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
        <Image boxSize="50px" src="https://bit.ly/dan-abramov" alt="Logo" />
        {NAV_ITEMS.map((nav) => <MobileNavItem key={nav.label} {...nav} />)}
    </Stack>
);

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Stack spacing={4}>
            <Flex py={2} as="a" href={href ?? '#'} justify="space-between" align="center"
                onClick={children ? onToggle : undefined}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>{label}</Text>
                {children && <Icon as={ChevronDownIcon} w={6} h={6} transform={isOpen ? 'rotate(180deg)' : ''} />}
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <Stack pl={4} borderLeft="1px solid" borderColor={useColorModeValue('gray.200', 'gray.700')} align="start">
                    {children && children.map((child) => <MobileNavItem key={child.label} {...child} />)}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const NAV_ITEMS: Array<NavItem> = [
    { label: 'Trang Chủ', href: '/homepage' },
    {
        label: 'Shop', href: '/shop', children: [
            { label: 'Geshin Impact', href: '/shop' },
            { label: 'League of Legend', href: '#' },
            {
                label: 'Đời Sống', children: [
                    { label: 'Thị trường xe điện', href: '/doisong/thitruongxedien' },
                    { label: 'Công nghệ', href: '/doisong/congnghe' },
                    { label: 'Du lịch', href: '/doisong/dulich' },
                    {
                        label: 'Ảnh đẹp', children: [
                            { label: 'Ảnh đẹp', href: '/doisong/anhdep' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'Diễn đàn', href: '/diendan', children: [
            { label: 'Post', href: '/diendan/post' },
            { label: 'Tin tức', href: '#' }
        ]
    },
    { label: 'Quản lý vật tư', href: '/quanlyvattu' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Quản lí tồn kho', href: '/quanLyTonKho' },
];

interface UserData {
    name: string;
    role: string;
    avatar: string;
}

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}