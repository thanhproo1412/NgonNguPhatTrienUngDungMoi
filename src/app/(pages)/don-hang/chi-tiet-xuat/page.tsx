"use client";

import { Table, Card, Typography, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface ChiTietXuat {
  key: string;
  tenSanPham: string;
  soLuong: number;
  donGia: number;
}

const ChiTietXuatPage = () => {
  const data: ChiTietXuat[] = [
    { key: "1", tenSanPham: "Bàn phím cơ", soLuong: 2, donGia: 500000 },
    { key: "2", tenSanPham: "Chuột gaming", soLuong: 1, donGia: 350000 },
  ];

  const columns: ColumnsType<ChiTietXuat> = [
    { title: "Tên sản phẩm", dataIndex: "tenSanPham", key: "tenSanPham" },
    { title: "Số lượng", dataIndex: "soLuong", key: "soLuong" },
    { title: "Đơn giá", dataIndex: "donGia", key: "donGia", render: (val) => `${val.toLocaleString()}₫` },
    { title: "Thành tiền", key: "thanhTien", render: (_, record) => `${(record.soLuong * record.donGia).toLocaleString()}₫` },
  ];

  return (
    <Card style={{ margin: 24 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Title level={3}>Chi tiết Phiếu Xuất</Title>
        <Button type="primary">Quay lại danh sách</Button>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Space>
    </Card>
  );
};

export default ChiTietXuatPage;
