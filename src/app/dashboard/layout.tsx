"use client";

import SidebarWithHeader from "./components/SidebarWithHeader";
import Footer from "../components/layout/Footer";

export default function DashboardLayout({
    children, // Will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <SidebarWithHeader>{children}</SidebarWithHeader> {/* Correct way to pass children */}

            <Footer />
        </div>
    );
}
