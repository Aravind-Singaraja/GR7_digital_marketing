// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

// const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(0x050816, 0.02);

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// camera.position.z = 40;

// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector("#bg"),
//   alpha: true,
//   antialias: true
// });

// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

// /* ================================
//    📊 RISING BAR GRAPH
// ================================ */

// const bars = [];
// const barCount = 20;

// for (let i = 0; i < barCount; i++) {

//   const height = Math.random() * 8 + 2;

//   const geometry = new THREE.BoxGeometry(1, height, 1);
//   const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff88,
//     transparent: true,
//     opacity: 0.5
//   });

//   const bar = new THREE.Mesh(geometry, material);

//   bar.position.x = (i - barCount / 2) * 2;
//   bar.position.y = -15;
//   bar.position.z = -10;

//   bar.userData = { targetHeight: height };

//   scene.add(bar);
//   bars.push(bar);
// }

// /* ================================
//    🔴 PULSING CONVERSION DOTS
// ================================ */

// const dots = [];
// for (let i = 0; i < 30; i++) {

//   const geometry = new THREE.SphereGeometry(0.3, 16, 16);
//   const material = new THREE.MeshBasicMaterial({
//     color: 0x00ffcc,
//     transparent: true
//   });

//   const dot = new THREE.Mesh(geometry, material);

//   dot.position.x = (Math.random() - 0.5) * 60;
//   dot.position.y = (Math.random() - 0.5) * 30;
//   dot.position.z = (Math.random() - 0.5) * 10;

//   dot.userData = { pulse: Math.random() * Math.PI };

//   scene.add(dot);
//   dots.push(dot);
// }

// /* ================================
//    🖱 Mouse Interaction
// ================================ */

// let mouseX = 0;
// let mouseY = 0;

// document.addEventListener("mousemove", e => {
//   mouseX = (e.clientX / window.innerWidth) - 0.5;
//   mouseY = (e.clientY / window.innerHeight) - 0.5;
// });

// /* ================================
//    🎬 Animation Loop
// ================================ */

// function animate() {
//   requestAnimationFrame(animate);

//   // Bars rising animation
//   bars.forEach(bar => {
//     if (bar.position.y < bar.userData.targetHeight - 15) {
//       bar.position.y += 0.05;
//     }
//   });

//   // Pulsing dots
//   dots.forEach(dot => {
//     dot.userData.pulse += 0.05;
//     const scale = 1 + Math.sin(dot.userData.pulse) * 0.3;
//     dot.scale.set(scale, scale, scale);
//   });

//   // Subtle camera movement
//   camera.position.x += (mouseX * 8 - camera.position.x) * 0.05;
//   camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;

//   renderer.render(scene, camera);
// }

// animate();

// /* ================================
//    📱 Responsive
// ================================ */

// window.addEventListener("resize", () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050816, 0.015);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

/* ======================================
   ✨ PREMIUM STARTUP GRID
====================================== */

const gridSize = 100;
const gridDivisions = 40;

const grid = new THREE.GridHelper(
  gridSize,
  gridDivisions,
  0x00ff88,
  0x00ff88
);

grid.material.transparent = true;
grid.material.opacity = 0.05;
grid.rotation.x = Math.PI / 2;
grid.position.y = -10;

scene.add(grid);

/* ======================================
   💡 FLOATING LIGHT BLOBS
====================================== */

const blobs = [];
const blobCount = 6;

for (let i = 0; i < blobCount; i++) {

  const geometry = new THREE.SphereGeometry(6, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: i % 2 === 0 ? 0x00ff88 : 0x00ccff,
    transparent: true,
    opacity: 0.08
  });

  const blob = new THREE.Mesh(geometry, material);

  blob.position.x = (Math.random() - 0.5) * 50;
  blob.position.y = (Math.random() - 0.5) * 30;
  blob.position.z = -20;

  blob.userData = {
    speed: 0.001 + Math.random() * 0.002
  };

  scene.add(blob);
  blobs.push(blob);
}

/* ======================================
   📊 FLOATING DATA PARTICLES
====================================== */

const particleCount = 400;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {

  const i3 = i * 3;

  positions[i3] = (Math.random() - 0.5) * 80;
  positions[i3 + 1] = (Math.random() - 0.5) * 50;
  positions[i3 + 2] = (Math.random() - 0.5) * 20;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.05,
  color: 0x00ffcc,
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

/* ======================================
   🖱️ INTERACTIVE MOUSE EFFECT
====================================== */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", e => {
  mouseX = (e.clientX / window.innerWidth) - 0.5;
  mouseY = (e.clientY / window.innerHeight) - 0.5;
});

/* ======================================
   🎬 ANIMATION LOOP
====================================== */

function animate() {
  requestAnimationFrame(animate);

  // Subtle grid movement
  grid.position.z += 0.01;
  if (grid.position.z > 10) grid.position.z = -10;

  // Floating blobs movement
  blobs.forEach(blob => {
    blob.position.y += blob.userData.speed * 10;
    if (blob.position.y > 25) blob.position.y = -25;
  });

  // Particle drift
  const pos = particles.geometry.attributes.position.array;

  for (let i = 0; i < pos.length; i += 3) {
    pos[i + 1] += 0.02;
    if (pos[i + 1] > 30) {
      pos[i + 1] = -30;
    }
  }

  particles.geometry.attributes.position.needsUpdate = true;

  // Smooth camera follow
  camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
  camera.position.y += (-mouseY * 3 - camera.position.y) * 0.03;

  renderer.render(scene, camera);
}

animate();

/* ======================================
   📱 RESPONSIVE
====================================== */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});