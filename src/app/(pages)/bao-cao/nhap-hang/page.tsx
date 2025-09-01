"use client";

import React, { useState } from "react";
import { Table, DatePicker, Select, Card, Typography, Button, Space } from "antd";
import { DownloadOutlined, ReloadOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/charts";

const { RangePicker } = DatePicker;
const { Title } = Typography;

export default function BaoCaoNhapHang() {
  const [data, setData] = useState([
    { key: 1, date: "2025-08-01", supplier: "Nhà cung cấp A", quantity: 120 },
    { key: 2, date: "2025-08-02", supplier: "Nhà cung cấp B", quantity: 80 },
    { key: 3, date: "2025-08-03", supplier: "Nhà cung cấp A", quantity: 200 },
  ]);

  const columns = [
    { title: "Ngày nhập", dataIndex: "date", key: "date" },
    { title: "Nhà cung cấp", dataIndex: "supplier", key: "supplier" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
  ];

  const chartConfig = {
    data,
    xField: "date",
    yField: "quantity",
    smooth: true,
    point: { size: 5, shape: "circle" },
    color: "#1677ff",
  };

  return (
    <div className="p-6 space-y-6">
      <Title level={3}>Báo Cáo Nhập Hàng</Title>

      <Card className="shadow-md rounded-2xl">
        <Space wrap className="mb-4">
          <RangePicker />
          <Select
            placeholder="Chọn nhà cung cấp"
            style={{ width: 200 }}
            options={[
              { label: "Nhà cung cấp A", value: "A" },
              { label: "Nhà cung cấp B", value: "B" },
            ]}
          />
          <Button icon={<ReloadOutlined />}>Lọc</Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            Xuất báo cáo
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>

      <Card className="shadow-md rounded-2xl">
        <Title level={4}>Biểu đồ số lượng nhập</Title>
        <Line {...chartConfig} />
      </Card>
    </div>
  );
}
