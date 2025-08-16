'use client';

import {
    Box, Stack, Heading, Text, Container, Input, Button,
    SimpleGrid, Avatar, AvatarGroup, useBreakpointValue, Alert, AlertIcon
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useRedirectIfLoggedIn from '@/hooks/useRedirectIfLoggedIn';

const avatars = [
    { name: 'Ryan Florence', url: 'https://bit.ly/ryan-florence' },
    { name: 'Segun Adebayo', url: 'https://bit.ly/sage-adebayo' },
    { name: 'Kent Dodds', url: 'https://bit.ly/kent-c-dodds' },
    { name: 'Prosper Otemuyiwa', url: 'https://bit.ly/prosper-baba' },
    { name: 'Christian Nwamba', url: 'https://bit.ly/code-beast' },
];

export default function SignupPage() {
    useRedirectIfLoggedIn(); // redirect nếu đã login

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
                credentials: 'include', // API set cookie
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Sign up failed');
            }

            let seconds = 3;
            setCountdown(seconds);
            setSuccess(`Signup thành công! Chuyển hướng sau ${seconds}s...`);

            const timer = setInterval(() => {
                seconds -= 1;
                setCountdown(seconds);
                setSuccess(`Signup thành công! Chuyển hướng sau ${seconds}s...`);
                if (seconds <= 0) {
                    clearInterval(timer);
                    router.push('/logIn'); // redirect sang login
                }
            }, 1000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box position={'relative'}>
            <Container as={SimpleGrid} maxW={'7xl'} columns={{ base: 1, md: 2 }} spacing={{ base: 10, lg: 32 }} py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }}>
                    <Heading lineHeight={1.1} fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                        Join Us{' '}
                        <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">🎉</Text>
                    </Heading>
                    <AvatarGroup>
                        {avatars.map((avatar) => (
                            <Avatar key={avatar.name} name={avatar.name} src={avatar.url}
                                size={useBreakpointValue({ base: 'md', md: 'lg' })} />
                        ))}
                    </AvatarGroup>
                </Stack>

                <Stack bg={'gray.50'} rounded={'xl'} p={{ base: 4, sm: 6, md: 8 }} spacing={{ base: 8 }} maxW={{ lg: 'lg' }}>
                    {error && <Alert status="error" borderRadius="md"><AlertIcon />{error}</Alert>}
                    {success && <Alert status="success" borderRadius="md"><AlertIcon />{success}</Alert>}

                    <Box as={'form'} onSubmit={handleSignup} mt={4}>
                        <Stack spacing={4}>
                            <Input placeholder="Name" type="text" bg={'gray.100'} value={name} onChange={(e) => setName(e.target.value)} />
                            <Input placeholder="Email" type="email" bg={'gray.100'} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Input placeholder="Password" type="password" bg={'gray.100'} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Stack>
                        <Button mt={6} w={'full'} isLoading={loading} type="submit"
                            bgGradient="linear(to-r, red.400,pink.400)" color={'white'}>
                            Sign Up
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
