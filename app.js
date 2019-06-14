const express = require("express");
const webpush = require("web-push");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
	"mailto:test@test.com",
	vapidKeys.publicKey,
	vapidKeys.privateKey,
);

app.get("/keys", (req, res) => {
	res.status(200).send(vapidKeys);
});

app.post("/subscribe", (req, res) => {
	const subscription = req.body;

	res.status(201).json({});

	const payload = JSON.stringify({
		title: "Push Notification",
	});

	webpush
		.sendNotification(subscription, payload)
		.catch((err) => console.error(err));
});

const port = 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
