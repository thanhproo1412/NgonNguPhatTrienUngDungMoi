'use client';

import { Button, Checkbox, Flex, Text, FormControl, FormLabel, Heading, Input, Stack, Image, Alert, AlertIcon, } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // thêm
import useRedirectIfLoggedIn from '@/hooks/useRedirectIfLoggedIn';

export default function SplitScreen() {

    // Hook để tự động redirect nếu đã đăng nhập
    useRedirectIfLoggedIn();

    const router = useRouter(); // khởi tạo router
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Invalid email or password');
            }

            localStorage.setItem('authToken', data.token);
            router.push('/homepage');

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'An error occurred. Please try again.');
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Đăng nhập</Heading>
                    {error && (
                        <Alert status="error" borderRadius="md">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired mt={4}>
                            <FormLabel>Mật khẩu</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Stack spacing={6} mt={4}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.500'} cursor="pointer">
                                    Quên mật khẩu
                                </Text>
                            </Stack>
                            <Button
                                colorScheme={'blue'}
                                type="submit"
                                isLoading={loading}
                                loadingText="Logging in..."
                            >
                                Đăng nhập
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                />
            </Flex>
        </Stack>
    );
}
