"use client";

import React from "react";
import { Card } from "antd";
import { Table, DatePicker, Button } from "antd";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function TonKhoBaoCaoPage() {
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "maSP",
      key: "maSP",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSP",
      key: "tenSP",
    },
    {
      title: "Số lượng tồn",
      dataIndex: "soLuong",
      key: "soLuong",
    },
  ];

  const data = [
    { key: 1, maSP: "SP001", tenSP: "Bút bi", soLuong: 120 },
    { key: 2, maSP: "SP002", tenSP: "Sổ tay", soLuong: 85 },
    { key: 3, maSP: "SP003", tenSP: "Thước kẻ", soLuong: 50 },
  ];

  const chartData = {
    labels: data.map((item) => item.tenSP),
    datasets: [
      {
        label: "Tồn kho",
        data: data.map((item) => item.soLuong),
        backgroundColor: "#1890ff",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Báo cáo tồn kho</h1>

      <Card className="shadow-md p-4">
        <div className="flex gap-4 mb-4">
          <DatePicker picker="month" placeholder="Chọn tháng" />
          <Button type="primary">Lọc</Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>

      <Card className="shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Biểu đồ tồn kho</h2>
        <Bar data={chartData} />
      </Card>
    </div>
  );
}
