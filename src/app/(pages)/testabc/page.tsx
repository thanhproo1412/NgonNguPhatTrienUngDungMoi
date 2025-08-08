"use client";

import React, { useState } from "react";
import {
    ChakraProvider,
    Box,
    Heading,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    Flex,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

// Định nghĩa kiểu dữ liệu cho vật tư
interface Material {
    id: number;
    name: string;
    quantity: number;
}

export default function QuanLyVatTuPage() {
    const [materials, setMaterials] = useState<Material[]>([
        { id: 1, name: "Xi măng", quantity: 100 },
        { id: 2, name: "Thép", quantity: 50 },
        { id: 3, name: "Sản phẩm mặc định", quantity: 50 },
        { id: 4, name: "Sản phẩm mặc định 2", quantity: 50 },
    ]);
    const [newMaterial, setNewMaterial] = useState<string>("");
    const [editId, setEditId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>("");
    const toast = useToast();

    // Thêm vật tư
    const handleAdd = (): void => {
        if (!newMaterial.trim()) return;
        setMaterials((prev) => [
            ...prev,
            { id: Date.now(), name: newMaterial, quantity: 0 },
        ]);
        setNewMaterial("");
        toast({ title: "Đã thêm vật tư", status: "success", duration: 1500 });
    };

    // Xóa vật tư
    const handleDelete = (id: number): void => {
        setMaterials((prev) => prev.filter((m) => m.id !== id));
        toast({ title: "Đã xóa vật tư", status: "info", duration: 1500 });
    };

    // Bắt đầu chỉnh sửa
    const handleEditStart = (id: number, name: string): void => {
        setEditId(id);
        setEditName(name);
    };

    // Lưu chỉnh sửa
    const handleEditSave = (): void => {
        if (editId === null) return;
        setMaterials((prev) =>
            prev.map((m) =>
                m.id === editId ? { ...m, name: editName } : m
            )
        );
        setEditId(null);
        setEditName("");
        toast({ title: "Đã cập nhật tên vật tư", status: "success", duration: 1500 });
    };

    // Nhập kho (tăng số lượng)
    const handleImport = (id: number): void => {
        setMaterials((prev) =>
            prev.map((m) =>
                m.id === id ? { ...m, quantity: m.quantity + 10 } : m
            )
        );
        toast({ title: "Nhập kho +10", status: "success", duration: 1000 });
    };

    // Xuất kho (giảm số lượng)
    const handleExport = (id: number): void => {
        setMaterials((prev) =>
            prev.map((m) =>
                m.id === id && m.quantity > 0
                    ? { ...m, quantity: m.quantity - 10 }
                    : m
            )
        );
        toast({ title: "Xuất kho -10", status: "warning", duration: 1000 });
    };

    return (
        <ChakraProvider>
            <Box mt="5" pb={5}></Box>
            <Box maxW="900px" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="md">
                <Heading size="lg" mb={5} pb={5} borderBottom="1px solid #e2e8f0">
                    Quản lý vật tư xây dựng
                </Heading>

                {/* Form thêm vật tư */}
                <Flex mb={4}>
                    <Input
                        placeholder="Tên vật tư mới"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        mr={2}
                    />
                    <Button colorScheme="teal" onClick={handleAdd}>
                        Thêm
                    </Button>
                </Flex>

                {/* Bảng danh sách vật tư */}
                <Table variant="striped" colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th>Tên vật tư</Th>
                            <Th isNumeric>Số lượng tồn</Th>
                            <Th>Hành động</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {materials.map((m) => (
                            <Tr key={m.id}>
                                <Td>
                                    {editId === m.id ? (
                                        <Flex>
                                            <Input
                                                size="sm"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                mr={2}
                                            />
                                            <Button
                                                size="sm"
                                                colorScheme="green"
                                                onClick={handleEditSave}
                                            >
                                                Lưu
                                            </Button>
                                        </Flex>
                                    ) : (
                                        m.name
                                    )}
                                </Td>
                                <Td isNumeric>{m.quantity}</Td>
                                <Td>
                                    <IconButton
                                        icon={<EditIcon />}
                                        size="sm"
                                        mr={2}
                                        aria-label="Chỉnh sửa vật tư"
                                        onClick={() => handleEditStart(m.id, m.name)}
                                    />
                                    <IconButton
                                        icon={<DeleteIcon />}
                                        size="sm"
                                        colorScheme="red"
                                        mr={2}
                                        aria-label="Xóa vật tư"
                                        onClick={() => handleDelete(m.id)}
                                    />
                                    <Button
                                        size="sm"
                                        colorScheme="blue"
                                        mr={1}
                                        onClick={() => handleImport(m.id)}
                                    >
                                        Nhập +10
                                    </Button>
                                    <Button
                                        size="sm"
                                        colorScheme="orange"
                                        onClick={() => handleExport(m.id)}
                                    >
                                        Xuất -10
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <Box mt="5" pb={5}></Box>
        </ChakraProvider>
    );
}
