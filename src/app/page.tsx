"use client"
import { useEffect } from 'react'
import type { NextPage } from 'next'
import * as THREE from 'three'

const Home: NextPage = () => {
  let canvas: HTMLElement
  useEffect(() => {
    if (canvas) return
    // canvasを取得
    canvas = document.getElementById('canvas')!

    // シーン
    const scene = new THREE.Scene()

    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight
    }

    // カメラ
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    )
    camera.position.set(1,0,3)

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)

    // ボックスジオメトリー
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 32)
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100, Math.PI * 2)
    const planeGeometry = new THREE.PlaneGeometry(10, 10)

    // バッファジオメトリー
    const geometry = new THREE.BufferGeometry()

    const positionsArray = new Float32Array(
      [
        0, 0, 0,
        0, 1, 0,
        1, 0, 0
      ]
    )

    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

    geometry.setAttribute('position', positionsAttribute)

    console.log(positionsArray)

    // マテリアル
    const boxMaterial = new THREE.MeshNormalMaterial()
    boxMaterial.wireframe = true

    // メッシュ化
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    const sphere = new THREE.Mesh(sphereGeometry, boxMaterial)
    const torus = new THREE.Mesh(torusGeometry, boxMaterial)
    const plane = new THREE.Mesh(planeGeometry, boxMaterial)
    const buffer = new THREE.Mesh(geometry, boxMaterial)
    sphere.position.x = 1.5
    torus.position.x = -1.5
    plane.position.y = -1.5
    plane.rotation.x = -Math.PI * 0.5
    box.rotation.set(10, 10, 10)

    // シーンに追加
    // scene.add(box, sphere, torus, plane)
    scene.add(buffer)

    // ライト
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 0.2)
    pointLight.position.set(1, 2, 3)
    scene.add(pointLight)

    // アニメーション
    const clock = new THREE.Clock()
    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      box.rotation.x = elapsedTime
      box.rotation.y = elapsedTime
      window.requestAnimationFrame(tick)
      renderer.render(scene, camera)
    }
    tick()

    // ブラウザのリサイズ処理
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(window.devicePixelRatio)
    })
  }, [])
  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  )
}

export default Home