'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Text,
  Image,
  Stack,
  Heading,
  Flex,
} from '@chakra-ui/react'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 20
  const maxProducts = 100

  const fetchProducts = async (page: number) => {
    try {
      const res = await fetch(`/api/products?page=${page}&limit=${limit}`)
      const data = await res.json()
      setTotal(data.total)
      // append mới nhưng không vượt quá 100 sản phẩm
      setProducts(prev =>
        [...prev, ...data.products].slice(0, maxProducts)
      )
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProducts(page)
  }, [page])

  const totalPages = Math.ceil(Math.min(total, maxProducts) / limit)

  return (
    <Container maxW="7xl" py={10}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {products.map(p => (
          <Box key={p.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={p.image} alt={p.name} h="200px" w="full" objectFit="cover" />
            <Box p={4}>
              <Heading size="md">{p.name}</Heading>
              <Text mt={2}>${p.price}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {/* Pagination */}
      <Flex mt={8} justify="center" gap={2}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pNum => (
          <Button
            key={pNum}
            onClick={() => setPage(pNum)}
            colorScheme={page === pNum ? 'teal' : 'gray'}
          >
            {pNum}
          </Button>
        ))}
      </Flex>
    </Container>
  )
}
