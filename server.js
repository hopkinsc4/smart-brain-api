const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'lpennywhistle',
        password: '',
        database: 'smart_brain'
    }
});

const app = express();

app.use(bodyParser.json())
app.use(cors());

// ROUTES
app.get('/', (req, res) => { res.send(database.users); })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

app.put('/image', (req, res) => { image.handleImageSubmit(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


// const PORT = process.env.PORT;
app.listen(3001, () => { console.log('app is running on port 3001!'); });