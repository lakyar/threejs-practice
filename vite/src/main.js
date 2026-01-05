import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

//scence
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1020)

//camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5

//object
const geometry = new THREE.DodecahedronGeometry(1, 2)
const material = new THREE.MeshLambertMaterial({color: '#462285', emissive: '#462285'});
const dodecahedron = new THREE.Mesh(geometry, material);

const positionAttribute = geometry.attributes.position
const originalPositions = positionAttribute.array.slice()
const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshLambertMaterial({color: '#b4b4b3'})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.y = -1.5;

scene.add(dodecahedron)
scene.add(box)

const glowMaterial = new THREE.MeshBasicMaterial({
  color: 0x7b5cff,
  transparent: true,
  opacity: 0.25
})

const glowMesh = new THREE.Mesh(
  geometry,
  glowMaterial
)

scene.add(glowMesh)

//light
const light = new THREE.SpotLight(0x006769, 100)
light.position.set(1,1,1);
scene.add(light)

//renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.setPixelRatio(window.devicePixelRatio)

// renderer.render(scene, camera)

//orbit controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

let time = 0


function animate() {
  requestAnimationFrame(animate)
  time += 0.015

  for (let i = 0; i < positionAttribute.count; i++) {
    const ix = i * 3
    const iy = i * 3 + 1
    const iz = i * 3 + 2

    const x = originalPositions[ix]
    const y = originalPositions[iy]
    const z = originalPositions[iz]

    const wave =
      Math.sin(time + x * 2) *
      Math.cos(time + y * 2) *
      Math.sin(time + z * 2)

    positionAttribute.array[ix] = x + wave * 0.15
    positionAttribute.array[iy] = y + wave * 0.15
    positionAttribute.array[iz] = z + wave * 0.15
  }

  positionAttribute.needsUpdate = true

  dodecahedron.rotation.y += 0.002
  controls.update()
  renderer.render(scene, camera)
}


const mouse = { x: 0, y: 0 }

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
})

//handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/ window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05
  camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.05
  camera.lookAt(scene.position)

})

animate()

