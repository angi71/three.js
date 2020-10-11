let container;
let camera;
let renderer;
let scene;

function init() {

    //Næ í
    container = document.querySelector('#scene');

    //Bý til scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0E2752);
        
    //Bú til myndavél og læt hana fylla vefsíðuna
    camera = new THREE.PerspectiveCamera(90, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 15);

    //Bý til myndavéla stýringu
    const controls = new THREE.OrbitControls(camera, container);

    //Bý til renderer og læ hann fylla vefsíðuna 
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    //Function fyrir ljós
    lights();
    //Function fyrir hluti
    objects();
    
      
    //Bý til hlustara sem hlustar eftir því hvort að stærð vefsíðunar hefur verið breyt
    window.addEventListener("resize", resize);

}

function objects(){

    //Bý til hóp fyrir hlutina
    const snowman = new THREE.Group();
    scene.add(snowman);

    //Bý til kúlu
    const ballA = new THREE.SphereBufferGeometry(5, 32, 5);
    const snow = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
    const bigB = new THREE.Mesh(ballA, snow);
    snowman.add(bigB);

    //Bý til minni kúlu
    const ballB = new THREE.SphereBufferGeometry(3, 15, 5);
    const smalB = new THREE.Mesh(ballB, snow);
    smalB.position.set(0,6,1);
    snowman.add(smalB);

    //Bú til keilu
    const cone = new THREE.ConeBufferGeometry(0.5, 3, 5);
    cone.rotateX(90);
    const orange = new THREE.MeshStandardMaterial({color:0xff6500})
    const carrots = new THREE.Mesh(cone, orange);
    carrots.position.set(0,5,5);
    snowman.add(carrots);

}

function lights(){

    //Bý til hemisphere ljós
    const hemiLight = new THREE.HemisphereLight(0x91c8ff, 0x073F9E, 4);
    
    //Bý til átarljós
    const dirLight = new THREE.DirectionalLight(0x0E2752, 1);
    dirLight.position.set(5, -5, 1);
    
    scene.add(hemiLight, dirLight);   

}

function render() {

    //Endurkallar Functionið
    requestAnimationFrame(render);

    renderer.render(scene, camera);

}

function resize() {

    //Næ í nýju stærð vefsíðuna
    camera.aspect = container.clientWidth / container.clientHeight;
    //Uppfæri myndavélina
    camera.updateProjectionMatrix();
    //Uppfæri renderer
    renderer.setSize(container.clientWidth, container.clientHeight);
  
}

init();

//Function fyrir skjáuppfæringu
render();