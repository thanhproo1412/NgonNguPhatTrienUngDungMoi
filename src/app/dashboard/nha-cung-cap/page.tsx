'use client'

import { useState, useEffect, useRef } from "react";
import {
  Button, Table, Thead, Tbody, Tr, Th, Td, Stack, Flex, Heading,
  IconButton, Tooltip, useToast, Spinner, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  ModalFooter, Input, FormControl, FormLabel, SimpleGrid,
  useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Supplier {
  id?: number; // optional để POST không gửi id
  mancc: string;
  tenncc: string;
  diachi?: string;
  sdt?: string;
  mail?: string;
  ghichu?: string;
}

export default function SupplierTable() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [form, setForm] = useState<Partial<Supplier>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/nhacungcap');
      const data = await res.json();
      setSuppliers(data);
    } catch (err) {
      console.error(err);
      toast({ title: "Lỗi khi tải danh sách", status: "error" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchSuppliers(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSave = async () => {
    if (!form.mancc || !form.tenncc) {
      toast({ title: "Mã và tên nhà cung cấp là bắt buộc", status: "error", duration: 3000 });
      return;
    }

    const method = isEditing ? "PUT" : "POST";
    const payload = { ...form };
    if (!isEditing) delete payload.id; // bỏ id khi thêm mới

    try {
      const res = await fetch('/api/nhacungcap', {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lỗi khi lưu nhà cung cấp");

      toast({ title: isEditing ? "Cập nhật thành công" : "Thêm thành công", status: "success" });
      setForm({});
      setIsEditing(false);
      onClose();
      fetchSuppliers();
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message, status: "error" });
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/nhacungcap?id=${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không xóa được");

      toast({ title: "Xóa thành công", status: "success" });
      fetchSuppliers();
    } catch (err: any) {
      toast({ title: "Lỗi", description: err.message, status: "error" });
    }
    onDeleteClose();
  }

  return (
    <Stack spacing={5}>
      <Flex justify="space-between" align="center">
        <Heading size="md">Quản lý nhà cung cấp</Heading>
        <Button colorScheme="blue" size="sm" onClick={() => { setForm({}); setIsEditing(false); onOpen(); }}>
          Thêm nhà cung cấp
        </Button>
      </Flex>

      {loading && <Spinner />}
      {!loading && (
        <Table variant="simple" size="md">
          <Thead bg="blue.50">
            <Tr>
              <Th>Mã nhà cung cấp</Th>
              <Th>Tên nhà cung cấp</Th>
              <Th>Địa chỉ</Th>
              <Th>Số điện thoại</Th>
              <Th>Email</Th>
              <Th>Ghi chú</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {suppliers.map((s, idx) => (
              <Tr key={s.id} bg={idx % 2 === 0 ? "gray.50" : "white"}>
                <Td>{s.mancc}</Td>
                <Td>{s.tenncc}</Td>
                <Td>{s.diachi}</Td>
                <Td>{s.sdt}</Td>
                <Td>{s.mail}</Td>
                <Td>{s.ghichu}</Td>
                <Td>
                  <Flex justify="center">
                    <Tooltip label="Sửa nhà cung cấp">
                      <IconButton icon={<FaEdit />} colorScheme="yellow" size="sm" mr={2}
                        onClick={() => { setForm(s); setIsEditing(true); onOpen(); }} aria-label="Sửa" />
                    </Tooltip>
                    <Tooltip label="Xóa nhà cung cấp">
                      <IconButton icon={<FaTrash />} colorScheme="red" size="sm"
                        onClick={() => { setDeleteId(s.id!); onDeleteOpen(); }} aria-label="Xóa" />
                    </Tooltip>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Modal thêm/sửa */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {[
                { name: "mancc", label: "Mã nhà cung cấp" },
                { name: "tenncc", label: "Tên nhà cung cấp" },
                { name: "diachi", label: "Địa chỉ" },
                { name: "sdt", label: "Số điện thoại" },
                { name: "mail", label: "Email" },
                { name: "ghichu", label: "Ghi chú" },
              ].map(field => (
                <FormControl key={field.name} isRequired={field.name === "mancc" || field.name === "tenncc"}>
                  <FormLabel>{field.label}</FormLabel>
                  <Input name={field.name} value={(form as any)[field.name] || ""} onChange={handleChange} placeholder={field.label} />
                </FormControl>
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSave}>{isEditing ? "Cập nhật" : "Thêm"}</Button>
            <Button variant="ghost" onClick={onClose}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Xác nhận xóa */}
      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Xóa nhà cung cấp</AlertDialogHeader>
            <AlertDialogBody>Bạn có chắc muốn xóa nhà cung cấp này?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>Hủy</Button>
              <Button colorScheme="red" ml={3} onClick={handleDelete}>Xóa</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Stack>
  )
}
