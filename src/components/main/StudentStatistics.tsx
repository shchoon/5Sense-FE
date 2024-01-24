import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function StudentStatistics() {
  const data = {
    datasets: [
      {
        label: '# of Votes',
        data: [30, 20, 15, 10, 25],
        backgroundColor: [
          '#9B81FE',
          '#7354E8',
          '#9B81FE',
          '#D3C4F9',
          '#E5E7EB'
        ],
        borderColor: ['#FFF'],
        borderWidth: 1,
        spacing: 3
      }
    ]
  }

  return <Doughnut data={data}></Doughnut>
}
