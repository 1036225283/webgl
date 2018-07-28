moveToUp = function() {
	camera.moveToUp(moveToUpCount * 0.01);
	moveToUpCount++;
	camera.updateCamera();
	show2();
};
moveToDown = function() {
	camera.moveToUp(moveToUpCount * 0.01);
	moveToUpCount--;
	camera.updateCamera();
	show2();
};
//向左，右移动
moveToLeft = function() {
	camera.moveToLeft(moveToLeftCount * 0.01);
	moveToLeftCount++;
	camera.updateCamera();
	show2();
};
moveToRight = function() {
	camera.moveToRight(moveToLeftCount * 0.01);
	moveToLeftCount--;
	camera.updateCamera();
	show2();
};
//向前，后移动
moveToBefore = function() {
	camera.moveToBefore(moveToBeforeCount * 0.01);
	moveToBeforeCount++;
	camera.updateCamera();
	show2();
};
moveToAfter = function() {
	camera.moveToAfter(moveToBeforeCount * 0.01);
	moveToBeforeCount--;
	camera.updateCamera();
	show2();
};
//向上，下旋转
rotateUp = function() {
	camera.rotateUp(rotateUpCount * 0.01);
	rotateUpCount++;
	camera.updateCamera();
	show2();
};
rotateDown = function() {
	camera.rotateDown(rotateUpCount * 0.01);
	rotateUpCount--;
	camera.updateCamera();
	show2();
};
//向左，右移动
rotateLeft = function() {
	camera.rotateLeft(rotateLeftCount * 0.01);
	rotateUpCount++;
	camera.updateCamera();
	show2();
};
rotateRight = function() {
	camera.rotateRight(rotateLeftCount * 0.01);
	rotateUpCount--;
	camera.updateCamera();
	show2();
};