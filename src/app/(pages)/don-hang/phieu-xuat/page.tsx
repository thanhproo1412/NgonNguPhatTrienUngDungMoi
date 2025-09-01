"use client";

import { Table, Button, Card, Space, Typography } from "antd";
import { FileAddOutlined, ReloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

const { Title } = Typography;

interface PhieuXuat {
  key: string;
  maPhieu: string;
  ngayXuat: string;
  nguoiXuat: string;
  tongTien: number;
}

const PhieuXuatPage = () => {
  const [data, setData] = useState<PhieuXuat[]>([
    { key: "1", maPhieu: "PX001", ngayXuat: "2025-09-01", nguoiXuat: "Nguyen Van A", tongTien: 1500000 },
    { key: "2", maPhieu: "PX002", ngayXuat: "2025-09-02", nguoiXuat: "Tran Thi B", tongTien: 2750000 },
  ]);

  const columns: ColumnsType<PhieuXuat> = [
    { title: "Mã phiếu", dataIndex: "maPhieu", key: "maPhieu" },
    { title: "Ngày xuất", dataIndex: "ngayXuat", key: "ngayXuat" },
    { title: "Người xuất", dataIndex: "nguoiXuat", key: "nguoiXuat" },
    { title: "Tổng tiền", dataIndex: "tongTien", key: "tongTien", render: (val) => `${val.toLocaleString()}₫` },
  ];

  return (
    <Card style={{ margin: 24 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Title level={3}>Danh sách Phiếu Xuất</Title>
        <Space>
          <Button type="primary" icon={<FileAddOutlined />}>Tạo phiếu xuất</Button>
          <Button icon={<ReloadOutlined />}>Làm mới</Button>
        </Space>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </Space>
    </Card>
  );
};

export default PhieuXuatPage;
