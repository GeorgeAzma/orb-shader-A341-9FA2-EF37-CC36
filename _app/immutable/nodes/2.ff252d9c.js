import{s as A,n as v,o as F,b as D}from"../chunks/scheduler.e108d1fd.js";import{S,i as k,g as E,h as z,j as T,f as x,k as y,a as C,r as L,u as P,v as N,d as I,t as O,w as U}from"../chunks/index.7cf2deec.js";function B(c){let n;return{c(){n=E("canvas"),this.h()},l(e){n=z(e,"CANVAS",{id:!0,class:!0}),T(n).forEach(x),this.h()},h(){y(n,"id","background-shader"),y(n,"class","svelte-1yt0mdc")},m(e,t){C(e,n,t),c[3](n)},p:v,i:v,o:v,d(e){e&&x(n),c[3](null)}}}function M(c,n,e){let{frag:t=""}=n,{vert:f=""}=n,s,a,r,h=performance.now();const w=[-1,-1,1,-1,-1,1,1,1];let m;function u(){if(s&&(e(0,s.width=window.innerWidth,s),e(0,s.height=window.innerHeight,s),r&&a)){const o=r.getUniformLocation(a,"resolution");r.uniform2f(o,s.width,s.height),r.viewport(0,0,s.width,s.height)}}F(()=>{if(r=s.getContext("webgl"),!r){console.error("WebGL is not supported in this browser.");return}return m=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,m),r.bufferData(r.ARRAY_BUFFER,new Float32Array(w),r.STATIC_DRAW),r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),h=performance.now(),window.addEventListener("resize",u),p(f,t),()=>{window.removeEventListener("resize",u)}});function p(o,d){if(d||(d="precision mediump float;void main() {gl_FragColor=vec4(1);}"),o||(o="attribute vec4 a_position;void main() {gl_Position = a_position;}"),!r)return;const l=r.createShader(r.FRAGMENT_SHADER);if(!l){console.error("Could not create fragment shader"),r.deleteShader(l);return}if(r.shaderSource(l,d),r.compileShader(l),!r.getShaderParameter(l,r.COMPILE_STATUS)){const g=r.getShaderInfoLog(l);console.error("Fragment shader compilation error:",g)}const i=r.createShader(r.VERTEX_SHADER);if(!i){console.error("Could not create vertex shader"),r.deleteShader(i);return}if(r.shaderSource(i,o),r.compileShader(i),!r.getShaderParameter(i,r.COMPILE_STATUS)){const g=r.getShaderInfoLog(i);console.error("Vertex shader compilation error:",g)}if(a&&(r.deleteProgram(a),a=null),a=r.createProgram(),!a){console.error("Could not create shader program");return}r.attachShader(a,l),r.attachShader(a,i),r.linkProgram(a),r.deleteShader(l),r.deleteShader(i),r.useProgram(a);const b=r.getAttribLocation(a,"a_position");r.enableVertexAttribArray(b),r.vertexAttribPointer(b,2,r.FLOAT,!1,0,0),u(),_()}function _(){if(!(s&&r&&a))return;r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.useProgram(a),r.bindBuffer(r.ARRAY_BUFFER,m),r.drawArrays(r.TRIANGLE_STRIP,0,4);const o=r.getUniformLocation(a,"time");o&&r.uniform1f(o,(performance.now()-h)/1e3),requestAnimationFrame(_)}function R(o){D[o?"unshift":"push"](()=>{s=o,e(0,s)})}return c.$$set=o=>{"frag"in o&&e(1,t=o.frag),"vert"in o&&e(2,f=o.vert)},c.$$.update=()=>{c.$$.dirty&6&&p(f,t)},[s,t,f,R]}class q extends S{constructor(n){super(),k(this,n,M,B,A,{frag:1,vert:2})}}const G=`attribute vec4 a_position;\r
\r
void main() {\r
    gl_Position = a_position;\r
}`,H=`// Copyright (c) 2024 George Azmaipharashvili. All rights reserved.\r
// Permission is granted to HelloNova to use, modify and distribute this code.\r
// All other entities are prohibited from using, modifying or distributing this code without explicit permission.\r
\r
precision mediump float;\r
\r
uniform float time;\r
uniform vec2 resolution;\r
\r
const float BLOOM = 1.;\r
const float STAR_ANIMATION_SPEED = .25;\r
\r
const float TAU = 6.283185307;\r
\r
float hash21(vec2 p)\r
{\r
	vec3 p3  = fract(vec3(p.xyx) * .1031);\r
    p3 += dot(p3, p3.yzx + 33.33);\r
    return fract((p3.x + p3.y) * p3.z);\r
}\r
\r
vec2 rand(vec2 p)\r
{\r
    p -= 0.9;\r
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));\r
    p3 += dot(p3, p3.yzx+33.33);\r
    return fract((p3.xx+p3.yz)*p3.zy) * 2.0 - 1.0;\r
}\r
\r
float noise(vec2 p)\r
{\r
    const float kF = 3.0;\r
    vec2 i = floor(p);\r
	vec2 f = fract(p);\r
    f = f*f*(3.0-2.0*f);\r
    return mix(mix(sin(kF*dot(p, rand(i+vec2(0,0)))),\r
               	   sin(kF*dot(p, rand(i+vec2(1,0)))),f.x),\r
               mix(sin(kF*dot(p, rand(i+vec2(0,1)))),\r
               	   sin(kF*dot(p, rand(i+vec2(1,1)))),f.x),f.y) * 0.5 + 0.5;\r
}\r
\r
vec2 rot2D(vec2 v, float a) {\r
	float s = sin(a);\r
	float c = cos(a);\r
	mat2 m = mat2(c, s, -s, c);\r
	return m * v;\r
}\r
\r
float luma(vec3 color) {\r
  return dot(color, vec3(0.299, 0.587, 0.114));\r
}\r
\r
vec3 hue_shift(vec3 col, float hue) {\r
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);\r
    float cosa = cos(hue);\r
    return vec3(col * cosa + cross(k, col) * sin(hue) + k * dot(k, col) * (1.0 - cosa));\r
}\r
\r
vec3 aces(vec3 x) {\r
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);\r
}\r
\r
float star(vec2 uv, float s) {\r
    uv *= 2.5;\r
    float a = atan(uv.x, uv.y);\r
    vec2 v = vec2(cos(a), sin(a));\r
    float s1 = smoothstep(1., 0.3, abs(dot(v, uv)) * 2. * sqrt(s) + smoothstep(-0.1, 1.2, 0.8 * length(uv)));\r
    v = vec2(cos(a + TAU * 0.25), sin(a + TAU * 0.25));\r
    float s2 = smoothstep(1., 0.5, abs(dot(v, uv)) * 2.5 * sqrt(s) + length(uv) * 1.5);\r
    float sm = mix(s1, 1., s2);\r
    return sm + max(0.0, 1. - sm - sqrt(length(uv * .5)) * 1.2);\r
}\r
\r
vec3 scol(float n) {\r
    const float D = 1.0 / 6.0;\r
    if (n <= D) {\r
        return vec3(.917, .153, .760);\r
    } else if (n <= D * 2.0) {\r
        return vec3(.733, .160, .733);\r
    } else if (n <= D * 3.0) {\r
        return vec3(.607, .149, .714);\r
    } else if (n <= D * 4.0) {\r
        return vec3(.255, .560, .870);\r
    } else if (n <= D * 5.0) {\r
        return vec3(.172, .835, .769);\r
    } else {\r
        return vec3(.278, .843, .674);\r
    }\r
}\r
\r
vec3 lcol(float n) {\r
    const float D = 1.0 / 4.0;\r
    if (n <= D) {\r
        return vec3(.172, .122, .999);\r
    } else if (n <= D * 2.0) {\r
        return vec3(.255, .560, .870);\r
    } else if (n <= D * 3.0) {\r
        return vec3(.278, .843, .674);\r
    } else {\r
        return vec3(.917, .153, .760);\r
    }\r
}\r
\r
vec3 star_layer(vec2 uv, float t) {\r
    vec3 col = vec3(0);\r
    vec2 gv = fract(uv);\r
    vec2 id = floor(uv);\r
\r
    for(int y = -1; y <= 1; y++) {\r
        for(int x = -1; x <= 1; x++) {\r
            vec2 offs = vec2(x, y);\r
            float n = hash21(id + offs);\r
            n *= n;\r
            vec2 p = gv - offs - vec2(n, fract(n * 34.)) + .5;\r
            float m = .75 + 0.03 * sin(t * 6. + n) + length(uv) * 0.1;\r
            m /= n + 0.3;\r
            p *= m;\r
            float s = star(p, 1. / m);\r
            vec3 color = scol(hash21(id + offs - 65.31));\r
            color += max(0.0, 1. - 10. * pow(length(p), 1.3)) * .6;\r
            s *= 0.5 + 0.5 * sin(n * TAU + t);\r
            col += s * color;\r
        }\r
    }\r
    return col;\r
}\r
\r
vec4 orb(vec2 uv, float t, float min_res) {\r
    /// Initial  Orb\r
    float l = dot(uv, uv);\r
    float f = 24.0 / min_res;\r
    float mask = smoothstep(1.0 + f, 1.0 - f, l);\r
    float alpha = sqrt(l) * mask;\r
    vec4 col = vec4(vec3(0.05, 0.05, .5), alpha);\r
    if (alpha > 0.0) {\r
        vec3 n = normalize(vec3(uv, sqrt(abs(1.0 - l))));\r
        col.rgb -= mask * n * 0.2;\r
\r
        /// Reflections\r
        float ls = sqrt(l);\r
        vec3 nr = vec3(normalize(uv), n.z);\r
        nr.xy = rot2D(nr.xy, -t);\r
        float r = mask * noise(nr.xy * l * ls * 2.) * .5;\r
        r *= smoothstep(0.9, 0.8, ls);\r
        col.a += r;\r
        col.rgb += r * r;\r
\r
        nr.xy = rot2D(nr.xy, t * 1.2);\r
        r = noise(nr.xy * l) * 0.5 + noise(nr.xy * l * l + 31.61) * 0.5;\r
        col.rgb += 0.5 * mask * r * r * r * vec3(0.6, 1, 0.6) * smoothstep(0.6, 0.4, l);\r
        col.a += mask * smoothstep(0.5, 1., r);\r
\r
        nr.xy = rot2D(nr.xy, -t * 1.8);\r
        r = noise(nr.xy * l - 1361.26);\r
        col.rgb += mask * r * r * r * r * vec3(0.6, 0.5, 1) * smoothstep(0.4, 0.2, l);\r
        col.rgb = hue_shift(col.rgb, mask * -0.3 * r * r * r);\r
\r
        nr.xy = rot2D(nr.xy, t * 1.45);\r
        r = noise(nr.xy * l - 513.26);\r
        col.rgb += mask * pow(r, 8.);\r
        col.rgb = hue_shift(col.rgb, mask * -r * r);\r
        col.a += mask * smoothstep(0.5, 1., r);\r
\r
        nr.xy = rot2D(nr.xy, -t);\r
        r = smoothstep(0.4, 1.5, noise(nr.xy * (0.5 + l) - 33.));\r
        float a = mask * 16. * r * smoothstep(0.2, 0.1, l) * l;\r
        col.a += a;\r
        col.rgb += a * .25;\r
\r
        nr.xy = rot2D(nr.xy, -t * 2.4);\r
        r = noise(nr.xy * l + 221.126) * 0.35;\r
        col.rgb = hue_shift(col.rgb, mask * r);\r
        col.rgb += r * r * r * r * 0.25;\r
        col.a += mask * r / (1. + l);\r
        col.a = aces(col.aaa).x;\r
        col.rgb *= abs(col.rgb);\r
        col.rgb = aces(col.rgb * 0.8) * 1.1;\r
        col.a *= smoothstep(-0.3, 0.2, l);\r
\r
        /// Stars\r
        const float STAR_FREQ = 12.;\r
        float ts = t * STAR_ANIMATION_SPEED;\r
        float ani = fract(ts);\r
        \r
        vec2 sn = vec2(cos(ts), sin(ts)) * noise(vec2(ts) * 0.3) * 0.1;\r
        vec2 sv = n.xy / (ani + 2.) + sn;\r
        vec3 stars1 = star_layer(sv * STAR_FREQ, t);\r
\r
        sv = n.xy / (ani + 1.) + sn;\r
        vec3 stars2 = star_layer(sv * STAR_FREQ, t);\r
        vec3 stars = mix(stars1, stars2, ani);\r
\r
        col.rgb = mix(col.rgb, stars, min(1.0, length(stars) * n.z * n.z * n.z * n.z * n.z * n.z * 2.));\r
        col.a += mask * length(stars) * n.z * n.z * n.z * n.z;\r
\r
        col.rgb += mask * 0.25 * pow(l + 0.05, 4.);\r
        col.a += mask * pow(l + 0.1, 8.);\r
        \r
        r = noise(uv * l * 1.5 - 513.26) - 0.5;\r
        col.rgb = hue_shift(col.rgb, mask * r * 1.5);\r
\r
        float df = mask * smoothstep(0.9 - f, 0.9 + f, l);\r
        col.rgb = hue_shift(col.rgb, df * (2.5 * smoothstep(-f, f, uv.x * cos(t * 0.4) - uv.y * sin(t * 0.4)) - 1. + col.g * 2. - col.r));\r
    } \r
    \r
    if (alpha < 1.) {\r
        float glow = (1.0 - mask) * (2. - l);\r
        col.a += glow * .8;\r
        col.rgb += glow * glow * glow * 0.4;\r
    }\r
\r
    return col;\r
}\r
\r
vec4 lines(vec2 uv, float t) {\r
    if (dot(uv, uv) < 1.) \r
        return vec4(0);\r
    const float N = 24.0;\r
    const float G = N / 4.;\r
    t *= 0.3;\r
    vec4 col = vec4(0);\r
    vec2 nv = normalize(uv);\r
    for (float i = 0.; i < N; ++i) {\r
        float j = mod(i, G);\r
        float k = floor(i / G);\r
        float d = max(0., pow(noise(nv * .4 + t - j * 0.02 - k * 32.), 1.25) * 2. - 1.) * 0.3 * (j / G + 0.5);\r
        float m = 1. + d * d * 30.;\r
        float mask = smoothstep(0.01 * m, 0.0, distance(nv * (1.0 + d), uv));\r
        col.rgb += lcol(i / N) * mask / m;\r
    }\r
    return col;\r
}\r
\r
void main()\r
{\r
    float min_res = min(resolution.x, resolution.y);\r
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min_res * 1.25;\r
    if (dot(uv, uv) > 2.) discard;\r
    float t = time * 0.5;\r
\r
    vec3 col = vec3(0);\r
    vec4 orb = orb(uv, t, min_res);    \r
    col.rgb += orb.rgb * orb.a;\r
    gl_FragColor.a += orb.a;\r
\r
    vec4 li = lines(uv, t);   \r
\r
    float f = 48.0 / min_res;\r
    float mask = smoothstep(1.0 + f, 1.0, dot(uv, uv));\r
\r
    col.rgb = mix(li.rgb, col.rgb, clamp(mask * orb.a, 0.0, 1.0));\r
    col.rgb += orb.rgb * (1.0 - mask) * orb.a * BLOOM;\r
    \r
    gl_FragColor.a = max(gl_FragColor.a, li.a);\r
\r
    gl_FragColor.rgb = col;\r
}`;function j(c){let n,e;return n=new q({props:{frag:H,vert:G}}),{c(){L(n.$$.fragment)},l(t){P(n.$$.fragment,t)},m(t,f){N(n,t,f),e=!0},p:v,i(t){e||(I(n.$$.fragment,t),e=!0)},o(t){O(n.$$.fragment,t),e=!1},d(t){U(n,t)}}}class W extends S{constructor(n){super(),k(this,n,null,j,A,{})}}export{W as component};