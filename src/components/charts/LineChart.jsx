'use client'

import {
  LineChart,
  AreaChart,
  Area,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  CartesianAxis,
} from 'recharts'

const ramData = [
  {
    name: 'Jan',
    currentPerformance: 20,
    expected: 10,
  },
  {
    name: 'Feb',
    currentPerformance: 40,
    expected: 20,
  },
  {
    name: 'Mar',
    currentPerformance: 60,
    expected: 30,
  },
  {
    name: 'Apr',
    currentPerformance: 63,
    expected: 35,
  },
  {
    name: 'May',
    currentPerformance: 40,
    expected: 40,
  },
  {
    name: 'Jun',
    currentPerformance: 60,
    expected: 55,
  },
  {
    name: 'Jul',
    currentPerformance: 65,
    expected: 65,
  },
  {
    name: 'Aug',
    currentPerformance: 55,
    expected: 70,
  },
  {
    name: 'Sept',
    currentPerformance: 66,
    expected: 75,
  },
  {
    name: 'Oct',
    currentPerformance: 80,
    expected: 80,
  },
  {
    name: 'Nov',
    currentPerformance: 78,
    expected: 85,
  },
  {
    name: 'Dec',
    currentPerformance: 82,
    expected: 90,
  },
]

export default function LineComponent() {
  return (
    <>
      <div className='mt-20 flex flex-col justify-center'>
        {/* For Line chart */}
        <div className='mx-auto flex min-h-48 flex-col rounded-2xl border border-slate-800 bg-black bg-opacity-10 bg-clip-padding p-11 px-4 shadow-xl shadow-blue-700 backdrop-blur-md hover:bg-opacity-25 hover:shadow-blue-500 md:px-8 xl:px-10'>
          <div className='ml-7 text-blue-300'>Performance Data Of Ram of 2023</div>
          <div className='mt-10'>
            <ResponsiveContainer width={650} height={450}>
              <LineChart data={ramData} margin={{ right: 30 }}>
                <XAxis dataKey='name' padding={{ left: 5, right: 20 }} />
                <YAxis width={50} orientation='left' tickCount={5} />

                <CartesianGrid vertical={false} strokeDasharray='6 6' />

                <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />
                {/* <Legend /> */}
                <Legend
                  width={300}
                  wrapperStyle={{
                    top: -40,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: 3,
                  }}
                />

                <Line type='monotone' dataKey='currentPerformance' stroke='#36F097' />
                <Line type='monotone' dataKey='expected' stroke='#268AFF' strokeDasharray='7 7' />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  )
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col gap-4 rounded-md bg-slate-900 p-4'>
        <p className='text-medium text-lg'>{label}</p>
        <p className='text-sm text-blue-400'>
          currentPerformance:
          <span className='ml-2'>${payload[0].value}</span>
        </p>
        <p className='text-sm text-indigo-400'>
          expected:
          <span className='ml-2'>${payload[1].value}</span>
        </p>
      </div>
    )
  }
}
