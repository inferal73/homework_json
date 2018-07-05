const express = require('express');
const bp = require('body-parser');
const path = require("path");
const cors = require('cors');

const app = express();

let last = 'Тестовое';
let users = [
	{
		name: 'Ivan',
		email: 'ivan@mail.ru',
		age: 22
	},
	{
		name: 'Alex',
		email: 'alex@mail.ru',
		age: 24
	}
];

app.use(cors());
app.use(express.static('public'));
app.use(bp.json());
app.use(bp.text());

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/getMessage', (req, res) => {
	res.send(`Последнее сообщение: ${last}`);
});

app.post('/sendMessage', (req, res) => {
	last = req.body;
	res.status(200).end();
});

app.get('/user/:id', (req, res) => {
	const user = users[req.params.id - 1];
	if (user) {
		res.send(JSON.stringify(user));
	} else {
		res.status(404);
		res.send({
			error: 'Пользователь не найден'
		});
	}
});

app.get('/user', (req, res) => {
	if (users.length > 0) {
		res.send(JSON.stringify(users));
	} else {
		res.status(404);
		res.send({
			error: 'Пользователи не найдены'
		});
	}
});

app.post('/user/', (req, res) => {
	const length = users.push(req.body);
	res.status(200);
	res.send(String(length));
});

app.listen(3001, () => {
	console.log('Server start: localhost:3001')
});