"use client";

import { Card, DatePicker, Table, Tabs } from "antd";
import { Column, Pie } from "@ant-design/plots";
import { useState } from "react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function BaoCaoPage() {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

  // Sample data
  const tableData = [
    { key: "1", product: "Sản phẩm A", quantity: 20, revenue: 5000000 },
    { key: "2", product: "Sản phẩm B", quantity: 10, revenue: 2500000 },
    { key: "3", product: "Sản phẩm C", quantity: 15, revenue: 3000000 },
  ];

  const columns = [
    { title: "Sản phẩm", dataIndex: "product", key: "product" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    { title: "Doanh thu", dataIndex: "revenue", key: "revenue", render: (v: number) => v.toLocaleString("vi-VN") + " ₫" },
  ];

  const barConfig = {
    data: tableData,
    xField: "revenue",
    yField: "product",
    label: { position: "right" },
    legend: false,
  };

  const pieConfig = {
    data: tableData,
    angleField: "quantity",
    colorField: "product",
    radius: 1,
    label: { type: "inner", offset: "-30%", content: "{value}" },
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title="Báo cáo tổng hợp" style={{ borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <RangePicker
          onChange={(val) => {
            if (val && val[0] && val[1]) {
              setDateRange([val[0], val[1]]);
            } else {
              setDateRange(null);
            }
          }}
          style={{ marginBottom: 16 }}
        />

        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Bảng dữ liệu",
              children: <Table dataSource={tableData} columns={columns} pagination={false} />,
            },
            {
              key: "2",
              label: "Biểu đồ cột",
              children: <Column {...barConfig} />,
            },
            {
              key: "3",
              label: "Biểu đồ tròn",
              children: <Pie {...pieConfig} />,
            },
          ]}
        />
      </Card>
    </div>
  );
}
