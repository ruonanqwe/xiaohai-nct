export const mockAnalytics = {
  averageApprovalTime: 3.5,
  approvalRate: 94.2,
  averageSubsidyAmount: 3280,
  satisfactionScore: 4.8,
  lastMonthComparison: {
    approvalTime: -0.5,
    approvalRate: 2.1,
    subsidyAmount: 15.3,
    satisfaction: 0.2
  },
  barData: {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '补贴申请数',
        data: [4200, 3800, 5100, 4800, 5600, 6200],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: '审批通过数',
        data: [3800, 3500, 4800, 4500, 5200, 5800],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
    ],
  },
  lineData: {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '用户总数',
        data: [8000, 8500, 9200, 9800, 10200, 10482],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.3,
      },
      {
        label: '活跃用户',
        data: [6000, 6300, 6800, 7200, 7600, 7800],
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.3,
      }
    ],
  },
  pieData: {
    labels: ['教育补贴', '医疗补贴', '住房补贴', '创业补贴', '其他补贴'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(249, 115, 22, 0.5)',
          'rgba(168, 85, 247, 0.5)',
          'rgba(107, 114, 128, 0.5)',
        ],
      },
    ],
  },
  doughnutData: {
    labels: ['审批通过', '审核中', '待补充材料', '已拒绝'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(249, 115, 22, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
      },
    ],
  },
  regionBarData: {
    labels: ['城区', '郊区', '农村', '偏远地区'],
    datasets: [
      {
        label: '申请数量',
        data: [2800, 1600, 1200, 600],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  }
} 