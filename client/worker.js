console.log("Service Worker Loaded");

self.addEventListener("push", (e) => {
	const data = e.data.json();
	console.log("Push Recieved");

	self.registration.showNotification(data.title, {
		body: "Notified Success!",
		icon: "https://pt.freelogodesign.org/Content/img/logo-ex-7.png",
	});
});
