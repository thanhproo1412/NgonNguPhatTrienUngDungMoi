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
        const checkRole = async () => {
            try {
                // 🟢 Lấy role từ localStorage (hoặc gọi API để verify JWT)
                const role = localStorage.getItem("role") || "guest";

                if (role === "admin") {
                    setAllowed(true);
                } else {
                    router.replace("/403");
                }
            } catch (err) {
                console.error("Role check error:", err);
                router.replace("/403");
            } finally {
                setIsChecking(false);
            }
        };

        checkRole();
    }, [router]);

    if (isChecking) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Spinner size="xl" color="blue.500" />
            </Flex>
        );
    }

    if (!allowed) return null; // Không render dashboard khi chưa đủ quyền

    return (
        <div>
            <SidebarWithHeader>{children}</SidebarWithHeader>
            <Footer />
        </div>
    );
}
