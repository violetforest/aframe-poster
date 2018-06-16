AFRAME.registerShader('simple', {
  schema: {
    timeMsec: {type:'time', is:'uniform'},
    resolution: {type: 'vec2', is: 'uniform', default: {x:500, y:500}},
    displacement: {type: 'float', is: 'attribute'},
    amplitude: {type: 'float', default: 10}
  },
  vertexShader: `

    varying vec2 vUv;
    varying vec3 vNormal;
    attribute float displacement;
    uniform float amplitude;

    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 newPosition = position + normal * vec3(displacement * amplitude);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0 );
    }

`,
  fragmentShader: `

    varying vec2 vUv;
    varying vec3 vNormal;
    uniform float timeMsec;
    uniform vec2 resolution;

    void main() {
      vec3 light = vec3(0.5, -1.0, -1.0);
      light = normalize(light);
      float dot = dot(vNormal, light);
      float dotProduct = max(0.0, dot);
      float dotClamped = clamp(dotProduct, 0.0, dot);
      vec2 pos = gl_FragCoord.xy/resolution;
      float r = sin(pos.y * timeMsec);
      float g = 0.572 * cos(pos.x * timeMsec);
      float b = 0.164 + sin(pos.x * 3.252) + sin(pos.y + 5.348) * r;
      g = fract(500.0 - sin(b));
  	  gl_FragColor = vec4(r, dotClamped, b, 3.976);
    }

`
});
