'use client';

import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function SplitScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://673db1960118dbfe860858ae.mockapi.io/api/mychakrauiapp/v1/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ email, password }), // remove because using mock data, need to use method GET
            });

            if (!response.ok) {
                throw new Error('Invalid email or password');
            }

            const data = await response.json();
            console.log(data);
            const userData = data[0]?.data?.user;

            // Simulate storing the token (ensure secure storage in a real app)
            localStorage.setItem('authToken', data[0]?.data?.token);
            // Check if user data is available before accessing firstName and lastName
            if (userData) {
                alert(`Welcome, ${userData.firstName} ${userData.lastName}!`);
            } else {
                console.error("User data not found.");
            }

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
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    {error && (
                        <Alert status="error" borderRadius="md">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired mt={4}>
                            <FormLabel>Password</FormLabel>
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
                                    Forgot password?
                                </Text>
                            </Stack>
                            <Button
                                colorScheme={'blue'}
                                type="submit"
                                isLoading={loading}
                                loadingText="Logging in..."
                            >
                                Log In
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
