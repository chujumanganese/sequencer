import express from 'express';
import dotenv from 'dotenv';
import {engine} from "express-handlebars";
import session from "express-session";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine({ partialsDir : "./views/partials/" }));
app.set("view engine", "handlebars");
app.use(express.static('public'));
app.use(express.json());
app.use(session({ /* session part */
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: false, // true ONLY if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

//* database */
import db from './model/DB.js';
// imports from files
import landingPage from './controller/landingPage.js';
import Login from './controller/login.js';
import Dashboard from './controller/dashboard.js';
import {balance} from './controller/crypto.js';
import register from './controller/register.js';

app.get('/', landingPage);
app.post('/login', Login);
app.post('/register', register);
app.get('/dashboard', Dashboard);
app.get('/balance', balance);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
