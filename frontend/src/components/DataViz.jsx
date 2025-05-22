import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export function BarChart({ data }) {
  const chartData = {
    labels: data?.labels || ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Sales',
      data: data?.values || [65, 59, 80, 81],
      backgroundColor: 'rgba(108, 0, 255, 0.5)',
      borderColor: '#6c00ff',
      borderWidth: 2
    }]
  }

  return <Bar data={chartData} />
}

export function LineChart({ data }) {
  const chartData = {
    labels: data?.labels || ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      label: 'Revenue',
      data: data?.values || [65, 59, 80, 81],
      borderColor: '#00f7ff',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(0, 247, 255, 0.1)'
    }]
  }

  return <Line data={chartData} />
}