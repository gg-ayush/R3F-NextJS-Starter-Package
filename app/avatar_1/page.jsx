'use client'

import { Avatar } from '@/components/Avatar_component';
import { Canvas } from '@react-three/fiber';

export default function Test() {
  return (
    <div className="size-full">
      {/* <div className="flex flex-col gap-20"> */}
        {/* <BaseCanvas position={new Vector3(0, 0, 3)}> */}
        <Canvas>
        <Avatar 
            modelSrc="https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
            shadows
            animationSrc="/male-idle-3.fbx"
            style={{ background: 'rgb(9,20,26)' }}
            fov={40}
            cameraTarget={1.5}
            cameraInitialDistance={30}
            effects={{
                ambientOcclusion: true
            }}
        />
        </Canvas>
        {/* </BaseCanvas> */}
      {/* </div> */}
    </div>
  );
};