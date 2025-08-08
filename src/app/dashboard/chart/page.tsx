'use client';


import React from "react";
import { Box, Flex, Grid, Heading, Icon, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { FiBarChart2, FiPieChart, FiTrendingUp } from "react-icons/fi";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

// Example data for charts
const lineChartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 15000, 20000, 30000],
      borderColor: "#4299E1",
      backgroundColor: "rgba(66, 153, 225, 0.3)",
      tension: 0.4,
    },
  ],
};

const barChartData = {
  labels: ["Product A", "Product B", "Product C", "Product D"],
  datasets: [
    {
      label: "Sales",
      data: [25, 40, 20, 35],
      backgroundColor: ["#ECC94B", "#48BB78", "#ED8936", "#4299E1"],
    },
  ],
};

const pieChartData = {
  labels: ["Desktop", "Mobile", "Tablet"],
  datasets: [
    {
      data: [60, 30, 10],
      backgroundColor: ["#F56565", "#4299E1", "#ED8936"],
    },
  ],
};

export default function AdminDashboard() {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box bg={bgColor} minH="100vh" p={5}>
      {/* Dashboard Header */}
      <Heading size="lg" mb={5} textAlign="center">
        Admin Dashboard
      </Heading>

      {/* Main Dashboard Layout */}
      <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={6}>
        {/* Charts Section */}
        <Box bg={cardBg} p={5} borderRadius="lg" shadow="md">
          <Heading size="md" mb={3}>
            Revenue Overview
          </Heading>
          <Line data={lineChartData} />
        </Box>
        <Box bg={cardBg} p={5} borderRadius="lg" shadow="md">
          <Heading size="md" mb={3}>
            Sales Breakdown
          </Heading>
          <Pie data={pieChartData} />
        </Box>
      </Grid>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mt={6}>
        <Box bg={cardBg} p={5} borderRadius="lg" shadow="md">
          <Heading size="md" mb={3}>
            Product Performance
          </Heading>
          <Bar data={barChartData} />
        </Box>
        <Box bg={cardBg} p={5} borderRadius="lg" shadow="md">
          <Heading size="md" mb={3}>
            Analytics Summary
          </Heading>
          <VStack spacing={3} align="start">
            <Flex align="center">
              <Icon as={FiBarChart2} w={5} h={5} color="yellow.400" />
              <Text ml={3}>Monthly Revenue: $50,000</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FiPieChart} w={5} h={5} color="blue.400" />
              <Text ml={3}>Customer Conversion: 12%</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FiTrendingUp} w={5} h={5} color="green.400" />
              <Text ml={3}>Growth: 8%</Text>
            </Flex>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}
