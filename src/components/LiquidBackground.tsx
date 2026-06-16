import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const frag = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

// hash + simplex-ish noise
vec3 hash3(vec2 p){
  vec3 q = vec3(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3)), dot(p, vec2(419.2,371.9)));
  return fract(sin(q)*43758.5453);
}
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float a = hash3(i).x;
  float b = hash3(i+vec2(1.0,0.0)).x;
  float c = hash3(i+vec2(0.0,1.0)).x;
  float d = hash3(i+vec2(1.0,1.0)).x;
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v=0.0; float a=0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p*=2.02; a*=0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.06;
  vec2 m = (uMouse - 0.5) * 0.6;

  // domain-warp
  vec2 q = vec2(fbm(p + t + m), fbm(p - t*0.7 + 3.1));
  vec2 r = vec2(fbm(p + q*1.6 + vec2(1.7, 9.2) + t*0.8),
                fbm(p + q*1.6 + vec2(8.3, 2.8) - t*0.6));
  float f = fbm(p + r*1.8);

  vec3 cIndigo  = vec3(0.10, 0.04, 0.32);
  vec3 cMagenta = vec3(0.92, 0.18, 0.62);
  vec3 cCyan    = vec3(0.20, 0.78, 0.95);
  vec3 cAmber   = vec3(0.98, 0.62, 0.18);
  vec3 cPink    = vec3(0.98, 0.42, 0.72);
  vec3 cBlack   = vec3(0.03, 0.02, 0.07);

  vec3 col = mix(cBlack, cIndigo, smoothstep(0.0, 0.35, f));
  col = mix(col, cMagenta, smoothstep(0.35, 0.55, f) * (0.6 + 0.4*r.x));
  col = mix(col, cCyan,    smoothstep(0.5, 0.7, length(r)) * 0.7);
  col = mix(col, cAmber,   smoothstep(0.65, 0.85, q.y) * 0.45);
  col = mix(col, cPink,    smoothstep(0.7, 0.95, f) * 0.55);

  // bokeh-like highlights
  float bok = 0.0;
  for(int i=0;i<5;i++){
    float fi = float(i);
    vec2 c = vec2(sin(t*1.3 + fi*1.7), cos(t*1.1 + fi*2.3)) * 0.9;
    bok += 0.04 / (0.01 + length(p - c));
  }
  col += bok * vec3(0.3, 0.2, 0.45) * 0.08;

  // vignette
  float v = smoothstep(1.6, 0.4, length(p));
  col *= mix(0.55, 1.15, v);

  // gentle grain
  col += (hash3(gl_FragCoord.xy + t).x - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

const vert = /* glsl */ `
void main(){ gl_Position = vec4(position, 1.0); }
`;

function Shader() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  );

  useFrame(({ clock, size, pointer }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uResolution.value.set(size.width * size.dpr || size.width, size.height * size.dpr || size.height);
    mouse.current.lerp(new THREE.Vector2(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5), 0.04);
    uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={ref} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
    </mesh>
  );
}

export function LiquidBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(80% 60% at 30% 30%, oklch(0.2 0.15 295) 0%, transparent 60%), radial-gradient(60% 50% at 70% 70%, oklch(0.25 0.18 200) 0%, transparent 55%), oklch(0.06 0.02 280)",
      }}
    >
      <Canvas
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1] }}
      >
        <Shader />
      </Canvas>
    </div>
  );
}
