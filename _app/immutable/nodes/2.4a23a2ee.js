import{s as A,n as v,o as D,b as E}from"../chunks/scheduler.e108d1fd.js";import{S,i as w,g as F,h as T,j as C,f as x,k as y,a as z,r as L,u as P,v as N,d as I,t as O,w as U}from"../chunks/index.7cf2deec.js";function B(c){let n;return{c(){n=F("canvas"),this.h()},l(e){n=T(e,"CANVAS",{id:!0,class:!0}),C(n).forEach(x),this.h()},h(){y(n,"id","background-shader"),y(n,"class","svelte-1yt0mdc")},m(e,o){z(e,n,o),c[3](n)},p:v,i:v,o:v,d(e){e&&x(n),c[3](null)}}}function q(c,n,e){let{frag:o=""}=n,{vert:f=""}=n,s,a,r,g=performance.now();const k=[-1,-1,1,-1,-1,1,1,1];let m;function u(){if(s&&(e(0,s.width=window.innerWidth,s),e(0,s.height=window.innerHeight,s),r&&a)){const t=r.getUniformLocation(a,"resolution");r.uniform2f(t,s.width,s.height),r.viewport(0,0,s.width,s.height)}}D(()=>{if(r=s.getContext("webgl"),!r){console.error("WebGL is not supported in this browser.");return}return m=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,m),r.bufferData(r.ARRAY_BUFFER,new Float32Array(k),r.STATIC_DRAW),r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),g=performance.now(),window.addEventListener("resize",u),p(f,o),()=>{window.removeEventListener("resize",u)}});function p(t,d){if(d||(d="precision mediump float;void main() {gl_FragColor=vec4(1);}"),t||(t="attribute vec4 a_position;void main() {gl_Position = a_position;}"),!r)return;const l=r.createShader(r.FRAGMENT_SHADER);if(!l){console.error("Could not create fragment shader"),r.deleteShader(l);return}if(r.shaderSource(l,d),r.compileShader(l),!r.getShaderParameter(l,r.COMPILE_STATUS)){const h=r.getShaderInfoLog(l);console.error("Fragment shader compilation error:",h)}const i=r.createShader(r.VERTEX_SHADER);if(!i){console.error("Could not create vertex shader"),r.deleteShader(i);return}if(r.shaderSource(i,t),r.compileShader(i),!r.getShaderParameter(i,r.COMPILE_STATUS)){const h=r.getShaderInfoLog(i);console.error("Vertex shader compilation error:",h)}if(a&&(r.deleteProgram(a),a=null),a=r.createProgram(),!a){console.error("Could not create shader program");return}r.attachShader(a,l),r.attachShader(a,i),r.linkProgram(a),r.deleteShader(l),r.deleteShader(i),r.useProgram(a);const _=r.getAttribLocation(a,"a_position");r.enableVertexAttribArray(_),r.vertexAttribPointer(_,2,r.FLOAT,!1,0,0),u(),b()}function b(){if(!(s&&r&&a))return;r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.useProgram(a),r.bindBuffer(r.ARRAY_BUFFER,m),r.drawArrays(r.TRIANGLE_STRIP,0,4);const t=r.getUniformLocation(a,"time");t&&r.uniform1f(t,(performance.now()-g)/1e3),requestAnimationFrame(b)}function R(t){E[t?"unshift":"push"](()=>{s=t,e(0,s)})}return c.$$set=t=>{"frag"in t&&e(1,o=t.frag),"vert"in t&&e(2,f=t.vert)},c.$$.update=()=>{c.$$.dirty&6&&p(f,o)},[s,o,f,R]}class M extends S{constructor(n){super(),w(this,n,q,B,A,{frag:1,vert:2})}}const G=`attribute vec4 a_position;\r
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
float hash21(vec2 p) {\r
    p = fract(p * vec2(123.34, 456.21));\r
    p += dot(p, p + 45.32);\r
    return fract(p.x * p.y);\r
}\r
\r
float rand2D(vec2 p)\r
{\r
	vec3 p3  = fract(vec3(p.xyx) * .1031);\r
    p3 += dot(p3, p3.yzx + 33.33);\r
    return fract((p3.x + p3.y) * p3.z);\r
}\r
\r
vec2 rand(vec2 p)\r
{\r
	p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));\r
	return 2.0*fract(sin(p)*43758.5453123) - 1.0;\r
}\r
\r
float noise(vec2 p)\r
{\r
	vec2 i = floor(p + (p.x+p.y)*0.366025404);\r
    vec2 a = p - i + (i.x+i.y)*0.211324865;\r
    float m = step(a.y,a.x); \r
    vec2 o = vec2(m,1.0-m);\r
    vec2 b = a - o + 0.211324865;\r
	vec2 c = a - 1.0 + 2.0*0.211324865;\r
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0);\r
	vec3 n = h*h*h*h*vec3( dot(a,rand(i+0.0)), dot(b,rand(i+o)), dot(c,rand(i+1.0)));\r
    return dot(n, vec3(70))*.5+.5;\r
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
            vec2 p = gv - offs - vec2(n, fract(n * 34.)) + .5;\r
            float m = .5 + 0.03 * sin(t * 6. + n) + length(uv) * 0.1;\r
            m /= n;\r
            p *= m;\r
            float s = star(p, 1. / m);\r
            vec3 color = scol(rand2D(id + offs));\r
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
        col.rgb += mask * pow(r, 4.) * vec3(0.6, 1, 0.6) * smoothstep(0.6, 0.5, l);\r
        col.rgb += smoothstep(0.2, 0.4, pow(r, 4.) * smoothstep(0.6, 0.5, l)) * r;\r
        col.a += mask * smoothstep(0.5, 1., r);\r
\r
        nr.xy = rot2D(nr.xy, -t * 1.8);\r
        r = noise(nr.xy * l - 1361.26);\r
        col.rgb += mask * pow(r, 4.) * vec3(0.6, 0.5, 1) * smoothstep(0.4, 0.2, l);\r
        col.rgb = hue_shift(col.rgb, 0.4 * pow(mask * r, 4.));\r
\r
        nr.xy = rot2D(nr.xy, t * 1.4);\r
        r = noise(nr.xy * l - 513.26);\r
        col.rgb += mask * pow(r, 8.);\r
        col.rgb = hue_shift(col.rgb, mask * -r);\r
        col.a += mask * smoothstep(0.5, 1., r);\r
\r
        nr.xy = rot2D(nr.xy, -t);\r
        r = smoothstep(0.4, 1.5, noise(nr.xy * (0.5 + l) - 217.));\r
        float a = mask * 16. * r * smoothstep(0.2, 0.1, l) * l;\r
        col.a += a;\r
        col.rgb += a * .25;\r
        col.rgb += smoothstep(0.5, 0., a) * a;\r
\r
        nr.xy = rot2D(nr.xy, -t * 2.4);\r
        r = noise(nr.xy * l + 221.126) * 0.35;\r
        col.rgb = hue_shift(col.rgb, mask * r);\r
        col.rgb += r * r * r * r * 0.25;\r
        col.a += mask * r / (1. + l);\r
        col.a = sqrt(col.a * 0.8);\r
        col.b = pow(col.b, 1.25);\r
        col.rgb *= sqrt(abs(col.rgb));\r
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
        r = noise(uv * l - 513.26) * 2. - 1.;\r
        col.rgb += mask * pow(r, 8.);\r
        col.rgb = hue_shift(col.rgb, mask * r);\r
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
}`;function j(c){let n,e;return n=new M({props:{frag:H,vert:G}}),{c(){L(n.$$.fragment)},l(o){P(n.$$.fragment,o)},m(o,f){N(n,o,f),e=!0},p:v,i(o){e||(I(n.$$.fragment,o),e=!0)},o(o){O(n.$$.fragment,o),e=!1},d(o){U(n,o)}}}class W extends S{constructor(n){super(),w(this,n,null,j,A,{})}}export{W as component};