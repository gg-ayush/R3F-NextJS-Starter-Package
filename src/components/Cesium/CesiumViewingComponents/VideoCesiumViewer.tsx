import VideoCesium from '../VideoCesium'

import AreaChartComponent from '../../charts/AreaChart'
import LineComponent from '../../charts/LineChart'
import PieChartComponent from '../../charts/PieChart'

const VideoCesiumViewer = () => {
  return (
    <>
      <div className='absolute -top-20 left-0 h-screen w-full'>
        {/* CesiumViewer as background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Cesium */}
          <VideoCesium />
        </div>

        <div className='absolute left-24 top-24 bg-purple-900/20'>
          <LineComponent />
        </div>
        <div className='absolute right-10 top-24 w-[300px] bg-purple-900/20'>
          <AreaChartComponent />
        </div>
        <div className='absolute bottom-24 right-10 w-[300px] bg-purple-900/20'>
          <PieChartComponent />
        </div>
        <div className='absolute bottom-24 left-24 h-[250px] w-[350px] bg-purple-900/20'>
          <AreaChartComponent />
        </div>
      </div>
    </>
  )
}

export default VideoCesiumViewer
