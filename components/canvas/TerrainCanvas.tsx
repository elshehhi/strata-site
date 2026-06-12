"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The living ground of the whole site: a single displaced plane whose
 * fragment shader draws elevation contours — geological strata — colored
 * along the reserved depth axis (near dawn #E8A25C → far #8FA6B8), sunk
 * into warm-obsidian fog. The camera walks forward through the landscape
 * as the visitor scrolls; idle, the land itself drifts slowly.
 *
 * One draw call for the terrain, one for the atmosphere particles.
 * DPR capped at 1.75, paused when hidden, static under reduced motion.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  varying float vHeight;

  // value-noise fbm — cheap, deterministic, no texture fetch
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.04 + vec2(11.3, 7.9);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 p = position;
    vec2 q = p.xz * 0.085 + vec2(uTime * 0.012, uTime * 0.004);
    float h = fbm(q);
    // long dune ridges riding under the detail
    h += 0.35 * sin(p.x * 0.16 + fbm(p.xz * 0.03) * 4.0);
    h *= 2.6;
    p.y += h;
    vHeight = h;
    vec4 w = modelMatrix * vec4(p, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uInk;
  uniform vec3 uNear;
  uniform vec3 uFar;
  uniform vec3 uCam;
  uniform float uDim;   // custody chapter: the world holds its breath
  uniform float uDawn;  // the close: the walk crests into full dawn
  varying vec3 vWorld;
  varying float vHeight;

  void main() {
    // strata: contour lines of constant elevation
    float bands = vHeight * 4.0;
    float d = abs(fract(bands) - 0.5) / fwidth(bands);
    float line = 1.0 - smoothstep(0.0, 1.4, d);

    // every 4th contour is an index line — slightly brighter
    float major = step(0.75, fract(bands * 0.25));
    line *= mix(0.55, 1.0, major);

    float dist = distance(vWorld, uCam);
    // depth axis: warm near the walker, cool toward the horizon
    vec3 axis = mix(uNear, uFar, smoothstep(4.0, 30.0, dist));

    // faint surface fill so the land reads as ground, not a grid
    vec3 fill = mix(uInk * 1.6, uInk, smoothstep(0.0, 26.0, dist));
    vec3 col = fill + axis * line * 0.85;

    // obsidian fog swallows the horizon
    float fog = smoothstep(14.0, 38.0, dist);
    col = mix(col, uInk, fog);

    // edge fade so the plane never shows a silhouette
    float edge = smoothstep(30.0, 22.0, abs(vWorld.x));
    col = mix(uInk, col, edge);

    // chapter weather (P3 — the world reacts to the story):
    // custody dims the land to a held breath…
    col = mix(col, col * 0.45, uDim);
    // …and the close floods the contours with dawn
    col += uDawn * (uNear * (0.05 + 0.22 * line) + vec3(0.030, 0.016, 0.006));

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function TerrainCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0B0A08");

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );

    const uniforms = {
      uTime: { value: 0 },
      uInk: { value: new THREE.Color("#0B0A08") },
      uNear: { value: new THREE.Color("#E8A25C") },
      uFar: { value: new THREE.Color("#8FA6B8") },
      uCam: { value: new THREE.Vector3() },
      uDim: { value: 0 },
      uDawn: { value: 0 },
    };

    const geo = new THREE.PlaneGeometry(64, 90, 240, 300);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    const terrain = new THREE.Mesh(geo, mat);
    scene.add(terrain);

    // atmosphere — slow dust rising in the dawn light
    const COUNT = 360;
    const pos = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 9 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 70;
      seed[i] = Math.random() * Math.PI * 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      color: new THREE.Color("#E8A25C"),
      size: 0.06,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── travel ──────────────────────────────────────────────────────────
    // camera walks from z=26 to z=-26 across the document scroll
    let scrollT = 0; // eased
    let scrollTarget = 0;
    let mouseX = 0;
    let mouseY = 0;
    let mx = 0;
    let my = 0;

    const onScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollTarget = window.scrollY / max;
    };
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const frame = () => {
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;

      // ease toward targets — light moves, objects don't
      scrollT += (scrollTarget - scrollT) * 0.045;
      mx += (mouseX - mx) * 0.03;
      my += (mouseY - my) * 0.03;

      const z = 26 - scrollT * 52;
      camera.position.set(mx * 1.4, 4.6 + my * -0.5, z);
      camera.lookAt(mx * 2.2, 2.1, z - 12);
      uniforms.uCam.value.copy(camera.position);

      // chapter weather, mapped to walk progress (approximate chapter
      // bands; eased so the change reads as light, not a switch):
      const ss = (a: number, b: number, x: number) => {
        const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
        return k * k * (3 - 2 * k);
      };
      const dimT = ss(0.5, 0.58, scrollT) * (1 - ss(0.66, 0.74, scrollT)); // custody
      const dawnT = ss(0.84, 0.97, scrollT); // the close crests into dawn
      uniforms.uDim.value += (dimT - uniforms.uDim.value) * 0.05;
      uniforms.uDawn.value += (dawnT - uniforms.uDawn.value) * 0.05;

      // particles breathe upward, wrap around the walker
      const arr = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] += 0.0035 + Math.sin(t * 0.4 + seed[i]) * 0.0012;
        if (arr[i * 3 + 1] > 10) arr[i * 3 + 1] = 0.4;
      }
      pGeo.attributes.position.needsUpdate = true;
      particles.position.z = camera.position.z - 18;

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      frame();
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      // a still landscape: render once, re-render only on scroll/resize
      frame();
      const still = () => {
        scrollT = scrollTarget; // no easing when motion is reduced
        frame();
      };
      window.addEventListener("scroll", still, { passive: true });
      window.addEventListener("resize", still);
    } else {
      loop();
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced && !running) {
        running = true;
        clock.getDelta();
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
