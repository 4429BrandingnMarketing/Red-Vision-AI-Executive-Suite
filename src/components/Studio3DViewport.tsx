import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3D, Maximize2, Zap, Info, Sparkles, Layers, RefreshCw, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface Studio3DViewportProps {
  activeSuiteId: string;
  suiteTitle: string;
}

export function Studio3DViewport({ activeSuiteId, suiteTitle }: Studio3DViewportProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [cameraZoom, setCameraZoom] = useState<number>(1);

  useEffect(() => {
    const currentRef = mountRef.current;
    if (!currentRef) return;

    const width = currentRef.clientWidth || 600;
    const height = currentRef.clientHeight || 350;

    // 1. Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508);
    scene.fog = new THREE.FogExp2(0x050508, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    currentRef.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Red Neon Key Light
    const redLight = new THREE.PointLight(0xff0044, 4, 15);
    redLight.position.set(3, 4, 3);
    redLight.castShadow = true;
    scene.add(redLight);

    // Cyan / Rose Rim Light
    const rimLight = new THREE.PointLight(0xff4488, 2, 15);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // Studio Floor Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0xef4444, 0x333333);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 3. Build 3D Models based on activeSuiteId
    // Base Studio Platform
    const platformGeo = new THREE.CylinderGeometry(3, 3.2, 0.4, 32);
    const platformMat = new THREE.MeshStandardMaterial({ 
      color: 0x111115, 
      roughness: 0.3, 
      metalness: 0.8 
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.8;
    platform.receiveShadow = true;
    mainGroup.add(platform);

    // Glowing Neon Ring around platform
    const ringGeo = new THREE.TorusGeometry(3.1, 0.06, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff0033 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.6;
    mainGroup.add(ring);

    // Build specific 3D Clay Models according to Suite ID
    if (activeSuiteId === 'recording-studio') {
      // Mixing Console
      const deskGeo = new THREE.BoxGeometry(3.5, 0.3, 2);
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x1a1a20, roughness: 0.4 });
      const desk = new THREE.Mesh(deskGeo, deskMat);
      desk.position.set(0, -0.4, 0);
      mainGroup.add(desk);

      // Console Screen
      const screenGeo = new THREE.BoxGeometry(2.5, 1.2, 0.1);
      const screenMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x660011, roughness: 0.2 });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(0, 0.4, -0.6);
      screen.rotation.x = -0.2;
      mainGroup.add(screen);

      // Studio Monitor Speakers
      [-1.8, 1.8].forEach(x => {
        const spkGeo = new THREE.BoxGeometry(0.6, 1, 0.6);
        const spkMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.2 });
        const spk = new THREE.Mesh(spkGeo, spkMat);
        spk.position.set(x, 0.3, -0.5);
        mainGroup.add(spk);
      });

      // Vacuum Tube Mic
      const micGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 16);
      const micMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 });
      const mic = new THREE.Mesh(micGeo, micMat);
      mic.position.set(0, 0.2, 0.5);
      mainGroup.add(mic);

    } else if (activeSuiteId === 'film-editing-studio') {
      // 4K Cinema Camera Rig
      const camBodyGeo = new THREE.BoxGeometry(1.2, 0.8, 1.5);
      const camMat = new THREE.MeshStandardMaterial({ color: 0x222228, metalness: 0.7, roughness: 0.3 });
      const camBody = new THREE.Mesh(camBodyGeo, camMat);
      camBody.position.set(0, 0.2, 0);
      mainGroup.add(camBody);

      // Cinema Lens
      const lensGeo = new THREE.CylinderGeometry(0.4, 0.35, 1, 32);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.1 });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(0, 0.2, 1);
      mainGroup.add(lens);

      // Matte Box
      const boxGeo = new THREE.BoxGeometry(1.1, 1.1, 0.2);
      const boxMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 });
      const matteBox = new THREE.Mesh(boxGeo, boxMat);
      matteBox.position.set(0, 0.2, 1.5);
      mainGroup.add(matteBox);

    } else if (activeSuiteId === 'tour-manager-app') {
      // Interactive Travel Globe
      const globeGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const globeMat = new THREE.MeshStandardMaterial({ 
        color: 0x0f172a, 
        roughness: 0.4,
        emissive: 0x991122,
        emissiveIntensity: 0.2
      });
      const globe = new THREE.Mesh(globeGeo, globeMat);
      globe.position.set(0, 0.4, 0);
      mainGroup.add(globe);

      // Orbiting Flight Ring
      const flightRingGeo = new THREE.TorusGeometry(1.8, 0.04, 16, 100);
      const flightRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const flightRing = new THREE.Mesh(flightRingGeo, flightRingMat);
      flightRing.rotation.x = Math.PI / 3;
      mainGroup.add(flightRing);

    } else if (activeSuiteId === 'book-publishing-app') {
      // 3D Hardcover Book
      const bookGeo = new THREE.BoxGeometry(1.6, 2.2, 0.4);
      const bookMat = new THREE.MeshStandardMaterial({ color: 0x990022, roughness: 0.3 });
      const book = new THREE.Mesh(bookGeo, bookMat);
      book.rotation.y = 0.3;
      book.position.set(0, 0.3, 0);
      mainGroup.add(book);

      // Gold Embossed Spine & Audio Wave
      const waveGeo = new THREE.TorusGeometry(0.5, 0.05, 12, 32);
      const waveMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
      const wave = new THREE.Mesh(waveGeo, waveMat);
      wave.position.set(0, 0.3, 0.25);
      mainGroup.add(wave);

    } else {
      // Virtual 3D Office - Multi-Tier Pods
      const podCenterGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.2, 16);
      const podMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.8 });
      const podCenter = new THREE.Mesh(podCenterGeo, podMat);
      podCenter.position.set(0, 0, 0);
      mainGroup.add(podCenter);

      // Satellite Executive Nodes
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const nodeGeo = new THREE.SphereGeometry(0.35, 16, 16);
        const nodeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x440011 });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(Math.cos(angle) * 1.8, 0.2, Math.sin(angle) * 1.8);
        mainGroup.add(node);
      }
    }

    // Mouse Drag Rotation Logic
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      mainGroup.rotation.y += deltaX * 0.01;
      mainGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating && !isDragging) {
        mainGroup.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (currentRef.contains(renderer.domElement)) {
        currentRef.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeSuiteId, isRotating]);

  return (
    <div className="relative w-full aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden border-2 border-red-500/50 bg-black shadow-2xl shadow-red-950/80 group">
      
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Header Overlay */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 border border-white/10 backdrop-blur-md shadow-lg z-10">
        <Rotate3D className="w-4 h-4 text-red-500 animate-spin-slow" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
          3D INTERACTIVE VIEWPORT
        </span>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`px-3 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-all border ${
            isRotating
              ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
              : 'bg-black/80 text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          {isRotating ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}
        </button>
      </div>

      {/* Hotspot Specification Bar */}
      <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/90 border border-white/10 backdrop-blur-md z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="font-mono text-xs font-bold text-white">
            {suiteTitle}
          </span>
        </div>

        <div className="text-[10px] font-mono text-zinc-400 hidden sm:block">
          Click & Drag to Rotate 360° | 3D Ray-Traced Geometry
        </div>
      </div>

    </div>
  );
}
