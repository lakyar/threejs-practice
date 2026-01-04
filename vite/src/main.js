import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const canvas = document.getElementById('canvas')
//scence
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0')

//camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5

//object
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({color: '#462285', emissive: '#462285'});
const dodecahedron = new THREE.Mesh(geometry, material);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshLambertMaterial({color: '#b4b4b3'})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.y = -1.5;

scene.add(dodecahedron)
scene.add(box)

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

function animate() {
  requestAnimationFrame(animate)
  dodecahedron.rotation.x += 0.01
  box.rotation.y += 0.01
  controls.update()
  renderer.render(scene, camera)
}

//handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/ window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

animate()