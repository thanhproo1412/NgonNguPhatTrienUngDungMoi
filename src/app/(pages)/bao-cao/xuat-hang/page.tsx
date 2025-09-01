"use client";

import React, { useState } from "react";
import { Table, DatePicker, Select, Card, Typography, Button, Space } from "antd";
import { DownloadOutlined, ReloadOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/charts";

const { RangePicker } = DatePicker;
const { Title } = Typography;

export default function BaoCaoXuatHang() {
  const [data, setData] = useState([
    { key: 1, date: "2025-08-01", customer: "Khách hàng X", quantity: 90 },
    { key: 2, date: "2025-08-02", customer: "Khách hàng Y", quantity: 140 },
    { key: 3, date: "2025-08-03", customer: "Khách hàng Z", quantity: 70 },
  ]);

  const columns = [
    { title: "Ngày xuất", dataIndex: "date", key: "date" },
    { title: "Khách hàng", dataIndex: "customer", key: "customer" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
  ];

  const chartConfig = {
    data,
    xField: "date",
    yField: "quantity",
    smooth: true,
    point: { size: 5, shape: "circle" },
    color: "#fa541c",
  };

  return (
    <div className="p-6 space-y-6">
      <Title level={3}>Báo Cáo Xuất Hàng</Title>

      <Card className="shadow-md rounded-2xl">
        <Space wrap className="mb-4">
          <RangePicker />
          <Select
            placeholder="Chọn khách hàng"
            style={{ width: 200 }}
            options={[
              { label: "Khách hàng X", value: "X" },
              { label: "Khách hàng Y", value: "Y" },
              { label: "Khách hàng Z", value: "Z" },
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
        <Title level={4}>Biểu đồ số lượng xuất</Title>
        <Line {...chartConfig} />
      </Card>
    </div>
  );
}
