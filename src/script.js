import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

//mouse coordinates

let mouse = {
  x: undefined,
  y: undefined,
};
window.addEventListener("mousemove", (e) => {
  // 1st way (My Recommendation coordinates value is 1 in all direction)
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
  // 2nd way (coordinates value is 0.5 in all direction )
  //   mouse.x = e.clientX / innerWidth - 0.5;
  //   mouse.y = -(e.clientY / innerHeight - 0.5);
  console.log(mouse.x, mouse.y);
});

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Cameras
 * https://threejs.org/docs/#api/en/cameras/Camera
 * Abstract base class for cameras. This class should always be inherited when you build a new camera.
 * Others are -
 * ArrayCamera(make multiplayer games)
 * CubeCamera (renders all 6 sides)- three js uses this to make ..enviroment maps will be discussed later...
 * StereoCamera(mimic the eyes VR , red and blue glasses)
 * OrthographicCamera (without perspective size of characters will be same if they are far away from)
 * PerspectiveCamera
 */

// We are going to use OrthographicCamera & PerspectiveCamera

// x - >Perspective
// https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
// const camera = new THREE.PerspectiveCamera(
//   100,
//   sizes.width / sizes.height,
//   0.00000001, //how near
//   999999999999 //how far
// );
// camera.position.z = 3;
// scene.add(camera);

// x - > OrthographicCamera
//https://threejs.org/docs/#api/en/cameras/OrthographicCamera
//Perspective less camera
//Instead of providing perspect we provide how far can the camera can see
//in each direction (left, right, top, bottom)

// const aspectRatio = sizes.width / sizes.height;
// console.log(aspectRatio);
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.z = 2;
// camera.position.x = 2;
// camera.position.y = 2;
// camera.lookAt(mesh.position);
// scene.add(camera);

// x - > Custom Controls - Orbit Controls
const camera = new THREE.PerspectiveCamera(
  100,
  sizes.width / sizes.height,
  0.00000001, //how near
  999999999999 //how far
);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
const clock = new THREE.Clock();
//Animate
function animate() {
  const elapsedTime = clock.getElapsedTime();
  //   mesh.rotation.y = elapsedTime;

  camera.position.x = mouse.x * 2;
  camera.position.y = mouse.y * 2;
  camera.lookAt(mesh.position);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
