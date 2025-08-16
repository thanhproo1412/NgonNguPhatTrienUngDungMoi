'use client'

import { useState, useEffect } from 'react'
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Spinner, Center, Flex, Heading, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input, FormControl, FormLabel, useToast
} from '@chakra-ui/react'

interface PhongBan {
  mapb: string
  tenpb: string
  ghichu?: string
}

export default function PhongBanPage() {
  const [phongban, setPhongban] = useState<PhongBan[]>([])
  const [form, setForm] = useState<Partial<PhongBan>>({})
  const [editId, setEditId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false) // <-- trạng thái loading
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  // Load data
  const fetchData = async () => {
    setLoading(true) // Bắt đầu loading
    try {
      const res = await fetch('/api/phongban')
      const data = await res.json()
      setPhongban(data)
    } catch (error) {
      toast({ title: 'Lỗi khi tải dữ liệu', status: 'error' })
    } finally {
      setLoading(false) // Kết thúc loading
    }
  }

  useEffect(() => { fetchData() }, [])

  // Thêm / Cập nhật
  const handleSave = async () => {
    const method = editId ? 'PUT' : 'POST'
    const url = editId ? `/api/phongban/${editId}` : '/api/phongban'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    toast({ title: editId ? 'Cập nhật thành công' : 'Thêm thành công', status: 'success' })
    fetchData()
    onClose()
    setForm({})
    setEditId(null)
  }

  // Xóa
  const handleDelete = async (id: string) => {
    if (!confirm('Xóa phòng ban này?')) return
    await fetch(`/api/phongban/${id}`, { method: 'DELETE' })
    toast({ title: 'Xóa thành công', status: 'info' })
    fetchData()
  }

  return (
    <Box p={5}>

      <Flex justify="space-between" align="center">
        <Heading size="md">Quản lý phòng ban</Heading>
        <Button colorScheme="blue" onClick={() => { setForm({}); setEditId(null); onOpen() }}>Thêm phòng ban</Button>
      </Flex>

      {/* Hiển thị loading spinner */}
      {loading ? (
        <Center mt={10}>
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Center>
      ) : (
        <Table variant="simple" size="md">
          <Thead bg="blue.50">
            <Tr>
              <Th>Mã PB</Th>
              <Th>Tên phòng ban</Th>
              <Th>Mô tả</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {phongban.map((pb, idx) => (
              <Tr key={pb.mapb} bg={idx % 2 === 0 ? "gray.50" : "white"}>
                <Td>{pb.mapb}</Td>
                <Td>{pb.tenpb}</Td>
                <Td>{pb.ghichu}</Td>
                <Td>
                  <Button size="sm" colorScheme="yellow" onClick={() => { setForm(pb); setEditId(pb.mapb); onOpen() }}>Sửa</Button>
                  <Button ml={2} size="sm" colorScheme="red" onClick={() => handleDelete(pb.mapb)}>Xóa</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Modal Form */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editId ? 'Sửa phòng ban' : 'Thêm phòng ban'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!editId && (
              <FormControl>
                <FormLabel>Mã phòng ban</FormLabel>
                <Input value={form.mapb || ''} onChange={e => setForm({ ...form, mapb: e.target.value })} />
              </FormControl>
            )}
            <FormControl mt={3}>
              <FormLabel>Tên phòng ban</FormLabel>
              <Input value={form.tenpb || ''} onChange={e => setForm({ ...form, tenpb: e.target.value })} />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Mô tả</FormLabel>
              <Input value={form.ghichu || ''} onChange={e => setForm({ ...form, ghichu: e.target.value })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSave}>Lưu</Button>
            <Button ml={3} onClick={onClose}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
