AFRAME.registerShader('simple', {
  schema: {
    timeMsec: {type:'time', is:'uniform'},
    resolution: {type: 'vec2', is: 'uniform', default: {x:500, y:500}}
  },
  vertexShader: `

    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vNormal = normal;

      vec3 light = vec3(0.5, 0.2, 1.0);
      light = normalize(light);

      float dProd = max(0.0, dot(vNormal, light));
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }

`,
  fragmentShader: `

    varying vec2 vUv;
    uniform float timeMsec;
    uniform vec2 resolution;

    void main() {
        vec2 pos = gl_FragCoord.xy/resolution;
        float r = sin(pos.y * timeMsec);
        float g = 0.572 * cos(pos.x * timeMsec);
        float b = 0.164 + sin(pos.x * 3.252) + sin(pos.y + 5.348) * r;
        g = fract(500.0 - sin(b));
    	gl_FragColor = vec4(r, g, b, 3.976);
    }

`
});
