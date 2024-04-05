import Clouds from '@/components/Cesium/Clouds'
import Aircraft from '@/components/Cesium/Aircraft'
import HumanAvatar from '@/components/Cesium/HumanAvatar'
import Vehicle from '@/components/Cesium/Vehicle'
import GPX from '@/components/Cesium/GPX'
import GPX2 from '@/components/Cesium/GPX2'

export default function Cesium() {
  return (
    <>
      <div className='bg-black' style={{ position: 'relative', width: '100vw', height: '100vh' }}>
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
          {/* <Clouds /> */}
          {/* <Aircraft /> */}
          {/* <HumanAvatar /> */}
          {/* <Vehicle /> */}
          {/* <GPX /> */}
          <GPX2 />
        </div>

        <div className='absolute m-2 rounded-xl bg-white/10 p-2 text-white'>HELLO WORLD</div>
      </div>
    </>
  )
}
