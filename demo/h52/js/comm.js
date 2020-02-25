//横竖屏
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", vsprompsRotate, false);

function vsprompsRotate() {
	if(window.orientation == 180 || window.orientation == 0) {
		document.querySelector(".vspromps").style.display = "none";
	}
	if(window.orientation == 90 || window.orientation == -90) {
		document.querySelector(".vspromps").style.display = "block";
	}
}
if(!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	var pc = document.querySelector(".pc");
	pc.style.display = "block";
}