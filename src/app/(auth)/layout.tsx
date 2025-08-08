"use client"

import NavBar from "../components/layout/NavBar"
import Fotter from "../components/layout/Footer"
import { Box } from '@chakra-ui/react'


export default function MainLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {


    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <NavBar />
            <Box h='2em'></Box>
            {children}
        </section>
    )
}