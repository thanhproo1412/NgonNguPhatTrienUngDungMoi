'use client'

import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Spinner,
} from '@chakra-ui/react'
import { ReactNode, useState, useEffect } from 'react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'

interface StatsCardProps {
    title: string
    stat: string
    icon: ReactNode
}

function StatsCard({ title, stat, icon }: StatsCardProps) {
    const borderColor = useColorModeValue('gray.200', 'gray.600')
    const hoverBorderColor = useColorModeValue('blue.400', 'blue.300')
    const iconColor = useColorModeValue('blue.600', 'blue.300')

    return (
        <Stat
            px={{ base: 4, md: 6 }}
            py={6}
            shadow="md"
            border="1px solid"
            borderColor={borderColor}
            rounded="xl"
            transition="all 0.2s"
            _hover={{
                shadow: 'xl',
                transform: 'scale(1.03)',
                borderColor: hoverBorderColor,
            }}
        >
            <Flex justifyContent="space-between">
                <Box>
                    <StatLabel fontWeight="medium" fontSize="lg">
                        {title}
                    </StatLabel>
                    <StatNumber fontSize="3xl" fontWeight="bold">
                        {stat}
                    </StatNumber>
                </Box>
                <Box my="auto" color={iconColor} aria-label={`${title} Icon`}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    )
}

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000)
    }, [])

    const headingColor = useColorModeValue('blue.600', 'blue.300')

    const statsData = [
        { title: 'Users', stat: '5,000', icon: <BsPerson size={'3em'} /> },
        { title: 'Servers', stat: '1,000', icon: <FiServer size={'3em'} /> },
        { title: 'Datacenters', stat: '7', icon: <GoLocation size={'3em'} /> },
    ]

    if (isLoading) {
        return (
            <Flex justify="center" align="center" h="60vh">
                <Spinner size="xl" color="blue.500" />
            </Flex>
        )
    }

    return (
        <Box maxW="7xl" mx="auto" pt={5} px={{ base: 4, sm: 8, md: 12 }}>
            <chakra.h1
                textAlign="center"
                fontSize={{ base: '2xl', md: '4xl' }}
                py={10}
                fontWeight="bold"
                color={headingColor}
            >
                Our company is expanding, you could be too.
            </chakra.h1>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {statsData.map((item, idx) => (
                    <StatsCard key={idx} {...item} />
                ))}
            </SimpleGrid>
        </Box>
    )
}
