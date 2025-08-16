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
  Select,
  NumberInput,
  NumberInputField,
  Button,
  chakra,
} from '@chakra-ui/react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { FiShoppingCart } from 'react-icons/fi'
import { useEffect, useState, useRef } from 'react'

interface Product {
  isNew: boolean
  imageURL: string
  name: string
  price: number
  rating: number
  numReviews: number
  urlProduct: string
  malh: string
}

function Rating({ rating, numReviews }: { rating: number; numReviews: number }) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2
          if (roundedRating - i >= 1) return <BsStarFill key={i} color="teal.500" />
          if (roundedRating - i === 0.5) return <BsStarHalf key={i} />
          return <BsStar key={i} />
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && 's'}
      </Box>
    </Box>
  )
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [filterMalh, setFilterMalh] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000000)
  const observer = useRef<IntersectionObserver | null>(null)

  const fetchProducts = async (pageNum: number, reset = false) => {
    setLoading(true)
    try {
      const query = new URLSearchParams({
        page: pageNum.toString(),
        limit: '20',
        malh: filterMalh,
        minPrice: minPrice.toString(),
        maxPrice: maxPrice.toString(),
      })
      const res = await fetch(`/api/products?${query}`)
      const data = await res.json()
      if (!data.success) throw new Error('Failed to fetch')

      const mappedData: Product[] = data.products.map((p: any) => ({
        isNew: false,
        imageURL: p.imageURL || '',
        name: p.tenhang,
        price: p.price,
        rating: 0,
        numReviews: 0,
        urlProduct: `/vat-tu/${p.mahang}`,
        malh: p.malh,
      }))

      setProducts(prev => (reset ? mappedData : [...prev, ...mappedData]))
      setHasMore(mappedData.length === 20 && pageNum * 20 < 100)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(1, true)
    setPage(1)
  }, [filterMalh, minPrice, maxPrice])

  const lastProductRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (loading || !hasMore) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const nextPage = page + 1
        setPage(nextPage)
        fetchProducts(nextPage)
      }
    })
    if (lastProductRef.current) observer.current.observe(lastProductRef.current)
  }, [loading, hasMore, page])

  return (
    <Container maxW="container.xl" p={4} mt="3em">
      {/* Filter */}
      <Flex mb={4} gap={4} flexWrap="wrap">
        <Select
          placeholder="Chọn loại hàng"
          w="200px"
          value={filterMalh}
          onChange={e => setFilterMalh(e.target.value)}
        >
          <option value="VLXD">Vật tư xây dựng</option>
          <option value="VP">Văn phòng phẩm</option>
          <option value="DW">Điện nước</option>
        </Select>
        <NumberInput min={0} max={1000000} w="120px" value={minPrice} onChange={(_, val) => setMinPrice(val)}>
          <NumberInputField placeholder="Min Price" />
        </NumberInput>
        <NumberInput min={0} max={1000000} w="120px" value={maxPrice} onChange={(_, val) => setMaxPrice(val)}>
          <NumberInputField placeholder="Max Price" />
        </NumberInput>
        <Button onClick={() => fetchProducts(1, true)}>Áp dụng</Button>
      </Flex>

      {/* Product Grid */}
      <Grid templateColumns={{ base:'repeat(1,1fr)', sm:'repeat(2,1fr)', md:'repeat(2,1fr)', lg:'repeat(3,1fr)', xl:'repeat(4,1fr)' }} gap={6}>
        {products.map((item, index) => (
          <Box
            key={index}
            ref={index === products.length - 1 ? lastProductRef : null}
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            overflow="hidden"
            p={4}
            transition="all 0.3s"
            _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
          >
            <a href={item.urlProduct}>
              <Image src={item.imageURL} alt={item.name} roundedTop="lg" w="full" h="200px" objectFit="cover" />
            </a>
            <Box mt={4}>
              {item.isNew && <Badge colorScheme="red">New</Badge>}
              <Flex mt={2} justifyContent="space-between" alignContent="center">
                <a href={item.urlProduct}>
                  <Box fontSize="lg" fontWeight="semibold" isTruncated _hover={{ textDecoration: 'underline', color: 'teal.500' }}>
                    {item.name}
                  </Box>
                </a>
                <Tooltip label="Add to cart"><chakra.a href="#"><Icon as={FiShoppingCart} h={6} w={6} /></chakra.a></Tooltip>
              </Flex>
              <Flex mt={2} justifyContent="space-between" alignContent="center">
                <Rating rating={item.rating} numReviews={item.numReviews} />
                <Box fontSize="lg">{item.price.toLocaleString()}₫</Box>
              </Flex>
            </Box>
          </Box>
        ))}
      </Grid>
      {loading && <Spinner mt={4} />}
      {!hasMore && <Text mt={4} textAlign="center">No more products.</Text>}
    </Container>
  )
}
