'use client'
import {
  Cartesian2,
  Cartesian3,
  Clock,
  ClockRange,
  ClockStep,
  ClockViewModel,
  CloudCollection,
  Ion,
  JulianDate,
  Math,
  Terrain,
  Viewer,
  createOsmBuildingsAsync,
  GpxDataSource,
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { useEffect } from 'react'
import './css/main.css'

export default function GPX() {
  useEffect(() => {
    const initializeCesiumViewer = async () => {
      // CesiumJS has a default access token built in but it's not meant for active use.
      // Please set your own access token can be found at: https://cesium.com/ion/tokens.
      // Ion.defaultAccessToken = "YOUR TOKEN HERE";

      Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZGUzY2FhOC00M2ViLTQ2ZmQtYWQ1Yy1kYzNhYzFhZmVkZjIiLCJpZCI6MjAwOTU1LCJpYXQiOjE3MTAyMjkxNDF9.09cBca1kjkwB2lSOjuJMFMjOUV1DWT75cHXqT3zGxIU'

      const clock = new Clock({
        // adjust time so scene is lit by sun
        // startTime: JulianDate.fromIso8601('2013-12-25'),
        // currentTime: JulianDate.fromIso8601('2013-12-25'),
        // stopTime: JulianDate.fromIso8601('2013-12-26'),
        clockRange: ClockRange.UNBOUNDED,
        clockStep: ClockStep.SYSTEM_CLOCK,
        shouldAnimate: true, // Animation on by default
      })

      // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
      const viewer = new Viewer('cesiumContainer', {
        // // show terrain
        terrain: Terrain.fromWorldTerrain({
          //   // for day-night effect
          requestWaterMask: true, // required for water effects
          requestVertexNormals: true, // required for terrain lighting
        }),
        // clockViewModel: new ClockViewModel(clock), // Shows the clock
        // infoBox: false,
        // shouldAnimate: true,
      })

      // Enable rendering the sky
      viewer.scene.skyAtmosphere.show = true

      // // set lighting to true
      viewer.scene.globe.enableLighting = true

      // // for blue sky effect
      viewer.scene.globe.depthTestAgainstTerrain = true

      // // Add Cesium OSM Buildings, a global 3D buildings layer.
      // const osmBuildingsTileset = await createOsmBuildingsAsync()
      // viewer.scene.primitives.add(osmBuildingsTileset)

      viewer.dataSources.add(
        GpxDataSource.load('Afternoon_Mar_30th_.gpx', {
          clampToGround: true,
        }),
      )

      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(85.240347, 27.683235, 1414),
        orientation: {
          heading: Math.toRadians(0.0),
          pitch: Math.toRadians(-35.0),
        },
      })
    }

    initializeCesiumViewer()

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    }
  }, []) // Empty dependency array to run the effect only once
  return (
    <>
      <div className='absolute size-96'>
        <p>Loading ...</p>
      </div>
      <div id='cesiumContainer' className='h-screen w-full'>
        {/* Cesium Viewer container */}
      </div>
    </>
  )
}
