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
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.300', 'gray.600')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}
                    aria-label={`${title} Icon`}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    )
}

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000) // Simulate loading
    }, [])

    const statsData = [
        { title: 'Users', stat: '5,000', icon: <BsPerson size={'3em'} /> },
        { title: 'Servers', stat: '1,000', icon: <FiServer size={'3em'} /> },
        { title: 'Datacenters', stat: '7', icon: <GoLocation size={'3em'} /> },
    ]

    if (isLoading) {
        return <Box>Loading...</Box>
    }

    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
                Our company is expanding, you could be too.
            </chakra.h1>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                {statsData.map((item, idx) => (
                    <StatsCard
                        key={idx}
                        title={item.title}
                        stat={item.stat}
                        icon={item.icon}
                    />
                ))}
            </SimpleGrid>
        </Box>
    )
}
