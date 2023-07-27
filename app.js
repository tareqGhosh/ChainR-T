const express = require('express');
const app = express();
const db = require('./config/database');
const port = process.env.PORT || 80;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

db.authenticate().then(() => console.log('database connected')).catch(e => console.log(e));

app.get('/', (req, res) => res.json({ data: 'Hello world' }));

app.use('/api/users', jsonParser, require('./routes/users'));
app.use('/api/blogs', jsonParser, require('./routes/blogs'));

app.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
})
