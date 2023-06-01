function updateOnlineStatus() {
	// document.body.setAttribute("id", "status");
	document.getElementsByClassName("loaded").innerHTML = navigator.onLine
		? "online"
		: "offline";
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

updateOnlineStatus();
