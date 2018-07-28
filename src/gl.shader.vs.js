/**

 attribute vec3 aVertexPosition;

 attribute vec4 aVertexColor;
 varying vec4 vColor;

 attribute vec2 aTexture;
 varying vec2 vTexture;

 uniform mat4 uMVMatrix;
 uniform mat4 uPMatrix;

 void main(){
		gl_Position =    vec4(aVertexPosition, 1.0);
		gl_PointSize = 1.0;
};


 */
