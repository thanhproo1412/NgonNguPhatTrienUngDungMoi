'use client'

import { useState, useEffect, useRef } from "react";
import {
  Button, SimpleGrid, Stack, Heading, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useToast, Input, Select, FormControl, FormLabel, Flex,
  Badge, IconButton, Tooltip, Spinner, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
  AlertDialogContent, AlertDialogOverlay, Text
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Employee {
  id: number;
  manv: string;
  tennv: string;
  mapb?: string;
  diachi?: string;
  sdt?: string;
  ghichu?: string;
  email?: string;
  ngaysinh?: string;
  chucvu?: string;
  trangthai?: number;
  ngayvao?: string;
}

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<Partial<Employee>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [phongbanList, setPhongbanList] = useState<{ mapb: string, tenpb: string }[]>([]);

  useEffect(() => {
    fetch('/api/phongban')
      .then(res => res.json())
      .then(data => setPhongbanList(data))
      .catch(err => console.error('Cannot fetch phongban', err));
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/nhanvien");
      if (!res.ok) throw new Error("Lỗi tải danh sách nhân viên");
      const data = await res.json();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === "trangthai" ? Number(e.target.value) : e.target.value;
    setForm(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleSave = async () => {
    if (!form.tennv) {
      toast({ title: "Tên NV là bắt buộc", status: "error", duration: 3000 });
      return;
    }

    const url = isEditing ? `/api/nhanvien` : "/api/nhanvien";
    const method = isEditing ? "PUT" : "POST";

    // Nếu đang edit, gửi id; nếu thêm mới, không cần id
    const bodyData = isEditing ? form : { ...form };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    if (res.ok) {
      const data = await res.json();
      toast({ title: isEditing ? "Cập nhật thành công" : "Thêm thành công", status: "success", duration: 3000 });

      // Nếu thêm mới, backend trả về manv + id mới
      if (!isEditing && data.employee) {
        setForm({ manv: data.employee.manv });
      }

      setForm({});
      setIsEditing(false);
      onClose();
      fetchEmployees();
    } else {
      const data = await res.json();
      toast({ title: data.error, description: data.detail, status: "error", duration: 4000 });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/nhanvien?id=${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Xóa thành công", status: "success", duration: 3000 });
      fetchEmployees();
    } else {
      const data = await res.json();
      toast({ title: data.error, description: data.detail, status: "error", duration: 4000 });
    }
    onDeleteClose();
  };

  const fields = [
    { name: "manv", label: "Mã NV" },
    { name: "tennv", label: "Tên NV", required: true },
    { name: "mapb", label: "Mã PB" },
    { name: "diachi", label: "Địa chỉ" },
    { name: "sdt", label: "SĐT" },
    { name: "email", label: "Email", type: "email" },
    { name: "chucvu", label: "Chức vụ" },
    { name: "trangthai", label: "Trạng thái", type: "select" },
    { name: "ngaysinh", label: "Ngày sinh", type: "date" },
    { name: "ngayvao", label: "Ngày vào", type: "date" },
    { name: "ghichu", label: "Ghi chú" },
  ];

  return (
    <Stack spacing={5}>
      <Flex justify="space-between" align="center">
        <Heading size="md">Quản lý nhân viên</Heading>
        <Button size="sm" colorScheme="blue" onClick={() => { setIsEditing(false); setForm({}); onOpen(); }}>
          Thêm nhân viên
        </Button>
      </Flex>

      {loading && <Flex justify="center"><Spinner /></Flex>}
      {error && <Text color="red.500">{error}</Text>}

      {!loading && !error && (
        <Table variant="simple" size="md">
          <Thead bg="blue.50">
            <Tr>
              <Th>Mã NV</Th>
              <Th>Tên NV</Th>
              <Th>Chức vụ</Th>
              <Th>Mã PB</Th>
              <Th>Trạng thái</Th>
              <Th textAlign="center">Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((emp, idx) => (
              <Tr key={emp.id} bg={idx % 2 === 0 ? "gray.50" : "white"}>
                <Td>{emp.manv}</Td>
                <Td>{emp.tennv}</Td>
                <Td>{emp.chucvu}</Td>
                <Td>{emp.mapb}</Td>
                <Td>
                  <Badge colorScheme={emp.trangthai ? "green" : "red"}>
                    {emp.trangthai ? "Đang làm" : "Nghỉ việc"}
                  </Badge>
                </Td>
                <Td>
                  <Flex justify="center">
                    <Tooltip label="Sửa">
                      <IconButton aria-label="Sửa" icon={<FaEdit />} colorScheme="yellow" size="sm" mr={2}
                        onClick={() => { setForm(emp); setIsEditing(true); onOpen(); }} />
                    </Tooltip>
                    <Tooltip label="Xóa">
                      <IconButton aria-label="Xóa" icon={<FaTrash />} colorScheme="red" size="sm"
                        onClick={() => { setDeleteId(emp.id); onDeleteOpen(); }} />
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
          <ModalHeader>{isEditing ? "Cập nhật nhân viên" : "Thêm nhân viên"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {fields.map(f => (
                <FormControl key={f.name} isRequired={f.required}>
                  <FormLabel>{f.label}</FormLabel>

                  {f.name === "mapb" ? (
                    <Select
                      name="mapb"
                      value={form.mapb || ""}
                      onChange={handleChange}
                      placeholder="Chọn phòng ban"
                    >
                      {phongbanList.map(pb => (
                        <option key={pb.mapb} value={pb.mapb}>
                          {pb.mapb} - {pb.tenpb}
                        </option>
                      ))}
                    </Select>
                  ) : f.type === "select" ? (
                    <Select name="trangthai" value={form.trangthai ?? 1} onChange={handleChange}>
                      <option value={1}>Đang làm</option>
                      <option value={0}>Nghỉ việc</option>
                    </Select>
                  ) : (
                    <Input
                      name={f.name}
                      type={f.type || "text"}
                      value={form[f.name as keyof Employee] || ""}
                      onChange={handleChange}
                      // Chỉ read-only khi edit manv? Nếu muốn có thể chỉnh sửa vẫn để false
                      isReadOnly={isEditing && f.name === "manv" ? false : false}
                    />
                  )}
                </FormControl>
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSave}>
              {isEditing ? "Cập nhật" : "Thêm"}
            </Button>
            <Button variant="ghost" onClick={onClose}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Xác nhận xóa */}
      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Xóa nhân viên</AlertDialogHeader>
            <AlertDialogBody>Bạn có chắc muốn xóa?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>Hủy</Button>
              <Button colorScheme="red" ml={3} onClick={handleDelete}>Xóa</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Stack>
  );
}
