const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

const db = require('./app/models');
db.mongoose.connect(db.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
	console.log('Conectado ao banco de dados!');
})
.catch(err => {
	console.log('Não foi possível se conectar ao banco de dados!', err);
	process.exit();
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes/overlay.routes')(app);
app.listen(3030);