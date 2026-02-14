import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Journey3DProps {
  activeSection: number;
}

const Journey3D: React.FC<Journey3DProps> = ({ activeSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    speed: 0.0005,
    targetSpeed: 0.0005,
    scale: 1,
    targetScale: 1,
    opacity: 1,
    targetOpacity: 1
  });

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particles - Reduced count for Apple-like minimalist aesthetic
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1200; 
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
      // Subtle mix of white and very light pink
      colors[i] = 0.9 + Math.random() * 0.1;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    sceneRef.current = { scene, camera, renderer, particles };

    const animate = () => {
      requestAnimationFrame(animate);
      if (!sceneRef.current) return;
      const { renderer, scene, camera, particles } = sceneRef.current;
      const state = stateRef.current;

      // Smooth interpolation of animation states
      state.speed = THREE.MathUtils.lerp(state.speed, state.targetSpeed, 0.05);
      state.scale = THREE.MathUtils.lerp(state.scale, state.targetScale, 0.03);
      state.opacity = THREE.MathUtils.lerp(state.opacity, state.targetOpacity, 0.05);

      particles.rotation.y += state.speed;
      particles.rotation.x += state.speed * 0.5;
      
      const s = state.scale;
      particles.scale.set(s, s, s);
      (particles.material as THREE.PointsMaterial).opacity = state.opacity;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Section-based animation logic
  useEffect(() => {
    const state = stateRef.current;
    
    if (activeSection === 0) {
      // Hero: Calm, centered nebula
      state.targetSpeed = 0.0005;
      state.targetScale = 1;
      state.targetOpacity = 0.6;
    } else if (activeSection === 1) {
      // Transition/Countdown: "Warp" effect - accelerate and expand
      state.targetSpeed = 0.004;
      state.targetScale = 1.8;
      state.targetOpacity = 0.4;
    } else {
      // Other sections: Fade out completely
      state.targetOpacity = 0;
      state.targetSpeed = 0.0002;
    }
  }, [activeSection]);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[5] overflow-hidden" />;
};

export default Journey3D;