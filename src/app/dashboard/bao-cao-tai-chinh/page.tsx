'use client';

import { Box, Heading, SimpleGrid, Card, CardHeader, CardBody, Text, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// Load Ant Design Plots dynamically to prevent SSR issues
const Pie = dynamic(() => import("@ant-design/plots").then(mod => mod.Pie), { ssr: false });
const Line = dynamic(() => import("@ant-design/plots").then(mod => mod.Line), { ssr: false });

export default function FinancialReport() {
  const pieConfig = useMemo(() => ({
    data: [
      { type: "Marketing", value: 27 },
      { type: "Development", value: 25 },
      { type: "Operations", value: 18 },
      { type: "Customer Support", value: 15 },
      { type: "Misc", value: 10 },
    ],
    angleField: "value",
    colorField: "type",
    radius: 1,
    label: {
      type: "inner",
      offset: "-30%",
      content: "{value}%",
      style: { fontSize: 14, textAlign: "center" },
    },
    interactions: [{ type: "element-active" }],
  }), []);

  const lineConfig = useMemo(() => ({
    data: [
      { month: "Jan", value: 1200 },
      { month: "Feb", value: 1600 },
      { month: "Mar", value: 1400 },
      { month: "Apr", value: 1800 },
      { month: "May", value: 2000 },
      { month: "Jun", value: 2200 },
    ],
    xField: "month",
    yField: "value",
    smooth: true,
    lineStyle: { lineWidth: 3 },
    point: { size: 5, shape: "circle" },
  }), []);

  return (
    <Box p={8}>
      <Heading size="xl" textAlign="center" mb={8}>
        Financial Dashboard
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card shadow="xl" borderRadius="2xl">
          <CardHeader>
            <Heading size="md">Expense Distribution</Heading>
          </CardHeader>
          <CardBody>
            <Pie {...pieConfig} />
          </CardBody>
        </Card>

        <Card shadow="xl" borderRadius="2xl">
          <CardHeader>
            <Heading size="md">Monthly Revenue</Heading>
          </CardHeader>
          <CardBody>
            <Line {...lineConfig} />
          </CardBody>
        </Card>
      </SimpleGrid>

      <Flex justify="center" mt={10}>
        <Text fontSize="lg" fontWeight="medium" color="gray.600">
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </Flex>
    </Box>
  );
}