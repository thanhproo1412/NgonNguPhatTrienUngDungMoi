'use client'

import {
    Flex,
    Box,
    Image,
    Badge,
    Tooltip,
    Container,
    Grid,
    Spinner,
    Text,
    Icon,
    chakra
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { useEffect, useState } from 'react';

interface Product {
    isNew: boolean;
    imageURL: string;
    name: string;
    price: number;
    rating: number;
    numReviews: number;
    urlProduct: string;
}

interface RatingProps {
    rating: number;
    numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
    return (
        <Box display="flex" alignItems="center">
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2;
                    if (roundedRating - i >= 1) {
                        return (
                            <BsStarFill
                                key={i}
                                style={{ marginLeft: '1' }}
                                color={i < rating ? 'teal.500' : 'gray.300'}
                            />
                        );
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
                    }
                    return <BsStar key={i} style={{ marginLeft: '1' }} />;
                })}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {numReviews} review{numReviews > 1 && 's'}
            </Box>
        </Box>
    );
}

function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://673db1960118dbfe860858ae.mockapi.io/api/mychakrauiapp/v1/listProduct');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: any[] = await response.json(); // Assume `data` is an array of any type

                // Validate and transform data
                const validatedData: Product[] = data.map((product: any) => {
                    return {
                        isNew: Boolean(product.isNew), // Ensure isNew is a boolean
                        imageURL: product.imageURL || '', // Ensure imageURL is a string (default to empty)
                        name: product.name || 'Unknown Product', // Default name if missing
                        price: parseFloat(product.price) || 0, // Convert price to a number (default to 0)
                        rating: parseFloat(product.rating) || 0, // Convert rating to a number (default to 0)
                        numReviews: parseInt(product.numReviews, 10) || 0, // Convert numReviews to an integer (default to 0)
                        urlProduct: product.urlProduct || '#', // Ensure urlProduct is a string (default to #)
                    };
                });

                setProducts(validatedData);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);



    if (loading) {
        return (
            <Container maxW="container.xl" p={4} mt="3em" mb="1em" textAlign="center">
                <Spinner size="xl" />
                <Text mt={4}>Loading products...</Text>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxW="container.xl" p={4} mt="3em" mb="1em" textAlign="center">
                <Text fontSize="lg" color="red.500">
                    Failed to load products. Please try again later.
                </Text>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" p={4} mt="3em" mb="1em">
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)', // 1 column on extra-small screens
                    sm: 'repeat(2, 1fr)', // 2 columns on small screens
                    md: 'repeat(2, 1fr)', // 2 columns on medium screens
                    lg: 'repeat(3, 1fr)', // 3 columns on large screens
                    xl: 'repeat(4, 1fr)', // 4 columns on extra-large screens
                }}
                gap={6}
            >
                {products.map((item, index) => (
                    <Box
                        key={index}
                        borderWidth="1px"
                        rounded="lg"
                        shadow="lg"
                        overflow="hidden"
                        p={4}
                        transition="all 0.3s ease-in-out" // Smooth transition effect
                        _hover={{
                            transform: 'scale(1.05)', // Slightly increase size
                            boxShadow: 'xl', // Add a larger shadow
                        }}
                    >
                        <a href={item.urlProduct}>
                            <Image
                                src={item.imageURL}
                                alt={`Picture of ${item.name}`}
                                roundedTop="lg"
                                w="full"
                                h="200px"
                                objectFit="cover"
                            />
                        </a>
                        <Box mt={4}>
                            <Box display="flex" alignItems="baseline">
                                {item.isNew && (
                                    <Badge rounded="full" px={2} fontSize="0.8em" colorScheme="red">
                                        New
                                    </Badge>
                                )}
                            </Box>
                            <Flex mt={2} justifyContent="space-between" alignContent="center">
                                <a href={item.urlProduct}>
                                    <Box
                                        fontSize="lg"
                                        fontWeight="semibold"
                                        as="h4"
                                        lineHeight="tight"
                                        isTruncated
                                        _hover={{
                                            textDecoration: 'underline',
                                            color: 'teal.500',
                                        }}
                                    >
                                        {item.name}
                                    </Box>
                                </a>
                                <Tooltip
                                    label="Add to cart"
                                    bg="white"
                                    placement="top"
                                    color="gray.800"
                                    fontSize="1.2em"
                                >
                                    <chakra.a href="#" display="flex">
                                        <Icon as={FiShoppingCart} h={6} w={6} alignSelf="center" />
                                    </chakra.a>
                                </Tooltip>
                            </Flex>
                            <Flex mt={2} justifyContent="space-between" alignContent="center">
                                <Rating rating={item.rating} numReviews={item.numReviews} />
                                <Box fontSize="lg">
                                    <Box as="span" color="gray.600" fontSize="sm">
                                        £
                                    </Box>
                                    {item.price.toFixed(2)}
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Container>
    );
}

export default Shop;
