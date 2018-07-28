<script id="shader-vs" type="x-shader/x-vertex">
	attribute vec3 aVertexPosition;//顶点
	attribute vec4 aVertexColor;//颜色
	varying vec4 vColor;//颜色传递变量
	
	attribute vec2 aTextureCoord;//纹理
	varying vec2 vTextureCoord;//纹理传递变量

	uniform mat4 uMVMatrix;
    uniform mat4 uPerspective;
    uniform mat4 uCamera;
	
	void main(){
//uPerspective*
		gl_Position =  uCamera*uMVMatrix*vec4(aVertexPosition, 1.0);
		gl_PointSize = 3.0;
		vTextureCoord = aTextureCoord;
		vColor = aVertexColor;
	}
</script>
<script id="shader-fs" type="x-shader/x-fragment">
	precision mediump float;
	varying vec2 vTextureCoord;
	uniform sampler2D uSampler;
	varying vec4 vColor;
	uniform int uColorAndTexture;
	void main(){
		if(uColorAndTexture==1){
			gl_FragColor = vColor;
		}else if(uColorAndTexture==2){
			gl_FragColor = texture2D(uSampler, vTextureCoord);
		}else if(uColorAndTexture==3){
			gl_FragColor = vColor*texture2D(uSampler, vTextureCoord);
		}
	}
</script>
