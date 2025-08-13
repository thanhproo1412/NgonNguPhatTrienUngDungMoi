"use client"
import { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";
import styles from "./quanLiTonKho.module.css";


export default function InventoryPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Xi măng", unit: "Bao", quantity: 50 },
    { id: 2, name: "Gạch", unit: "Viên", quantity: 1000 },
  ]);

  const [form, setForm] = useState({ name: "", unit: "", quantity: "" });
  const [editingId, setEditingId] = useState(null);

  // Xử lý thêm hoặc cập nhật
  const handleSave = () => {
    if (!form.name || !form.unit || form.quantity === "") return;

    if (editingId) {
      setItems(
        items.map((item) =>
          item.id === editingId ? { ...item, ...form, quantity: Number(form.quantity) } : item
        )
      );
      setEditingId(null);
    } else {
      setItems([
        ...items,
        { id: Date.now(), name: form.name, unit: form.unit, quantity: Number(form.quantity) },
      ]);
    }
    setForm({ name: "", unit: "", quantity: "" });
  };

  // Xóa vật tư
  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Sửa vật tư
  const handleEdit = (item: { id: any; name: any; unit: any; quantity: any; }) => {
    setForm({ name: item.name, unit: item.unit, quantity: item.quantity });
    setEditingId(item.id);
  };

  return (
    <Box p={6}>
      <Heading mb={4} className={styles.customHeading}>Quản lý tồn kho vật tư xây dựng</Heading>

      {/* Form thêm/sửa */}
      <Stack direction="row" spacing={3} mb={4}>
        <Input
          placeholder="Tên vật tư"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Đơn vị tính"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
        />
        <Input
          placeholder="Số lượng"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <Button colorScheme="teal" onClick={handleSave}>
          {editingId ? "Cập nhật" : "Thêm"}
        </Button>
      </Stack>

      {/* Bảng dữ liệu */}
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Tên vật tư</Th>
            <Th>Đơn vị</Th>
            <Th isNumeric>Số lượng</Th>
            <Th>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.unit}</Td>
              <Td isNumeric>{item.quantity}</Td>
              <Td>
                <Button size="sm" colorScheme="blue" mr={2} onClick={() => handleEdit(item)}>
                  Sửa
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(item.id)}>
                  Xóa
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
