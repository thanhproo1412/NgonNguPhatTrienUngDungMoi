'use client'

import { useState, useEffect } from "react";
import {
  Stack, Flex, Heading, Button, Table, Thead, Tbody, Tr, Th, Td,
  Select, Input, useToast, Spinner, Box, HStack, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  FormControl, FormLabel, Checkbox, SimpleGrid, Text
} from "@chakra-ui/react";

interface Product {
  id?: number;
  mahang: string;
  tenhang: string;
  malh?: string;
  dvt?: string;
  thue?: number;
  price?: number;
  ghichu?: string;
  imageURL?: string;
  isNew?: boolean;
  tonkho?: number;
}

interface Category {
  malh: string;
  tenlh: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isNewCategoryChecked, setIsNewCategoryChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [inventoryQty, setInventoryQty] = useState<number>(0);
  const [inventoryType, setInventoryType] = useState<'IN' | 'OUT'>('IN');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const toast = useToast();

  // ----------------- API Calls -----------------
  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch('/api/hanghoa');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast({ title: "Lỗi tải hàng hóa", status: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch('/api/loaihang');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function saveProduct() {
    try {
      if (!form.mahang || !form.tenhang) throw new Error("Mã và tên hàng hóa là bắt buộc");
      if (!form.malh && !(isNewCategoryChecked && newCategoryName.trim())) {
        toast({ title: "Vui lòng chọn loại hàng hoặc nhập loại hàng mới", status: "error" });
        return;
      }
      // Thêm loại hàng mới nếu chọn
      if (isNewCategoryChecked && newCategoryName.trim()) {
        const resCat = await fetch('/api/loaihang', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tenlh: newCategoryName })
        });
        if (!resCat.ok) throw new Error('Không thể thêm loại hàng mới');
        const catData = await resCat.json();
        form.malh = catData.malh;
      }

      const method = isEditing ? 'PUT' : 'POST';
      const url = '/api/hanghoa' + (isEditing && form.id ? `?id=${form.id}` : '');
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('Lỗi khi lưu sản phẩm');

      toast({ title: 'Thành công', status: 'success' });
      setForm({});
      setNewCategoryName('');
      setIsNewCategoryChecked(false);
      setModalOpen(false);
      fetchProducts();
      fetchCategories();
    } catch (err: any) {
      toast({ title: 'Lỗi', description: err.message, status: 'error' });
    }
  }

  function confirmDeleteProduct(product: Product) {
    setCurrentProduct(product);
    setDeleteModalOpen(true);
  }

  async function handleDeleteProduct() {
    if (!currentProduct?.id) return;
    try {
      const res = await fetch(`/api/hanghoa?id=${currentProduct.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Xóa thất bại');
      toast({ title: 'Xóa thành công', status: 'success' });
      setDeleteModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      toast({ title: 'Lỗi', description: err.message, status: 'error' });
    }
  }

  function openInventoryModal(product: Product, type: 'IN' | 'OUT') {
    setCurrentProduct(product);
    setInventoryType(type);
    setInventoryQty(0);
    setInventoryModalOpen(true);
  }

  async function handleInventorySubmit() {
    if (!currentProduct || inventoryQty <= 0) {
      toast({ title: "Số lượng không hợp lệ", status: "error" });
      return;
    }
    try {
      const res = await fetch('/api/tonkho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: currentProduct.id || currentProduct.mahang,
          quantity: inventoryQty,
          type: inventoryType
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi');

      toast({ title: 'Cập nhật tồn kho thành công', status: 'success' });
      setInventoryModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      toast({ title: 'Lỗi', description: err.message, status: 'error' });
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ----------------- Pagination -----------------
  const totalPages = Math.ceil(products.length / pageSize);
  const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // ----------------- Render -----------------
  return (
    <Stack spacing={5}>
      <Flex justify="space-between" align="center">
        <Heading size="md">Quản lý Hàng hóa / Tồn kho</Heading>
        <Button colorScheme="blue" onClick={() => { setForm({}); setIsEditing(false); setModalOpen(true) }}>Thêm hàng hóa</Button>
      </Flex>

      <Flex justify="flex-end" align="center" gap={3}>
        <Box>Hiển thị mỗi trang:</Box>
        <Select w="fit-content" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
          {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
        </Select>
      </Flex>

      {loading ? <Spinner /> : (
        <Table variant="simple" size="md">
          <Thead bg="blue.50">
            <Tr>
              <Th>Ảnh</Th>
              <Th>Mã</Th>
              <Th>Tên</Th>
              <Th>Loại</Th>
              <Th>Đơn vị</Th>
              <Th>Thuế</Th>
              <Th>Giá</Th>
              <Th>Ghi chú</Th>
              <Th>Tồn</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedProducts.map((p, idx) => (
              <Tr key={p.id} bg={idx % 2 === 0 ? "gray.50" : "white"}>
                <Td>
                  {p.imageURL ? (
                    <img
                      src={p.imageURL}
                      alt={p.tenhang}
                      style={{ width: 50, height: 50, objectFit: "cover", cursor: "pointer" }}
                      onClick={() => { setCurrentImage(p.imageURL!); setImageModalOpen(true); }}
                    />
                  ) : "Chưa có"}
                </Td>
                <Td>{p.mahang}</Td>
                <Td>{p.tenhang}</Td>
                <Td>{categories.find(c => c.malh === p.malh)?.tenlh || p.malh}</Td>
                <Td>{p.dvt}</Td>
                <Td>{p.thue}</Td>
                <Td>{p.price}</Td>
                <Td>{p.ghichu}</Td>
                <Td>
                  <Flex gap={2} align="center">
                    <Button size="sm" colorScheme="green" onClick={() => openInventoryModal(p, 'IN')}>+</Button>
                    <Button size="sm" colorScheme="red" onClick={() => openInventoryModal(p, 'OUT')}>-</Button>
                    <Box ml={2}>Số tồn: {p.tonkho || 0}</Box>
                  </Flex>
                </Td>
                <Td>
                  <Button size="sm" onClick={() => { setForm(p); setIsEditing(true); setModalOpen(true) }}>Sửa</Button>
                  <Button size="sm" colorScheme="red" onClick={() => confirmDeleteProduct(p)}>Xóa</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Inventory Modal */}
      <Modal isOpen={inventoryModalOpen} onClose={() => setInventoryModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{inventoryType === 'IN' ? 'Tăng' : 'Giảm'} tồn kho - {currentProduct?.tenhang}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="number" placeholder="Số lượng" value={inventoryQty} onChange={e => setInventoryQty(Number(e.target.value))} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleInventorySubmit}>Xác nhận</Button>
            <Button variant="ghost" onClick={() => setInventoryModalOpen(false)}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xác nhận xóa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Bạn có chắc muốn xóa sản phẩm <b>{currentProduct?.tenhang}</b> không?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteProduct}>Xóa</Button>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Product Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? 'Sửa' : 'Thêm'} hàng hóa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isRequired><FormLabel>Mã hàng</FormLabel><Input name="mahang" value={form.mahang || ''} onChange={e => setForm({ ...form, mahang: e.target.value })} /></FormControl>
              <FormControl isRequired><FormLabel>Tên hàng</FormLabel><Input name="tenhang" value={form.tenhang || ''} onChange={e => setForm({ ...form, tenhang: e.target.value })} /></FormControl>
              <FormControl><FormLabel>Đơn vị</FormLabel><Input name="dvt" value={form.dvt || ''} onChange={e => setForm({ ...form, dvt: e.target.value })} /></FormControl>
              <FormControl><FormLabel>Thuế</FormLabel><Input type="number" name="thue" value={form.thue || 0} onChange={e => setForm({ ...form, thue: Number(e.target.value) })} /></FormControl>
              <FormControl><FormLabel>Giá</FormLabel><Input type="number" name="price" value={form.price || 0} onChange={e => setForm({ ...form, price: Number(e.target.value) })} /></FormControl>
              <FormControl><FormLabel>Ghi chú</FormLabel><Input name="ghichu" value={form.ghichu || ''} onChange={e => setForm({ ...form, ghichu: e.target.value })} /></FormControl>
              <FormControl>
                <FormLabel>
                  Loại hàng <Text as="span" color="red">*</Text>
                </FormLabel>
                <Select
                  name="malh"
                  value={form.malh || ''}
                  onChange={e => setForm({ ...form, malh: e.target.value })}
                  disabled={isNewCategoryChecked}
                  placeholder="-- Chọn --"
                >
                  {categories.map(c => <option key={c.malh} value={c.malh}>{c.tenlh}</option>)}
                </Select>
                <Checkbox
                  mt={2}
                  isChecked={isNewCategoryChecked}
                  onChange={e => setIsNewCategoryChecked(e.target.checked)}
                >
                  Loại hàng mới
                </Checkbox>

                {isNewCategoryChecked && (
                  <Input
                    mt={2}
                    placeholder="Tên loại hàng mới"
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                  />
                )}
              </FormControl>
              <FormControl>
                <FormLabel>URL ảnh</FormLabel>
                <Input
                  name="imageURL"
                  placeholder="Nhập URL ảnh"
                  value={form.imageURL || ''}
                  onChange={e => setForm({ ...form, imageURL: e.target.value })}
                />
              </FormControl>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveProduct}>{isEditing ? 'Cập nhật' : 'Thêm'}</Button>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      // Modal hiển thị ảnh lớn
      <Modal isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalBody p={0}>
            <img src={currentImage} alt="Ảnh sản phẩm" style={{ width: "100%", borderRadius: 8 }} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Pagination */}
      <HStack spacing={2} justify="center" mt={2}>
        {getPageNumbers(currentPage, totalPages).map((page, idx) =>
          typeof page === "number" ? (
            <Button key={idx} size="sm" colorScheme={page === currentPage ? "blue" : "gray"} onClick={() => setCurrentPage(page)}>{page}</Button>
          ) : <Box key={idx} px={2}>...</Box>
        )}
      </HStack>
    </Stack>
  )
}

// ----------------- Pagination logic -----------------
function getPageNumbers(current: number, total: number) {
  const delta = 2;
  const pages: (number | string)[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    for (let i = current - delta; i < current; i++) if (i > 1) pages.push(i);
    if (current !== 1 && current !== total) pages.push(current);
    for (let i = current + 1; i <= current + delta; i++) if (i < total) pages.push(i);
    if (typeof pages[1] === "number" && (pages[1] as number) > 2) pages.splice(1, 0, "...");
    if (typeof pages[pages.length - 2] === "number" && (pages[pages.length - 2] as number) < total - 1) pages.splice(pages.length - 1, 0, "...");
    pages.push(total);
  }

  return pages;
}
