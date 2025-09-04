"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarWithHeader from "./components/SidebarWithHeader";
import Footer from "../components/layout/Footer";
import { Flex, Spinner } from "@chakra-ui/react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.warn("No token in localStorage, redirecting...");
            router.replace("/403");
            return;
        }

        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();

                if (!res.ok || data.error) {
                    console.warn("Unauthorized, redirecting...");
                    router.replace("/403");
                    return;
                }

                if (data.role === "admin") {
                    setAllowed(true);
                } else {
                    console.warn("Role is not admin, redirecting...");
                    router.replace("/403");
                }
            } catch (err) {
                router.replace("/403");
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [router]);

    if (isChecking) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Spinner size="xl" color="blue.500" />
            </Flex>
        );
    }

    if (!allowed) return null;

    return (
        <div>
            <SidebarWithHeader>{children}</SidebarWithHeader>
            <Footer />
        </div>
    );
}
