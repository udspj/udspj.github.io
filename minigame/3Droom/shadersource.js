
var VSHADER_SOURCE = 'attribute vec4 a_Position; \n' +
'attribute vec4 a_Color; \n' +
'uniform mat4 u_ViewMatrix; \n' +
'uniform mat4 u_ProjMatrix; \n' +
'uniform mat4 u_ModelMatrix; \n' +
// 'varying vec4 v_Color; \n' +
// ' attribute vec4 a_Normal; \n' +
// ' uniform vec3 u_LightColor; \n' +
// ' uniform vec3 u_LightDirection; \n' +
'attribute vec2 a_TexCoord; \n' +
'varying vec2 v_TexCoord; \n' +
'void main() { \n' +
' gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position; \n' +
' v_TexCoord = a_TexCoord; \n' +
// 'vec3 normal = normalize(vec3(a_Normal)); \n' +
// 'float nDotL = max(dot(u_LightDirection, normal), 0.0); \n' +
// 'vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL; \n' +
// // ' v_Color = a_Color; \n' +
// 'v_Color = vec4(diffuse, a_Color.a); \n' +
'} \n';

var FSHADER_SOURCE = 'precision mediump float; \n' +
'uniform sampler2D u_Sampler0; \n' +
'varying vec2 v_TexCoord; \n' +
'void main() { \n' +
' vec4 color0 = texture2D(u_Sampler0, v_TexCoord); \n' +
' gl_FragColor = color0; \n' +
'} \n';